import { Request, Response } from "express";
import { loginUserSchema, registerUserSchema } from "../utils/types";
import { registerUser, signInUser } from "../services/user.service";

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    //need to put zod validation here
    const inputValues = registerUserSchema.parse({ email, password, role });
    //call service layer
    const result = await registerUser(
      inputValues.email,
      inputValues.password,
      inputValues.role
    );
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({
      success: false,
      error: {
        name: "ValidationError",
        message: error.message,
      },
    });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    //validate input with zod
    const inputValues = loginUserSchema.parse({ email, password });
    //call service layer
    const result = await signInUser(inputValues.email, inputValues.password);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
