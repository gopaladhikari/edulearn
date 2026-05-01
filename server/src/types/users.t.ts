import type {
  instructorApplicationStatus,
  UserRoles,
} from "../utils/constants.js";
import type { IUserProfile } from "./user-profile.t.types.js";

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
  profile: IUserProfile;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
  generateToken: () => {
    hashToken: string;
    unhashedToken: string;
    tokenExpiry: number;
  };
  isPasswordValid(password: string): Promise<boolean>;
}
