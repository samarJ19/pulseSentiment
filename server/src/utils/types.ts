import { CATEGORY } from "../../generated/prisma/client";

// Create a union type of the enum values
export type Category = keyof typeof CATEGORY;

export interface InputFeedback {
  message: string;
  category: Category;
}