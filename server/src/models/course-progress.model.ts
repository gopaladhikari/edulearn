import type { ICourseProgress } from "@/types/course-progress.t.js";
import { Schema, model } from "mongoose";

const courseProgressSchema = new Schema<ICourseProgress>(
  {},
  { timestamps: true }
);

export const CourseProgress = model("CourseProgress", courseProgressSchema);
