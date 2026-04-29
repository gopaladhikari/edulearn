import type { Types } from "mongoose";

interface ILectureProgress {
  lectureId: Types.ObjectId;
  isCompleted: boolean;
  lastWatch: Date;
  watchTime: number;
}

export interface ICourseProgress {
  enrollmentId: Types.ObjectId;
  // courseId: Types.ObjectId;
  isCompleted: boolean;
  lastWatch: Date;
  watchTime: number;
  completionPercentage: number;
  lectureProgress: ILectureProgress[];
}
