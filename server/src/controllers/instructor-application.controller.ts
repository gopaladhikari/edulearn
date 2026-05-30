import { InstructorApplication } from "@/models/instruction-application.models.js";
import { ApiError, ApiResponse } from "@/utils/api-responses.js";
import type { Request, Response } from "express";

export const createInstructorApplication = async (
  req: Request,
  res: Response
) => {
  const {
    motivation,
    experienceYears,
    expertise,
    qualification,
    youtube,
    linkedin,
    website,
  } = req.body;

  const user = req.user!;

  const instructorApplication = await InstructorApplication.create({
    user: user._id,
    motivation,
    experienceYears,
    expertise,
    qualification,
    socialLinks: {
      youtube,
      linkedin,
      website,
    },
  });

  if (!instructorApplication) throw new ApiError(500, "Something went wrong");

  return res.status(201).json(
    new ApiResponse(201, "Instructor application created successfully", {
      instructorApplication,
    })
  );
};
