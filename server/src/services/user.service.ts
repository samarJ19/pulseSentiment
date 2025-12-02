import { ROLE } from "@prisma/client";
import { loginUser, storeUser } from "../repositories/user.repository";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/types";

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
    if (user?.error) {
      return {
        success: false,
        error: {
          name: "UserExistsError",
          message: user.error,
        },
      };
    }
    const payload = {
      userId: user?.userId,
      role: user?.role,
    };
    const token = generateToken(payload);
    return {
      success: true,
      data: { token },
    };
  } catch (error) {
    console.log("Got the following error while registering user: ", error);
    throw error;
  }
};
export const signInUser = async (
  email: string,
  password: string
): Promise<ApiResponse<{ token: string }>> => {
  try {
    let user = await loginUser(email, password);
    if (user?.error) {
      return {
        success: false,
        error: { name: "AuthError", message: user.error },
      };
    }
    const payload = {
      userId: user?.userId,
      role: user?.role,
    };
    const token = generateToken(payload);
    return {
      success: true,
      data: { token },
    };
  } catch (error) {
    console.log("Got the following error while signing in user: ", error);
    throw error;
  }
};
