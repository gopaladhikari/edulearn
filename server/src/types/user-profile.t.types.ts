import type { Types } from "mongoose";
import type { gender, UserRoles } from "../utils/constants.js";

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Media {
  secure_url: string;
  public_id: string;
}

export interface IUserProfile {
  user: Types.ObjectId; // userId
  avatar: Media;
  firstName: string;
  phone: String;
  lastName: string;
  dateOfBirth: Date;
  bio: string;
  gender: gender;
  address: Address;
  role: UserRoles;
}
