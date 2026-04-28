import type { ILectures } from "@/types/lectures.t.js";
import { Schema, model } from "mongoose";

const lectureSchema = new Schema<ILectures>(
  {
    title: {
      type: String,
      required: [true, "Lecture title is required."],
      trim: true,
      maxLength: [100, "Lecture title cannot exceed 100 characterss."],
    },

    description: {
      type: String,
      required: [true, "Lecture description is required."],
      trim: true,
      maxLength: [500, "Lecture description cannot exceed 100 characterss."],
    },

    duration: {
      type: Number,
      min: [0, "Duration cannot be negative number."],
      default: 0,
    },

    videoPublicId: {
      type: String,
      required: [true, "Video public id is required."],
    },

    isPreview: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      required: [true, "Lecture Order is required."],
    },
  },
  { timestamps: true }
);

export const Lecture = model("Lecture", lectureSchema);
