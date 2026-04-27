import type { ICourseEnrollment } from "@/types/course-enrollment.t.js";
import { Schema, model } from "mongoose";

const courseEnrollmentSchema = new Schema<ICourseEnrollment>(
  {},
  { timestamps: true }
);

export const CourseEnrollment = model(
  "CourseEnrollment",
  courseEnrollmentSchema
);
