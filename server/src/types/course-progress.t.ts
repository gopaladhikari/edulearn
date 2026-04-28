import type { Document, Types } from "mongoose";

interface ILectureProgress extends Document {
  lectureId: Types.ObjectId;
  isCompleted: boolean;
  lastWatch: Date;
  watchTime: number;
}

export interface ICourseProgress extends Document {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  isCompleted: boolean;
  lastWatch: Date;
  watchTime: number;
  completionPercentage: number;
  lectureProgress: ILectureProgress[];
}
