import { CATEGORY } from "@prisma/client";

// Create a union type of the enum values
export type Category = keyof typeof CATEGORY;

export interface InputFeedback {
  message: string;
  category: Category;
}

export interface feedbackObjects {
    category:string,
    messages:string[]
}