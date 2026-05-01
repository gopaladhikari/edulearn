import type { IUserProfile } from "@/types/user-profile.t.types.js";
import { defaultAvatar, gender } from "@/utils/constants.js";
import { Schema, model, Types } from "mongoose";

const userProfileSchema = new Schema<IUserProfile>(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
      unique: true, // 1-to-1 relationship
    },

    // Basic Info
    firstName: {
      type: String,
      required: true,
    },
    lastName: { type: String, required: true },
    avatar: {
      secure_url: {
        type: String,
        default: defaultAvatar,
      },
      public_id: String,
    },

    bio: {
      type: String,
      maxlength: [500, "Bio should be max 500 characters. "],
    },

    phone: { type: String },
    dateOfBirth: { type: Date },
    gender: {
      type: String,
      enum: {
        values: Object.values(gender),
        message: "Invalid gender",
      },
    },

    // Address
    address: {
      street: String,
      city: { type: String, required: true },
      state: String, // Province
      country: { type: String, default: "Nepal" },
      postalCode: String,
    },

    // Instructor-specific fields (can be partially filled)
    instructorDetails: {
      title: String,
      expertise: [String],
      experienceYears: Number,
      qualification: String,
      bannerImage: {
        secure_url: {
          type: String,
          default: defaultAvatar,
        },
        public_id: String,
      },
      socialLinks: {
        youtube: String,
        linkedin: String,
        website: String,
      },
      motivation: String, // Why they want to teach
    },

    // Admin review fields
    reviewedBy: { type: Types.ObjectId, ref: "User" },
    reviewedAt: Date,
    rejectionReason: String,
  },
  { timestamps: true }
);

export const UserProfile = model("UserProfile", userProfileSchema);
