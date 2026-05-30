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

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type ResendEmailVerificationSchema = z.infer<
  typeof resendEmailVerificationSchema
>;
