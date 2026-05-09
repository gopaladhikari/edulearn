declare type User = {
  _id: string;
  id?: string;
  username: string;
  email: string;
  role: "student" | "instructor" | "admin";
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
};
