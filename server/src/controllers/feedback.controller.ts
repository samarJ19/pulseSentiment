import { Request, Response } from "express";
import {
  getWeeklyFeedback,
  submitFeedback,
  analyzeFeedbacksService,
  getAnalysisService,
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

export const triggerAnalysisController = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to } = req.query;
    const inputValues = datesSchema.parse({ from, to });
    const analysis = await analyzeFeedbacksService(
      inputValues.from as string,
      inputValues.to as string
    );
    return sendSuccess(res, {
      message: "Analysis completed successfully",
      analysis,
    }, 200);
  }
);

export const getAnalysisController = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to } = req.query;
    const analysis = from && to
      ? await getAnalysisService(from as string, to as string)
      : await getAnalysisService();
    
    if (!analysis) {
      return sendSuccess(res, {
        message: "No analysis found for the selected date range",
        analysis: null,
      }, 200);
    }

    return sendSuccess(res, {
      message: "Analysis retrieved successfully",
      analysis,
    }, 200);
  }
);
