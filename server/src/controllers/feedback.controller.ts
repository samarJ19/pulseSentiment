import { Request, Response } from "express";
import { submitFeedback } from "../services/feedback.service";
import { Category } from "../utils/types";

export const createFeedbackController = async (req:Request,res:Response ) =>{
    const { message, category } : {message:string ,category:Category } = req.body;
    const feedback = await submitFeedback({message,category});
    res.status(201).json({success:true,data:feedback});
};
