import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-responses.js";
import type { NextFunction, Request, Response } from "express";

export const validateRequest = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const err: Record<string, string>[] = [];

  errors.array().forEach((error) => {
    err.push({
      [error.type]: error.msg,
    });
  });

  throw new ApiError(422, "Validation failed", err);
};
