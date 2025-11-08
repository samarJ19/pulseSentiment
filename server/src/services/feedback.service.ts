import { createFeedback } from "../repositories/feedback.repository";
import { Category } from "../utils/types";

export const submitFeedback = async ({message,category}:{message:string,category:Category}) =>{
    if(!message || !category){
        throw new Error("Missing fields");
    }
    return await createFeedback({message,category});
};