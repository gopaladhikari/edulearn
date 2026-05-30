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
