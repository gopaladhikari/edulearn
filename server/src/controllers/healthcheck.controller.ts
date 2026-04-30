import { ApiResponse } from "../utils/api-responses.js";
import type { Response, Request } from "express";

export const healthCheck = async (_req: Request, res: Response) => {
  res.status(200).json(new ApiResponse(200, "OK", null));
};
