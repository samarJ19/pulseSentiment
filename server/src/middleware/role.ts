import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const roleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.role !== "ADMIN") {
      throw new ApiError(
        "Unauthorized",
        "You do not have right permission to view this page",
        403
      );
    }
    return next();
  } catch (error: any) {
    throw new ApiError(error.name, error.message);
  }
};
