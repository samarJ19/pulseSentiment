import { ROLE } from "@prisma/client";
import {
  getFeedbackRaw,
  loginUser,
  storeUser,
} from "../repositories/user.repository";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/types";
import { ApiError } from "../utils/ApiError";

export const generateToken = (payload: {
  userId: string | undefined;
  role: ROLE | undefined;
}) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "3h",
  });
  return token;
};
export const registerUser = async (
  email: string,
  password: string,
  role: ROLE
): Promise<ApiResponse<{ token: string }>> => {
  try {
    let user = await storeUser(email, password, role);
    const payload = {
      userId: user?.userId,
      role: user?.role,
    };
    const token = generateToken(payload);
    return {
      success: true,
      data: { token },
    };
  } catch (error: any) {
    throw new ApiError(
      "ServiceError",
      error.message || "User Registering Service failed",
      500
    );
  }
};
export const signInUser = async (
  email: string,
  password: string
): Promise<ApiResponse<{ token: string }>> => {
  try {
    let user = await loginUser(email, password);
    const payload = {
      userId: user?.userId,
      role: user?.role,
    };
    const token = generateToken(payload);
    return {
      success: true,
      data: { token },
    };
  } catch (error: any) {
    throw new ApiError(
      "SignInService Error",
      error.message || "Service failed",
      500
    );
  }
};

const sanitizeCSV = (value: string) => {
  if (value === null || value === undefined) return "";

  let str = String(value);
  //Escape exisiting quotes
  str = str.replace(/"/g, '""');

  //Wrap in quotes if needed
  if (str.includes(",") || str.includes("\n") || str.includes('"')) {
    return `"${str}"`;
  }
  return str;
};

export const convertToCSV = (feedbacks?: any[]) => {
  if (!feedbacks || feedbacks.length === 0) {
    return "message,category,createdAt\n"; // return headers only
  }
  const headers = ["message", "category", "createdAt"];

  const row = feedbacks.map((rec) => {
    const message = sanitizeCSV(rec.message);
    const category = sanitizeCSV(rec.category);
    const createdAt = rec.createdAt ? new Date(rec.createdAt) : "";

    return `${message},${category},${createdAt}`;
  });
  return [headers.join(","), ...row].join("\n"); //What this line is doing ?
};

export const exportFeedbackService = async (
  from?: string,
  to?: string,
  format?: string
) => {
  try {
    const feedbacks = await getFeedbackRaw(from, to);
    if (format == "csv") {
      return convertToCSV(feedbacks);
    }
    return feedbacks;
  } catch (error: any) {
    throw new ApiError(
      "exportFeedbackService Error",
      error.message || "Service failed",
      500
    );
  }
};
