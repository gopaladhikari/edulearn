import type { ICourseProgress } from "@/types/course-progress.t.js";
import { Schema, model, Types } from "mongoose";

const lectureProgress = new Schema<ICourseProgress["lectureProgress"][number]>(
  {
    lectureId: {
      type: Types.ObjectId,
      ref: "Lecture",
      required: [true, "Lecture id is required."],
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    watchTime: {
      type: Number,
      default: 0,
    },

    lastWatch: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const courseProgressSchema = new Schema<ICourseProgress>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User id is required."],
    },

    courseId: {
      type: Types.ObjectId,
      ref: "Course",
      required: [true, "Course id is required."],
    },

    lectureProgress: [lectureProgress],

    isCompleted: {
      type: Boolean,
      default: false,
    },

    watchTime: {
      type: Number,
      default: 0,
    },

    lastWatch: {
      type: Date,
      default: Date.now,
    },

    completionPercentage: {
      type: Number,
      default: 0,
      min: [0, "Completion percentage cannot be less than 0."],
      max: [100, "Completion percentage cannot be more than 100."],
    },
  },
  { timestamps: true }
);

// one progress document per user per course
courseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export const CourseProgress = model("CourseProgress", courseProgressSchema);
