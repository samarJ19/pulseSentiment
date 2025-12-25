import { Request, Response } from "express";
import {
  getWeeklyFeedback,
  submitFeedback,
} from "../services/feedback.service";
import { Category, datesSchema } from "../utils/types";
import { asyncHandler, sendSuccess } from "../utils/helperFunction";

export const createFeedbackController = asyncHandler(
  async (req: Request, res: Response) => {
    const { message, category }: { message: string; category: Category } =
      req.body;
    const feedback = await submitFeedback({ message, category });
    return sendSuccess(res,feedback,201);
  }
);
export const getFeedbackSummaryController = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to } = req.query;
    const inputValues = datesSchema.parse({ from, to });
    const feedbacks = await getWeeklyFeedback(
      inputValues.from as string,
      inputValues.to as string
    );
    return sendSuccess(res,feedbacks,201);
  }
);
