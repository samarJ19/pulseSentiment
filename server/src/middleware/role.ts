import { Request, Response, NextFunction } from "express";

export const roleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({
        name: "Unauthorized",
        message: "You do not have right permission to view this page",
      });
    }
    return next();
  } catch (error: any) {
    return res.status(401).json({
      //Standard error response , I want to define standard error and success response
      //for consistent response
      name: error?.name,
      message: error?.message,
    });
  }
};
