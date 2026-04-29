import type { ICourseProgress } from "@/types/course-progress.t.js";
import { Schema, model, Types } from "mongoose";
import { ApiError } from "@/utils/api-responses.js";

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
    enrollmentId: {
      type: Types.ObjectId,
      ref: "CourseEnrollment",
      required: [true, "Enrollment id is required."],
    },

    lectureProgress: [lectureProgress],

    isCompleted: {
      type: Boolean,
      default: false,
    },

    watchTime: {
      type: Number,
      default: 0,
      min: [0, "Watch time shouldn't be negative."],
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

// one progress per enrollment

courseProgressSchema.pre("save", async function () {
  const courseEnrollment = await model("CourseEnrollment")
    .findById(this.enrollmentId)
    .select("courseId");

  if (!courseEnrollment)
    throw new ApiError(404, "No course exist for this enrollment.");

  const totalLectures = await model("Lecture").countDocuments({
    courseId: courseEnrollment.courseId,
  });

  if (totalLectures === 0) {
    this.completionPercentage = 0;
    this.isCompleted = false;
  } else {
    const completedLectures = this.lectureProgress.filter(
      (lecture) => lecture.isCompleted
    ).length;

    const completionPercentage = Math.round(
      (completedLectures / totalLectures) * 100
    );

    if (completionPercentage === 100)
      this.isCompleted = completionPercentage === 100;

    this.completionPercentage = completionPercentage;
  }
});

courseProgressSchema.index({ enrollmentId: 1 }, { unique: true });

export const CourseProgress = model("CourseProgress", courseProgressSchema);
