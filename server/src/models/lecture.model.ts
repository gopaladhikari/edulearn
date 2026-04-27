import type { ILectures } from "@/types/lectures.t.js";
import { Schema, model } from "mongoose";

const lectureSchema = new Schema<ILectures>({}, { timestamps: true });

export const Lecture = model("Lecture", lectureSchema);
