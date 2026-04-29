import type { ILectures } from "@/types/lectures.t.js";
import { Schema, model, Types } from "mongoose";

const lectureSchema = new Schema<ILectures>(
  {
    title: {
      type: String,
      required: [true, "Lecture title is required."],
      trim: true,
      maxLength: [100, "Lecture title cannot exceed 100 characters."],
    },

    courseId: {
      type: Types.ObjectId,
      ref: "Course",
      required: [true, "Course id is required."],
    },

    description: {
      type: String,
      required: [true, "Lecture description is required."],
      trim: true,
      maxLength: [500, "Lecture description cannot exceed 100 characters."],
    },

    duration: {
      type: Number,
      required: [true, "Duration of a lecture is required."],
      min: [0, "Duration cannot be negative number."],
      default: 0,
    },

    videoUrl: {
      type: String,
      required: [true, "Video url id is required."],
    },

    videoPublicId: {
      type: String,
      required: [true, "Video public id is required."],
    },

    isPreview: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      required: [true, "Lecture Order is required."],
    },
  },
  { timestamps: true }
);

lectureSchema.index({ courseId: 1, order: 1 }, { unique: true });

export const Lecture = model("Lecture", lectureSchema);
