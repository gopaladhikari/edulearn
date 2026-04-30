import type { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";
import { ApiError } from "@/utils/api-responses.js";

type Schemas = {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
};

export const validateRequest =
  (schemas: Schemas) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.body) schemas.body.parse(req.body);

      if (schemas.query) schemas.query.parse(req.query);

      if (schemas.params) schemas.params.parse(req.params);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        }));

        return next(new ApiError(400, "Validation failed", details));
      }
      return next(error);
    }
  };
