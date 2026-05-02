import type { HydratedDocument } from "mongoose";
import type { IUsers } from "@/types/users.t.js";
import type { IUserProfile } from "@/types/user-profile.t.js";

export const getFormatedUser = (
  user: HydratedDocument<IUsers>,
  profile?: HydratedDocument<IUserProfile> | null
) => {
  const coreData = {
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
  };

  const targetProfile =
    profile || (user.profile as HydratedDocument<IUserProfile>);

  if (!targetProfile) return coreData;

  return {
    ...coreData,
    profile: {
      firstName: targetProfile.firstName,
      lastName: targetProfile.lastName,
      fullName: `${targetProfile.firstName} ${targetProfile.lastName}`.trim(),
      avatar: targetProfile.avatar?.secure_url || null,
      bio: targetProfile.bio || null,
      phone: targetProfile.phone || null,
      gender: targetProfile.gender,
      dateOfBirth: targetProfile.dateOfBirth || null,
      address: targetProfile.address
        ? {
            street: targetProfile.address.street || null,
            city: targetProfile.address.city,
            state: targetProfile.address.state || null,
            country: targetProfile.address.country,
            postalCode: targetProfile.address.postalCode || null,
          }
        : null,
    },
  };
};
