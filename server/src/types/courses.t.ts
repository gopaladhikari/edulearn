import type mongoose from "mongoose";
import type { Document } from "mongoose";

export interface ICourses extends Document {
  title: string;
  description: string;
  videoUrl: string;
  price: number;
  instrctors: mongoose.Types.ObjectId[]; // user
}
