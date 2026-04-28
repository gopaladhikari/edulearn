import type { Courselevels } from "@/utils/constants.js";
import type { Document, HydratedDocument, Types } from "mongoose";
import type { ILectures } from "./lectures.t.js";

export interface ICourses extends Document {
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  instructorId: Types.ObjectId[]; // user
  lectures: HydratedDocument<ILectures>;
  isPublished: boolean;
  language: string;
  category: string;
  duration: number;
  subtitle?: string;
  level: Courselevels;
}
