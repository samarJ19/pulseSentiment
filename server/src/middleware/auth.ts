import jwt, { JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "") as string;
    if (!token) {
      console.log(token);
      throw new ApiError("InvalidToken", "Invalid or Missing Token", 401);
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    if (!decoded.userId || !decoded.role) {
      throw new ApiError("InvalidPayload", "Invalid JWT Payload", 401);
    }
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
    return next();
  } catch (error: any) {
    throw new ApiError(
      error.name || "AuthError",
      error.message || "Auth Error"
    );
  }
};

export default authMiddleware;
