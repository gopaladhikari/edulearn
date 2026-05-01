import type { Types } from "mongoose";
import type { gender } from "../utils/constants.js";

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface SocialLinks {
  youtube: string;
  linkedin: string;
  website: string;
}

interface InstructorDetails {
  title: string;
  expertise: string[];
  experienceYears: number;
  qualification: string;
  bannerImage: string;
  socialLinks: SocialLinks;
  motivation: string;
}

interface Avatar {
  secure_url: string;
  public_id: string;
}

export interface IUserProfile {
  user: Types.ObjectId; // userId
  avatar: Avatar;
  firstName: string;
  phone: String;
  lastName: string;
  dateOfBirth: Date;
  bio: string;
  gender: gender;
  address: Address;
  instructorDetails: InstructorDetails;
  reviewedBy: Types.ObjectId; // userId
  reviewedAt: Date;
  rejectionReason: string;
}
