import type { ICourseEnrollment } from "@/types/course-enrollment.t.js";
import { ApiError } from "@/utils/api-responses.js";
import { paymentMethods, paymentStatus } from "@/utils/constants.js";
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
      required: [true, "Currency is required."],
      uppercase: true,
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
      enum: {
        values: Object.values(paymentMethods),
        message: "Payment method is required.",
      },

      validate: {
        validator: function (value): boolean {
          if ((this as ICourseEnrollment).amount === 0)
            return value === paymentMethods.FREE;

          if ((this as ICourseEnrollment).amount > 0)
            return (
              value === paymentMethods.STRIPE ||
              value === paymentMethods.RAZORPAY
            );

          return true;
        },
        message: "Invalid payment method.",
      },
    },

    paymentId: {
      type: String,
      sparse: true,
      index: true,
      unique: true,
      required: function (): boolean {
        return this.amount > 0;
      },
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
  if (this.status === paymentStatus.REFUNDED)
    throw new ApiError(400, "Amount has already been refunded.");

  if (this.status !== paymentStatus.COMPLETED)
    throw new ApiError(400, "Refund allowed only for successful payments.");

  if (amount <= 0)
    throw new ApiError(400, "Refund amount must be greater than zero.");

  if (amount > this.amount)
    throw new ApiError(400, "Refund amount cannot exceed paid amount.");

  this.status = paymentStatus.REFUNDED;
  this.refundReason = reason;
  this.refundAmount = amount;

  await this.save();
};

courseEnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export const CourseEnrollment = model(
  "CourseEnrollment",
  courseEnrollmentSchema
);
