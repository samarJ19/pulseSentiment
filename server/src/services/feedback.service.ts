import {
  createFeedback,
  feedbackSummary,
  lastWeekFeedbackSummary,
} from "../repositories/feedback.repository";
import { Category, InputFeedback, feedbackObjects } from "../utils/types";

export const submitFeedback = async ({
  message,
  category,
}: {
  message: string;
  category: Category;
}) => {
  if (!message || !category) {
    throw new Error("Missing fields");
  }
  return await createFeedback({ message, category });
};

export const getWeeklyFeedback = async (from?: string, to?: string) => {
  const feedbacks: InputFeedback[] =
    from && to
      ? await feedbackSummary(from, to)
      : await lastWeekFeedbackSummary();
      const summary = {           //This logic has been added to make the code more cleaner.
      // For scaling we should use a loop so that category gets added dynamically
        TEAM: [] as string[],
        WORKLOAD : [] as string[],
        PERSONAL : [] as string[]
      }
      feedbacks.forEach((fb)=>{
        if(!summary[fb.category]) summary[fb.category] = [];
        summary[fb.category].push(fb.message);
      });
      return Object.entries(summary).map(([category,messages]) =>({
        category,
        messages
      }));
};
