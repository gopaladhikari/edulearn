import { z } from "zod";

export const courseSchema = z.object({
  title: z
    .string()
    .min(1, "Course title is required")
    .max(100, "Course title cannot exceed 100 characters"),
  subtitle: z
    .string()
    .max(200, "Subtitle cannot exceed 200 characters")
    .optional(),
  description: z
    .string()
    .min(1, "Course description is required")
    .max(500, "Description cannot exceed 500 characters"),
  category: z.string().min(1, "Category is required"),
  level: z.enum(
    ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
    "Please select a valid course level"
  ),
  price: z.number().min(0, "Price cannot be negative"),

  language: z.string().min(1, "Language is required"),

  thumbnail: z.string().min(1, "Course thumbnail is required"),
});

export type CourseFormValues = z.infer<typeof courseSchema>;
