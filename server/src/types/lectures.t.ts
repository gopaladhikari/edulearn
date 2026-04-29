import type mongoose from "mongoose";

export interface ILectures {
  title: string;
  description: string;
  courseId: mongoose.Types.ObjectId; // Course ;
  isPreview: boolean;
  videoUrl: string;
  duration: number;
  videoPublicId: string;
  order: number;
}
