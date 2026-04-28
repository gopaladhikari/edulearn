import type { ICourseEnrollment } from "@/types/course-enrollment.t.js";
import { paymentStatus } from "@/utils/constants.js";
import { Schema, model, Types } from "mongoose";

const courseEnrollmentSchema = new Schema<ICourseEnrollment>(
  {
    courseId: {
      type: Types.ObjectId,
      ref: "Course",
      required: [true, "Course id is required."],
    },

    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User id is required."],
    },

    amount: {
      type: Number,
      default: 0,
      min: [0, "Amount cannot be negative number."],
    },

    currency: {
      type: String,
    },

    status: {
      type: String,
      enum: {
        values: Object.values(paymentStatus),
        message: "Invalid payment status",
      },
      default: paymentStatus.PENDING,
    },

    paymentMethod: {
      type: String,
      required: [true, "Payment method is required."],
    },

    paymentId: {
      type: String,
      required: [true, "Payment id is required."],
    },

    refundId: {
      type: String,
    },

    refundAmount: {
      type: Number,
    },

    refundReason: {
      type: String,
    },

    metadata: {
      type: Map,
      of: String,
    },
  },
  {
    timestamps: true,
  }
);

courseEnrollmentSchema.methods.processRefund = async function (
  reason: string,
  amount: number
) {
  this.status = paymentStatus.REFUNDED;
  this.refundReason = reason;
  this.refundAmount = amount;

  await this.save();
};

courseEnrollmentSchema.index({ courseId: 1, userId: 1 }, { unique: true });

export const CourseEnrollment = model(
  "CourseEnrollment",
  courseEnrollmentSchema
);
