import type { Document, Types } from "mongoose";

export interface ICourseEnrollment extends Document {
  courseId: Types.ObjectId;
  userId: Types.ObjectId;
  status: "active" | "completed" | "refunded";
  enrolledDate: Date;
}
