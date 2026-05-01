import type { gender, UserRoles } from "../utils/constants.js";

export interface IUsers {
  avatar: {
    secure_url: string;
    public_id: string;
  };
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
  gender: gender;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
  generateToken: () => {
    hashToken: string;
    unhashedToken: string;
    tokenExpiry: number;
  };
  isPasswordValid(password: string): Promise<boolean>;
}
