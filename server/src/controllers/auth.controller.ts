import { User } from "@/models/user.model.js";
import { ApiError, ApiResponse } from "@/utils/api-responses.js";
import crypto from "crypto";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { clientUrl, cookiesOptions, defaultAvatar } from "@/utils/constants.js";
import { sendEmail } from "@/utils/send-email.js";
import { emailVerificationTemplate } from "@/emails/email-verification.email.js";
import { forgotPasswordTemplate } from "@/emails/forgot-password.email.js";
import { welcomeEmailTemplate } from "@/emails/welcome-after-verification.email.js";
import { UserProfile } from "@/models/user-profile.model.js";
import mongoose from "mongoose";

// Generate access and refresh tokens
const generateAccessAndRefreshTokens = async (user: Express.User) => {
  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    return { accessToken, refreshToken };
  } catch (error) {
    const err = error as Error;
    throw new ApiError(400, err.message);
  }
};

// Register new user
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) throw new ApiError(400, "User already exists");

  const user = await User.create({
    username,
    email,
    password,
  });

  if (!user) throw new ApiError(400, "Something went wrong");

  const { hashToken, tokenExpiry, unhashedToken } = user.generateToken();

  user.emailVerificationToken = hashToken;
  user.emailVerificationExpires = new Date(tokenExpiry);

  await user.save();

  const content = emailVerificationTemplate(
    user.username,
    `${clientUrl}/verify-email?token=${unhashedToken}`
  );

  res.status(201).json(
    new ApiResponse(201, "Registration successful! 🎉", {
      message:
        "We've sent a verification email to your inbox. Please verify your email address to complete registration.",
      email: user.email,
      expiresIn: "20 minutes",
    })
  );

  sendEmail(user.email, "Verify your email", content).then((result) => {
    console.log(result);
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const user = req.user!;

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user);

  await user.save();

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookiesOptions)
    .cookie("refreshToken", refreshToken, cookiesOptions)
    .json(
      new ApiResponse(200, "User logged in successfully", {
        user,
        accessToken,
        refreshToken,
      })
    );
};

export const logoutUser = async (req: Request, res: Response) => {
  const user = req.user!;

  await User.findByIdAndUpdate(user._id, {
    $unset: {
      accessToken: 1,
      refreshToken: 1,
    },
  });

  return res
    .status(200)
    .clearCookie("accessToken", cookiesOptions)
    .clearCookie("refreshToken", cookiesOptions)
    .json(new ApiResponse(200, "User logged out", {}));
};

export const getCurrentUser = async (req: Request, res: Response) => {
  return res.status(200).json(
    new ApiResponse(200, "User details fetched successfully.", {
      user: req.user,
    })
  );
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { verificationToken } = req.params;

  const hashedVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken as string)
    .digest("hex");

  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const user = await User.findOne({
      emailVerificationToken: hashedVerificationToken,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) throw new ApiError(400, "Token is invalid or expired.");

    user.isEmailVerified = true;

    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save({
      session,
    });

    await UserProfile.create(
      [
        {
          user: user._id,
          avatar: {
            secure_url: defaultAvatar,
          },
        },
      ],
      {
        session,
      }
    );

    await session.commitTransaction();

    res.status(200).json(new ApiResponse(200, "Email verified", {}));

    const content = welcomeEmailTemplate(user.username);

    sendEmail(user.email, "Welcome to Edulearn", content).then((result) => {
      console.log(result);
    });
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const resendEmailVerification = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new ApiError(400, "User not found");

  if (user.isEmailVerified) throw new ApiError(409, "Email already verified");

  const { hashToken, tokenExpiry, unhashedToken } = user.generateToken();

  user.emailVerificationToken = hashToken;
  user.emailVerificationExpires = new Date(tokenExpiry);

  await user.save();

  res.status(200).json(new ApiResponse(200, "Email verification resent", {}));

  const content = emailVerificationTemplate(
    user.username,
    `${clientUrl}/verify-email?token=${unhashedToken}`
  );

  sendEmail(user.email, "Verify your email", content).then((result) => {
    console.log(result);
  });
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const incmoingRefreshToken =
    req.cookies.refreshToken || req.headers.authorization;

  if (!incmoingRefreshToken) throw new ApiError(400, "Invalid token");

  const decodedToken = jwt.verify(
    incmoingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  ) as jwt.JwtPayload;

  const user = await User.findById(decodedToken._id);

  if (!user) throw new ApiError(400, "Invalid token");

  if (incmoingRefreshToken !== user.refreshToken)
    throw new ApiError(400, "Invalid token");

  const { accessToken, refreshToken: newRefreshToken } =
    await generateAccessAndRefreshTokens(user);

  await user.save();

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookiesOptions)
    .cookie("refreshToken", newRefreshToken, cookiesOptions)
    .json(new ApiResponse(200, "Access token refreshed", { user }));
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new ApiError(400, "User not found");

  const { hashToken, tokenExpiry, unhashedToken } = user.generateToken();

  user.forgotPasswordToken = hashToken;
  user.forgotPasswordExpires = new Date(tokenExpiry);

  await user.save();

  res.status(200).json(new ApiResponse(200, "Password reset email sent", {}));

  const content = forgotPasswordTemplate(
    user.username,
    `${clientUrl}/reset-password?token=${unhashedToken}`
  );

  sendEmail(user.email, "Reset your password", content).then((result) => {
    console.log(result);
  });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { resetToken } = req.params; // unhashed token
  const { newPassword } = req.body;

  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken as string)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: hashedResetToken,
    forgotPasswordExpires: { $gt: Date.now() },
  });

  if (!user) throw new ApiError(400, "Token is invalid or expired.");

  user.password = newPassword;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpires = undefined;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Password reset successfully", {}));
};

export const changeCurrentPassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id).select("+password");

  if (!user) throw new ApiError(400, "User not found");

  const isPasswordValid = await user.isPasswordValid(oldPassword);

  if (!isPasswordValid) throw new ApiError(400, "Invalid old password.");

  user.password = newPassword;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully", {}));
};
