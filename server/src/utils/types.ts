import { CATEGORY, ROLE } from "@prisma/client";

// Create a union type of the enum values
export type Category = keyof typeof CATEGORY;

export interface ApiError {
  name: string;
  message: string;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiFailure {
  success: false;
  error: ApiError;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export interface InputFeedback {
  message: string;
  category: Category;
}

export interface feedbackObjects {
  category: string;
  messages: string[];
}

export interface jwtPayload {
  userId?: string;
  role?: ROLE;
}



import * as z from "zod";
export const datesSchema = z.object({
  from: z.string(),
  to: z.string(),
});

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["USER", "ADMIN"]),
});
export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

//making a schema for export controller, the fields can be null or string
export const exportControllerInput = z.object({
  from:z.string().optional(),
  to:z.string().optional(),
  format:z.string().optional()
});