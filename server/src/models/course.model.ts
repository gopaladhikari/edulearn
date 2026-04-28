import type { ICourses } from "@/types/courses.t.js";
import { Courselevels } from "@/utils/constants.js";
import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema<ICourses>(
  {
    title: {
      type: String,
      required: [true, "Course title is required."],
      trim: true,
      maxLength: [100, "Course title cannot exceed 100 characters."],
    },

    subtitle: {
      type: String,
      trim: true,
      maxLength: [200, "Course description cannot exceed 100 characters."],
    },

    description: {
      type: String,
      required: [true, "Course description is required."],
      trim: true,
      maxLength: [500, "Course description cannot exceed 100 characters."],
    },

    duration: {
      type: Number,
      min: [0, "Duration cannot be negative number."],
      default: 0,
    },

    category: {
      type: String,
      required: [true, "Category is required."],
      trim: true,
    },

    level: {
      type: String,
      enum: {
        values: Object.values(Courselevels),
        message: "Please select a valid course level.",
      },
      default: Courselevels.BEGINNER,
    },

    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [0, "Course price cannot is negative number."],
    },

    thumbnail: {
      type: String,
      required: [true, "Course thumbnail is required."],
    },

    instructorId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Course instructors are required."],
      },
    ],

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// TODO: Add reviews and rating in courses.

export const Course = mongoose.model("Course", courseSchema);
