import "express-serve-static-core";
import "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: import("jsonwebtoken").JwtPayload;
  }
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
    userId: string;
    role: ROLE;
  }
}

export {};
