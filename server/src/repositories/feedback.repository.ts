import dayjs from "dayjs";
import prisma from "../config/db";
import { InputFeedback } from "../utils/types";
import { ApiError } from "../utils/ApiError";

export const createFeedback = async (data: InputFeedback) => {
  return await prisma.feedback.create({
    data: {
      message: data.message,
      category: data.category,
    },
  });
};

//this function will return a list/array of feedbacks
export const lastWeekFeedbackSummary = async () => {
  //date now -7 days to date now
  try {
    const now = dayjs().endOf("day").toDate();
    const sevenDaysAgo = dayjs().subtract(7, "day").startOf("day").toDate();
    const feedbacks = await prisma.feedback.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
          lt: now,
        },
      },
      select: {
        category: true,
        message: true,
      },
    });
    return feedbacks;
  } catch (error) {
    throw new ApiError(
      "DatabaseError",
      "Failed to fetch last week feedback summary",
      500
    );
  }
};

export const feedbackSummary = async (from: string, to: string) => {
  try {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const feedbacks = await prisma.feedback.findMany({
      where: {
        createdAt: {
          gte: fromDate,
          lte: toDate,
        },
      },
      select: {
        category: true,
        message: true,
      },
    });
    return feedbacks;
  } catch (error) {
    throw new ApiError(
      "DatabaseError",
      "Failed to fetch feedback summary",
      500
    );
  }
};

export const getFeedbacksByDateRange = async (from: string, to: string) => {
  try {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const feedbacks = await prisma.feedback.findMany({
      where: {
        createdAt: {
          gte: fromDate,
          lte: toDate,
        },
      },
      select: {
        id: true,
        message: true,
        category: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return feedbacks;
  } catch (error) {
    throw new ApiError(
      "DatabaseError",
      "Failed to fetch feedbacks for analysis",
      500
    );
  }
};

export const createFeedbackAnalysis = async (
  dateStart: Date,
  dateEnd: Date,
  summary: string,
  mitigations: object,
  categoryBreakdown?: object
) => {
  try {
    return await prisma.feedbackAnalysis.create({
      data: {
        dateStart,
        dateEnd,
        summary,
        mitigations,
        categoryBreakdown,
      },
    });
  } catch (error) {
    throw new ApiError(
      "DatabaseError",
      "Failed to create feedback analysis",
      500
    );
  }
};

export const getAnalysisByDateRange = async (from: string, to: string) => {
  try {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    const analysis = await prisma.feedbackAnalysis.findFirst({
      where: {
        dateStart: {
          gte: fromDate,
        },
        dateEnd: {
          lte: toDate,
        },
      },
      orderBy: {
        analyzedAt: "desc",
      },
    });
    return analysis;
  } catch (error) {
    throw new ApiError(
      "DatabaseError",
      "Failed to fetch analysis",
      500
    );
  }
};

export const getLatestAnalysis = async () => {
  try {
    return await prisma.feedbackAnalysis.findFirst({
      orderBy: {
        analyzedAt: "desc",
      },
    });
  } catch (error) {
    throw new ApiError(
      "DatabaseError",
      "Failed to fetch latest analysis",
      500
    );
  }
};
