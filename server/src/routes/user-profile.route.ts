import { Router } from "express";
// import { validateRequest } from "@/middlewares/validator.middleware.js";
import passport from "passport";
import { updateAvatar } from "@/controllers/user-profile.controller.js";
import { upload } from "@/middlewares/multer.middleware.js";

const verifyJwt = passport.authenticate("jwt", { session: false });

const userProfileRouter = Router();

userProfileRouter
  .route("/update-avatar")
  .post(verifyJwt, upload.single("avatar"), updateAvatar);

export { userProfileRouter };
