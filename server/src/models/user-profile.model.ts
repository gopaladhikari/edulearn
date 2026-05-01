import type { IUserProfile } from "@/types/user-profile.t.types.js";
import { defaultAvatar, gender, UserRoles } from "@/utils/constants.js";
import { Schema, model, Types } from "mongoose";

const userProfileSchema = new Schema<IUserProfile>(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
      unique: true,
    },

    role: {
      type: String,
      enum: {
        values: Object.values(UserRoles),
        message: "Invalid user rolee",
      },
      default: UserRoles.STUDENT,
      required: [true, "Role is required."],
    },

    // Basic Info
    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    avatar: {
      type: {
        secure_url: {
          type: String,
          default: defaultAvatar,
        },
        public_id: String,
      },
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
      type: {
        street: String,
        city: { type: String, required: true },
        state: String,
        country: { type: String, default: "Nepal" },
        postalCode: String,
      },
    },
  },
  { timestamps: true }
);

export const UserProfile = model("UserProfile", userProfileSchema);
