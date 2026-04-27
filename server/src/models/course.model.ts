import type { ICourses } from "@/types/courses.t.js";
import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema<ICourses>({}, { timestamps: true });

export const Course = mongoose.model("Course", courseSchema);
