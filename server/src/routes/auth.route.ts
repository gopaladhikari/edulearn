import { Router } from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
  logoutUser,
  getCurrentUser,
  resendEmailVerification,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  changeCurrentPassword,
} from "../controllers/auth.controller.js";
import {
  changePasswordValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  userLoginValidator,
  userRegisterValidator,
} from "@/validators/auth.validator.js";
import passport from "passport";
import { validateRequest } from "@/middlewares/validator.middleware.js";

const authRouter = Router();

const verifyJwt = passport.authenticate("jwt", { session: false });

authRouter
  .route("/register")
  .post(userRegisterValidator(), validateRequest, registerUser);

authRouter
  .route("/login")
  .post(
    userLoginValidator(),
    validateRequest,
    passport.authenticate("local", { session: false }),
    loginUser
  );

authRouter.route("/logout").post(verifyJwt, logoutUser);

authRouter.route("/current-user").get(verifyJwt, getCurrentUser);

authRouter.route("/verify-email/:verificationToken").post(verifyEmail);

authRouter.route("/resend-email-verification").post(resendEmailVerification);

authRouter.route("/refresh-token").post(verifyJwt, refreshAccessToken);

authRouter
  .route("/forgot-password")
  .post(forgotPasswordValidator(), validateRequest, forgotPassword);

authRouter
  .route("/reset-password/:resetToken")
  .post(resetPasswordValidator(), validateRequest, resetPassword);

authRouter
  .route("/change-password")
  .post(
    changePasswordValidator(),
    validateRequest,
    verifyJwt,
    changeCurrentPassword
  );

export { authRouter };
