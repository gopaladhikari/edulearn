import { Course } from "@/models/course.model.js";
import { ApiError, ApiResponse } from "@/utils/api-responses.js";
import { redis } from "@/utils/redis.js";
import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";

function courseKey(id: string) {
  return `course:${id}`;
}

export const getCourses = async (req: Request, res: Response) => {
  const courses = await Course.aggregate([]);
};

export const getCourseById = async (req: Request, res: Response) => {
  const courseId = req.params.courseId as string;

  if (!isValidObjectId(courseId)) throw new ApiError(400, "Invalid course id");

  const cachedCourse = await redis.get(courseKey(courseId));

  if (cachedCourse)
    return res.status(200).json(
      new ApiResponse(200, "Course fetched", {
        course: JSON.parse(cachedCourse),
      })
    );

  const course = await Course.findById(courseId);

  if (!course) throw new ApiError(400, "Course not found");

  redis.set(courseKey(courseId), JSON.stringify(course), "EX", 60 * 60); // one hour

  return res.status(200).json(
    new ApiResponse(200, "Course fetched successfully", {
      course,
    })
  );
};
