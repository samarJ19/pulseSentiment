import prisma from "../config/db";
import { InputFeedback } from "../utils/types";

export const createFeedback = async (data:InputFeedback) =>{
    return await prisma.feedback.create({
        data:{
            message:data.message,
            category: data.category
        }   
    });
}

//weekly-summary