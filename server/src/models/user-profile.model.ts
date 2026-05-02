import type { IUserProfile } from "@/types/user-profile.t.js";
import { defaultAvatar, gender } from "@/utils/constants.js";
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

    // Basic Info
    firstName: {
      type: String,
      maxlength: [20, "First name should be max 20 characters."],
    },

    lastName: {
      type: String,
      maxlength: [20, "Last name should be max 20 characters."],
    },

    avatar: {
      type: {
        secure_url: {
          type: String,
          default: defaultAvatar,
          required: [true, "Secure url is required."],
        },
        public_id: {
          type: String,
        },
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
        country: { type: String, required: true },
        postalCode: String,
      },
    },
  },
  { timestamps: true }
);

export const UserProfile = model("UserProfile", userProfileSchema);
