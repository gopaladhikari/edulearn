import { CourseEnrollment } from "@/models/course-enrollment.model.js";
import { Course } from "@/models/course.model.js";
import Stripe from "stripe";
import { ApiError, ApiResponse } from "@/utils/api-responses.js";
import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { paymentMethods, paymentStatus } from "@/utils/constants.js";

const stripeSecretKey = process.env.STRIPE_API_KEY as string;

const stripe = new Stripe(stripeSecretKey);

export const createCourseEnrollment = async (req: Request, res: Response) => {
  const courseId = req.params.courseId;

  const { amount } = req.body;

  if (!isValidObjectId(courseId)) throw new ApiError(400, "Invalid course id");

  const user = req.user!;

  const course = await Course.findById(courseId);

  if (!course) throw new ApiError(400, "Course not found");

  const customer = await stripe.customers.create({
    email: user.email,
    metadata: {
      courseId: course._id.toString(),
      userId: req.user!._id.toString(),
    },
  });

  const courseEnrollment = await CourseEnrollment.create({
    courseId: course._id,
    userId: user._id,
    amount,
    currency: "USD",
    paymentMethod: paymentMethods.STRIPE,
    status: paymentStatus.PENDING,
  });
};
