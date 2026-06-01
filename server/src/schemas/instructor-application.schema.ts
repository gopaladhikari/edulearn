import { instructorApplicationStatus } from "@/utils/constants.js";
import { z } from "zod";

export const instructorApplicationSchema = z.object({
  motivation: z.string().min(200).max(800),
  experienceYears: z.number().min(0).max(30),
  expertise: z.array(z.string()).min(1),
  qualification: z.string().min(1),
  youtube: z.url().optional().or(z.literal("")),
  linkedin: z.url().optional().or(z.literal("")),
  website: z.url().optional().or(z.literal("")),
});

export const updateInstructorApplicationSchema = z
  .object({
    status: z.enum([
      instructorApplicationStatus.REJECTED,
      instructorApplicationStatus.ACCEPTED,
    ]),
    rejectionReason: z.string().min(1).max(500).optional(),
  })
  .refine(
    (data) => {
      if (data.status === instructorApplicationStatus.REJECTED)
        return !!data.rejectionReason;
      return true;
    },
    {
      message: "Rejection reason is required.",
      path: ["rejectionReason"],
    }
  );
