import { createCourseEnrollment } from "@/controllers/course-enrollment.controller.js";
import { Router } from "express";
import passport from "passport";

const verifyJwt = passport.authenticate("jwt", { session: false });

const enrollmentRouter = Router();

enrollmentRouter.post("/:courseId", verifyJwt, createCourseEnrollment);

export { enrollmentRouter };
