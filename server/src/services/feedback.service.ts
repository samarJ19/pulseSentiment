import {
  createFeedback,
  feedbackSummary,
  lastWeekFeedbackSummary,
  getFeedbacksByDateRange,
  createFeedbackAnalysis,
  getAnalysisByDateRange,
  getLatestAnalysis,
} from "../repositories/feedback.repository";
import { Category, InputFeedback, feedbackObjects } from "../utils/types";
import { analyzeFeeds } from "../utils/groqClient";
import dayjs from "dayjs";

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

export const analyzeFeedbacksService = async (from: string, to: string) => {
  try {
    // Fetch feedbacks in the date range
    const feedbacks = await getFeedbacksByDateRange(from, to);
    
    if (feedbacks.length === 0) {
      throw new Error("No feedbacks found in the selected date range");
    }

    // Aggregate feedbacks with category grouping
    const feedbackText = feedbacks
      .map((fb) => `[${fb.category}] ${fb.message}`)
      .join("\n");

    // Call Groq AI for analysis
    const analysisResult = await analyzeFeeds(feedbackText);
    const parsedAnalysis = JSON.parse(analysisResult);

    // Build category breakdown
    const categoryBreakdown: Record<string, number> = {
      TEAM: 0,
      WORKLOAD: 0,
      PERSONAL: 0,
    };
    feedbacks.forEach((fb) => {
      if (categoryBreakdown[fb.category] !== undefined) {
        categoryBreakdown[fb.category]++;
      }
    });

    // Store analysis in database
    const analysis = await createFeedbackAnalysis(
      new Date(from),
      new Date(to),
      parsedAnalysis.summary,
      parsedAnalysis.mitigations,
      categoryBreakdown
    );

    return analysis;
  } catch (error) {
    throw new Error(
      `Failed to analyze feedbacks: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

export const getAnalysisService = async (from?: string, to?: string) => {
  try {
    if (from && to) {
      return await getAnalysisByDateRange(from, to);
    }
    return await getLatestAnalysis();
  } catch (error) {
    throw new Error(
      `Failed to retrieve analysis: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};
