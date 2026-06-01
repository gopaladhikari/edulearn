import {
  instructorApprovedTemplate,
  instructorRejectedTemplate,
} from "@/emails/instructor-application.email.js";
import { InstructorApplication } from "@/models/instruction-application.models.js";
import { ApiError, ApiResponse } from "@/utils/api-responses.js";
import { instructorApplicationStatus } from "@/utils/constants.js";
import { sendEmail } from "@/utils/send-email.js";
import type { Request, Response } from "express";
import type { Content } from "mailgen";
import { isValidObjectId } from "mongoose";

export const getInstructorApplications = async (
  req: Request,
  res: Response
) => {
  const studentId = req.params.studentId as string;

  if (!isValidObjectId(studentId))
    throw new ApiError(400, "Invalid student id");

  const instructorApplications = await InstructorApplication.find({
    user: studentId,
  });

  if (!instructorApplications) throw new ApiError(500, "Something went wrong");

  return res.status(200).json(
    new ApiResponse(200, "Instructor applications fetched successfully", {
      instructorApplications,
    })
  );
};

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

export const updateInstructorApplication = async (
  req: Request,
  res: Response
) => {
  const reviewerId = req.user!._id;

  const applicationId = req.params.applicationId as string;

  const { status, rejectionReason } = req.body;

  if (!isValidObjectId(applicationId))
    throw new ApiError(400, "Invalid application id");

  const instructorApplication =
    await InstructorApplication.findById(applicationId).populate("user");

  if (!instructorApplication)
    throw new ApiError(404, "Instructor application not found");

  if (instructorApplication.status === instructorApplicationStatus.REJECTED)
    throw new ApiError(400, "Instructor application already rejected");

  instructorApplication.status = status;
  instructorApplication.reviewedBy = reviewerId;
  instructorApplication.reviewedAt = new Date();

  if (status === instructorApplicationStatus.REJECTED)
    instructorApplication.rejectionReason = rejectionReason;

  await instructorApplication.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, "Instructor application updated sucessfully.", {})
    );

  const applicant = instructorApplication.user as unknown as Express.User;

  let emailBody: Content;
  let emailSubject: string;

  if (status === instructorApplicationStatus.ACCEPTED) {
    emailSubject = "Edulearn Instructor Application Approved! 🎓";
    emailBody = instructorApprovedTemplate(applicant.username);
  } else {
    emailSubject = "Update on your Edulearn Instructor Application";
    emailBody = instructorRejectedTemplate(applicant.username, rejectionReason);
  }

  sendEmail(applicant.email, emailSubject, emailBody);
};

export const deleteInstructorApplication = async (
  req: Request,
  res: Response
) => {
  const applicationId = req.params.applicationId as string;

  if (!isValidObjectId(applicationId))
    throw new ApiError(400, "Invalid application id");

  const instructorApplication =
    await InstructorApplication.findByIdAndDelete(applicationId);

  if (!instructorApplication)
    throw new ApiError(404, "Instructor application not found");

  return res.status(200).json(
    new ApiResponse(200, "Instructor application deleted successfully", {
      instructorApplication,
    })
  );
};
