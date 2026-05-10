export type UserRole = "student" | "instructor" | "admin";

export type Avatar = {
  _id: string;
  secure_url: string;
};

export type UserProfile = {
  _id: string;
  user: string;
  avatar?: Avatar;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;
  id?: string;
  username: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  profile?: UserProfile;
  createdAt: string;
  updatedAt: string;
};
