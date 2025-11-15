import { Request, Response } from "express";
import {
  getWeeklyFeedback,
  submitFeedback,
} from "../services/feedback.service";
import { Category } from "../utils/types";

export const createFeedbackController = async (req: Request, res: Response) => {
  try {
    const { message, category }: { message: string; category: Category } =
      req.body;
    const feedback = await submitFeedback({ message, category });
    res.status(201).json({ success: true, data: feedback });
  } catch (error) {
    console.log("Got the error while creating feedback: ", error);
  }
};
export const getFeedbackSummaryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { from, to } = req.query;
    const feedbacks = await getWeeklyFeedback(from as string, to as string);
    return res.status(200).json({ success: true, data: feedbacks });
  } catch (err) {
    console.log("Got error while fetching weekly summary: ", err);
  }
};
