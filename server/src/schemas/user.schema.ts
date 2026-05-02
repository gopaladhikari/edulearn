import { gender } from "@/utils/constants.js";
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

export const updateProfileSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  bio: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  dateOfBirth: z.string().trim().optional(),
  gender: z.enum(Object.values(gender)).optional(),
  address: z.object({
    street: z.string().trim().optional(),
    city: z.string().trim().optional(),
    state: z.string().trim(),
    country: z.string().trim(),
    postalCode: z.string().trim().optional(),
  }),
});
