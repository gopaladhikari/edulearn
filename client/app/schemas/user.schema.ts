import { z } from "zod";

const username = z
  .string()
  .min(6, "Username must be at least 6 characters")
  .max(20, "Username must be at most 20 characters")
  .lowercase()
  .trim();

const email = z.email("Email is required").trim();

const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

// Register
export const registerSchema = z
  .object({
    username,
    email: z.email("Please enter a valid email address"),
    password: password,
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Login
export const loginSchema = z.object({
  email,
  password,
});

// Forgot password
export const forgotPasswordSchema = z.object({
  email,
});

export const resetPasswordSchema = z
  .object({
    newPassword: password,
    confirmPassword: password,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const resendEmailVerificationSchema = z.object({
  email,
});

export const instructorApplicationSchema = z.object({
  motivation: z
    .string()
    .min(10, "Motivation must be at least 10 characters")
    .max(800, "Motivation cannot exceed 800 characters"),
  experienceYears: z
    .number()
    .min(0, "Experience cannot be negative")
    .max(30, "Experience must be less than 30 years"),
  expertise: z
    .array(z.string())
    .min(1, "At least one area of expertise is required"),
  qualification: z
    .string()
    .min(5, "Qualification must be at least 5 characters")
    .max(200, "Qualification cannot exceed 200 characters"),
  youtubeUrl: z
    .url("Please enter a valid YouTube URL")
    .optional()
    .or(z.literal("")),
  linkedinUrl: z
    .url("Please enter a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  websiteUrl: z
    .url("Please enter a valid website URL")
    .optional()
    .or(z.literal("")),
});

export type InstructorApplicationFormValues = z.infer<
  typeof instructorApplicationSchema
>;

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type ResendEmailVerificationSchema = z.infer<
  typeof resendEmailVerificationSchema
>;
