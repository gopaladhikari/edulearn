import { Strategy } from "passport-local";
import { User } from "@/models/user.model.js";
import type { PassportStatic } from "passport";
import type { IUsers } from "@/types/users.t.js";

const generateAccessAndRefreshTokens = (user: IUsers) => {
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;

  return { accessToken, refreshToken };
};

export const LocalLogin = (passport: PassportStatic) => {
  passport.use(
    "local-login",
    new Strategy(async (username, password, done) => {
      try {
        const user = await User.findOne({
          $or: [
            {
              username,
            },
            {
              email: username,
            },
          ],
        });

        if (!user)
          return done(null, false, { message: "Invalid email or password." });

        const isPasswordValid = await user.isPasswordValid(password);

        if (!isPasswordValid)
          return done(null, false, { message: "Invalid email or password." });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );
};

export const LocalRegister = (passport: PassportStatic) => {
  passport.use(
    "local-register",
    new Strategy(
      { passReqToCallback: true },
      async (req, _username, _password, done) => {
        try {
          const { username, email, password } = req.body;

          const existingUser = await User.findOne({
            $or: [{ username }, { email }],
          });

          if (existingUser)
            return done(null, false, { message: "Invalid email or password." });

          const newUser = await User.create({
            username,
            email,
            password,
          });

          if (!newUser)
            return done(null, false, {
              message: "Something went wrong. Try again.",
            });

          const { hashToken, tokenExpiry } = newUser.generateToken();

          generateAccessAndRefreshTokens(newUser);

          newUser.emailVerificationToken = hashToken;
          newUser.emailVerificationExpires = new Date(tokenExpiry);

          await newUser.save();

          // const content = emailVerificationEmailTemplate(
          //   `${siteUrl}/verify-email?token=${unhashedToken}`,
          //   newUser.username
          // );

          // await sendEmail(content, newUser.email, "Verify your email");

          const user = await User.findById(newUser._id).select(
            "-password -refreshToken -emailVerificationToken -emailVerificationExpires"
          );

          if (!user)
            return done(null, false, { message: "Something went wrong." });

          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
