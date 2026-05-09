import type { Request, Response, NextFunction } from "express";
import { ApiError } from "@/utils/api-responses.js";
import { UserRoles } from "@/utils/constants.js";

export const rbac =
  (roles: UserRoles[]) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user!;

    if (!roles.includes(user.role))
      throw new ApiError(403, "Access denied. You don't have permission.");

    next();
  };
