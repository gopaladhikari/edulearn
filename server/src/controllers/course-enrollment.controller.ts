import { CourseEnrollment } from "@/models/course-enrollment.model.js";
import { Course } from "@/models/course.model.js";
import Stripe from "stripe";
import { ApiError, ApiResponse } from "@/utils/api-responses.js";
import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { clientUrl, paymentMethods, paymentStatus } from "@/utils/constants.js";

const stripeSecretKey = process.env.STRIPE_API_KEY as string;

const stripe = new Stripe(stripeSecretKey);

export const createCourseEnrollment = async (req: Request, res: Response) => {
  const courseId = req.params.courseId;

  if (!isValidObjectId(courseId)) throw new ApiError(400, "Invalid course id");

  const user = req.user!;

  const course = await Course.findById(courseId);

  if (!course) throw new ApiError(400, "Course not found");

  const alreadyEnrolled = await CourseEnrollment.findOne({
    courseId: course._id,
    userId: user._id,
    status: paymentStatus.COMPLETED,
  });

  if (alreadyEnrolled) throw new ApiError(400, "Already enrolled");

  const courseEnrollment = await CourseEnrollment.create({
    courseId: course._id,
    userId: user._id,
    amount: course.price,
    currency: "USD",
    paymentMethod: paymentMethods.STRIPE,
    status: paymentStatus.PENDING,
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],

    customer_email: user.email,

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: course.title,
            description: course.description,
          },
          unit_amount: Math.round(course.price * 100),
        },
        quantity: 1,
      },
    ],

    metadata: {
      courseId: course._id.toString(),
      userId: user._id.toString(),
      enrollmentId: courseEnrollment._id.toString(),
    },

    success_url: `${clientUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${clientUrl}/payment/cancel`,
  });

  courseEnrollment.paymentId = session.id;
  await courseEnrollment.save();

  return res.status(201).json(
    new ApiResponse(201, "Checkout session created successfully", {
      enrollment: courseEnrollment,
      checkoutUrl: session.url,
      sessionId: session.id,
    })
  );
};
