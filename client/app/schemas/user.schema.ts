import { z } from "zod";

const username = z
  .string()
  .min(4, "Username must be at least 4 characters")
  .max(20, "Username must be at most 20 characters")
  .lowercase()
  .trim();

const email = z.email("Email is required").trim();

const password = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(20, "Password must be at most 20 characters")
  .trim();

// Register
export const registerSchema = z.object({
  username,
  email,
  password,
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

export const resetPasswordSchema = z.object({
  newPassword: password,
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
