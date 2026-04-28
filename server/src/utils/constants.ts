export const appName = "edulearn";

export enum UserRoles {
  ADMIN = "admin",
  INSTRUCTOR = "instuctor",
  STUDENT = "student",
}

export enum Courselevels {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export enum Rating {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE,
}

export enum paymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
}
