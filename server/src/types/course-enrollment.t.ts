import type { paymentStatus } from "@/utils/constants.js";
import type { Types } from "mongoose";

export interface ICourseEnrollment {
  courseId: Types.ObjectId;
  userId: Types.ObjectId;
  amount: number;
  currency: string;
  status: paymentStatus;
  paymentMethod: string;
  paymentId?: string;
  refundId: string;
  refundAmount: number;
  refundReason: string;
  metadata: Map<string, string>;
  processRefund: (reason: string, amount: number) => void;
}
