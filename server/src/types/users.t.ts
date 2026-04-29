import type { UserRoles } from "../utils/constants.js";

export interface IUsers {
  avatar: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  role: UserRoles;
  isEmailVerified: boolean;
  refreshToken: string;
  dateOfBirth: Date;
  bio: string;
  forgotPasswordToken: string | undefined;
  forgotPasswordExpires: Date | undefined;
  emailVerificationToken: string | undefined;
  emailVerificationExpires: Date | undefined;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
  generateToken: () => {
    hashToken: string;
    unhashedToken: string;
    tokenExpiry: number;
  };
  isPasswordValid(password: string): Promise<boolean>;
}
