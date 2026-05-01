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
  updateAvatar,
} from "../controllers/user.controller.js";
import {
  changePasswordSchema,
  emailVerificationTokenSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/schemas/auth.schema.js";
import passport from "passport";
import { validateRequest } from "@/middlewares/validator.middleware.js";
import { upload } from "@/middlewares/multer.middleware.js";
import { arcjetSignUpProtection } from "@/middlewares/arcjet.middleware.js";

const authRouter = Router();

const verifyJwt = passport.authenticate("jwt", { session: false });

authRouter
  .route("/register")
  .post(
    validateRequest({ body: registerSchema }),
    arcjetSignUpProtection,
    registerUser
  );

authRouter
  .route("/login")
  .post(
    validateRequest({ body: loginSchema }),
    passport.authenticate("local", { session: false }),
    loginUser
  );

authRouter.route("/logout").post(verifyJwt, logoutUser);

authRouter.route("/current-user").get(verifyJwt, getCurrentUser);

authRouter
  .route("/verify-email/:verificationToken")
  .post(validateRequest({ params: emailVerificationTokenSchema }), verifyEmail);

authRouter.route("/resend-email-verification").post(resendEmailVerification);

authRouter.route("/refresh-token").post(verifyJwt, refreshAccessToken);

authRouter
  .route("/forgot-password")
  .post(validateRequest({ body: forgotPasswordSchema }), forgotPassword);

authRouter
  .route("/reset-password/:resetToken")
  .post(validateRequest(resetPasswordSchema), resetPassword);

authRouter
  .route("/change-password")
  .post(
    validateRequest({ body: changePasswordSchema }),
    verifyJwt,
    changeCurrentPassword
  );

authRouter
  .route("/update-avatar")
  .post(verifyJwt, upload.single("avatar"), updateAvatar);

export { authRouter };
