import { NextFunction, Request, Response } from "express";
import { ApiFailure } from "../utils/types";
import { ApiError } from "../utils/ApiError";
import { ZodError } from "zod";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    console.error(err);

  // Ensure CORS headers are set on error responses
  const origin = req.headers.origin as string;
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.issues,
    });
  }

  if (err instanceof ApiError) {
    const response: ApiFailure = {
      success: false,
      error: {
        name: err.name,
        message: err.message,
      },
    };
    return res.status(err.statusCode).json(response);
  }
  res.status(500).json({
    success: false,
    error: {
      name: "InternalServerError",
      message: "Something went wrong",
    },
  });
};
