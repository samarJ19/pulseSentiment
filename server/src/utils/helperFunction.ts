import { NextFunction, Request, Response } from "express";
import { ApiSuccess } from "./types";

export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

export const sendSuccess = <T>(res: Response, data: T, statusCode = 200) => {
  const response: ApiSuccess<T> = {
    success: true,
    data,
  };
  return res.status(statusCode).json(response);
};
