import { z } from "zod";

const username = z
  .string()
  .min(4, "Username must be at least 4 characters")
  .max(20, "Username must be at most 20 characters")
  .regex(/^[a-z0-9_]+$/, "Username must be lowercase alphanumeric/underscore")
  .trim();

const email = z.email("Email is required").toLowerCase().trim();

const password = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(20, "Password must be at most 20 characters")
  .trim();

const token = z.string().min(1, "Invalid token").trim();

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

// Reset password (params + body)
export const resetPasswordSchema = {
  params: z.object({
    resetToken: token,
  }),
  body: z.object({
    newPassword: password,
  }),
};

// Change password
export const changePasswordSchema = z.object({
  oldPassword: password,
  newPassword: password,
});

export const emailVerificationTokenSchema = z.object({
  verificationToken: token,
});

export const resendEmailVerificationSchema = z.object({
  email,
});
