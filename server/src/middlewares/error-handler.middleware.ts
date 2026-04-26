import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-responses.js";

export const errorHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let status = 500;
  let message = "Internal Server Error";
  let isOperational = false;
  let errors = null;

  if (err instanceof ApiError) {
    status = err.status;
    message = err.message;
    isOperational = err.isOperational;
    errors = err.errors;
  } else if (err instanceof Error) message = err.message;

  if (process.env.NODE_ENV === "development") {
    return res.status(status).json({
      success: false,
      status,
      message,
      errors,
      stack: err.stack,
    });
  }

  if (isOperational)
    return res.status(status).json({
      success: false,
      message,
      errors,
    });

  console.error("💥 UNEXPECTED ERROR:", err);

  return res.status(500).json({
    success: false,
    message: "Something went wrong on our end.",
  });
};
