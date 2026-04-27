import { Document } from "mongoose";
import type { UserRoles } from "../utils/constants.js";

export interface IUsers extends Document {
  avatar: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  role: UserRoles;
  isEmailVerified: boolean;
  refreshToken: string;
  accessToken: string;
  dateOfBirth: Date;
  bio: string;
  forgotPasswordToken: string | undefined;
  fogotPasswordExpires: Date | undefined;
  emailVerificationToken: string | undefined;
  emailVerificationExpires: Date | undefined;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
  generateToken: () => {
    hashToken: string;
    unhashToken: string;
    tokenExpiry: number;
  };
  isPasswordValid(password: string): Promise<boolean>;
}
