import jwt, { JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export const authMiddleware = async (
  req:Request,
  res:Response,
  next:NextFunction
) => {
  try {
    const token = req
      .header("Authorization")
      ?.replace("Bearer ", "") as string;
    if (!token) {
      console.log(token);
      return res.status(401).json({
        success: false,
        error:{
          name:"InvalidToken",
          message:"Invalid or missing token, login again"
        }
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    if(!decoded.userId || !decoded.role){
      return res.status(401).json({
        success:false,
        error:{
          name:"InvalidTokenPayload",
          message:"Token payload is invalid"
        }
      })
    }
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };
    return next();
  } catch (error:any) {
    console.log("Got the following error: ",error?.name);
    console.log("Error detail: ",error?.message);
    res.status(401).json({
      success:false,
      error:{
        name:error?.name ?? "AuthError",
        message: error?.message ?? "Authentication failed"
      }
    });
  }
};

export default authMiddleware;
