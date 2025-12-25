import { ROLE } from "@prisma/client";
import prisma from "../config/db";
import bcrypt from "bcrypt";
import { saltRounds } from "..";
import dayjs from "dayjs";
import { ApiError } from "../utils/ApiError";

export const storeUser = async (
  email: string,
  password: string,
  role: ROLE
) => {
  let user = await prisma.user.findUnique({
    select: {
      id: true,
    },
    where: {
      email: email,
    },
  });
  if (user) {
    throw new ApiError(
      "DatabaseError",
      "User already exist with the email",
      500
    );
  }
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        role: role,
      },
    });
    return {
      userId: user.id,
      role: role,
    };
  } catch (error) {
    throw new ApiError("DatabaseError", "Failed to register user", 500);
  }
};

export const loginUser = async (email: string, password: string) => {
  let user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    throw new ApiError(
      "DatabaseError",
      "User Not Found, register and try again later",
      500
    );
  }
  let isPasswordValid: boolean;
  try {
    isPasswordValid = await bcrypt.compare(password, user.password);
  } catch (error) {
    
    throw new ApiError("DatabaseError", "Failed to register user", 500);
  }
  if (!isPasswordValid) {
    
    throw new ApiError("DatabaseError", "Incorrect Password", 401);
  }
  return {
    userId: user.id,
    role: user.role,
  };
};

export const getFeedbackRaw = async (from?: string, to?: string) => {
  try {
    let whereClause = {};
    if (from && to) {
      const fromDate = dayjs(from).startOf("day").toDate();
      const toDate = dayjs(to).endOf("day").toDate();
      whereClause = {
        createdAt: {
          gte: fromDate,
          lte: toDate,
        },
      };
    }
    return await prisma.feedback.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    
    throw new ApiError("DatabaseError", "Failed to fetch feedbacks", 500);
  }
};
