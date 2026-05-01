import type {
  instructorApplicationStatus,
  UserRoles,
} from "../utils/constants.js";

export interface IUsers {
  username: string;
  password: string;
  email: string;
  role: UserRoles;
  isEmailVerified: boolean;
  refreshToken: string;

  forgotPasswordToken: string | undefined;
  forgotPasswordExpires: Date | undefined;
  emailVerificationToken: string | undefined;
  emailVerificationExpires: Date | undefined;

  instructorApplicationStatus: instructorApplicationStatus;

  generateAccessToken: () => string;
  generateRefreshToken: () => string;
  generateToken: () => {
    hashToken: string;
    unhashedToken: string;
    tokenExpiry: number;
  };
  isPasswordValid(password: string): Promise<boolean>;
}
