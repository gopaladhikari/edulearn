import { z } from "zod";
import { isValidObjectId } from "mongoose";

export const mongoIdSchema = z.string().refine((id) => isValidObjectId(id), {
  message: "Invalid ObjectId",
});
