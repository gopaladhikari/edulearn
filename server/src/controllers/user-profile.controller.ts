import { UserProfile } from "@/models/user-profile.model.js";
import { ApiError, ApiResponse } from "@/utils/api-responses.js";
import { deleteMedia, uploadMedia } from "@/utils/cloudinary.js";
import { defaultAvatar } from "@/utils/constants.js";
import type { Request, Response } from "express";

export const updateProfile = async (req: Request, res: Response) => {
  const user = req.user!;

  const allowedFields = [
    "firstName",
    "lastName",
    "bio",
    "phone",
    "dateOfBirth",
    "gender",
    "address",
  ];

  const updateData = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
  );

  const profile = await UserProfile.findOneAndUpdate(
    { user: user._id },
    {
      $set: updateData,
      $setOnInsert: {
        user: user._id,
        avatar: {
          secure_url: defaultAvatar,
        },
      },
    },
    {
      upsert: true,
      new: true,
      runValidators: true,
    }
  );

  if (!profile) throw new ApiError(400, "Profile not found.");

  return res
    .status(200)
    .json(new ApiResponse(200, "Profile updated successfully.", { user }));
};

export const updateAvatar = async (req: Request, res: Response) => {
  const avatar = req.file;

  const user = req.user!;

  if (!avatar) throw new ApiError(400, "Avatar not found. Try again.");

  const result = await uploadMedia(avatar.path);

  if (!result) throw new ApiError(400, "Avatar upload failed.");

  const previousAvatar = user.profile.avatar.secure_url;
  const previoudAvatarId = user.profile.avatar.public_id;

  user.profile.avatar.secure_url = result.secure_url;
  user.profile.avatar.public_id = result.public_id;

  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, "Avatar updated successfully", null));

  if (previousAvatar !== defaultAvatar) deleteMedia(previoudAvatarId);
};
