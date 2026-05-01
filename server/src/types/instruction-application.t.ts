import type { Types } from "mongoose";
import type { Media } from "./user-profile.t.types.js";
import type { instructorApplicationStatus } from "@/utils/constants.js";

interface SocialLinks {
  youtube: string;
  linkedin: string;
  website: string;
}

export interface InstructorDetails {
  user: Types.ObjectId;
  title: string;
  expertise: string[];
  experienceYears: number;
  qualification: string;
  bannerImage: Media;
  socialLinks: SocialLinks;
  motivation: string;
  reviewedBy: Types.ObjectId;
  reviewedAt: Date;
  rejectionReason: string;
  status: instructorApplicationStatus;
}
