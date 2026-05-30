import { createInstructorApplication } from "@/controllers/instructor-application.controller.js";
import { rbac } from "@/middlewares/rbac.middleware.js";
import { validateRequest } from "@/middlewares/validator.middleware.js";
import { instructorApplicationSchema } from "@/schemas/instructor-application.schema.js";
import { UserRoles } from "@/utils/constants.js";
import { Router } from "express";
import passport from "passport";

const instructorApplicationRouter = Router();

const verifyJwt = passport.authenticate("jwt", { session: false });

instructorApplicationRouter.use(verifyJwt);

instructorApplicationRouter
  .route("/")
  .post(
    rbac([UserRoles.STUDENT]),
    validateRequest({ body: instructorApplicationSchema }),
    createInstructorApplication
  );

export { instructorApplicationRouter };
