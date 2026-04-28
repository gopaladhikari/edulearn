import type { Document, Types } from "mongoose";

export interface ICourseProgress extends Document {
  enrollmentId: Types.ObjectId;
  completedLecturesId: Types.ObjectId[];
  lastWatched: Types.ObjectId;
}
