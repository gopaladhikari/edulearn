import { Router } from "express";
import { validateRequest } from "@/middlewares/validator.middleware.js";
import passport from "passport";
import {
  updateAvatar,
  updateProfile,
} from "@/controllers/user-profile.controller.js";
import { upload } from "@/middlewares/multer.middleware.js";
import { updateProfileSchema } from "@/schemas/user.schema.js";

const verifyJwt = passport.authenticate("jwt", { session: false });

const userProfileRouter = Router();

userProfileRouter
  .route("/update-avatar")
  .post(verifyJwt, upload.single("avatar"), updateAvatar);

userProfileRouter
  .route("/update-profile")
  .patch(
    verifyJwt,
    validateRequest({ body: updateProfileSchema }),
    updateProfile
  );

export { userProfileRouter };
