import { Request, Response } from "express";
import {
  getWeeklyFeedback,
  submitFeedback,
} from "../services/feedback.service";
import { Category, datesSchema } from "../utils/types";
import * as z from 'zod';

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
    const inputValues = datesSchema.parse({from,to});
    const feedbacks = await getWeeklyFeedback(inputValues.from as string, inputValues.to as string);
    return res.status(200).json({ success: true, data: feedbacks });
  } catch (error) {
    if(error instanceof z.ZodError){
    error.issues; 
  }
    console.log("Got error while fetching weekly summary: ", error);
  }
};
