import { Request, Response } from "express";
import {
  exportControllerInput,
  loginUserSchema,
  registerUserSchema,
} from "../utils/types";
import {
  exportFeedbackService,
  registerUser,
  signInUser,
} from "../services/user.service";
import { asyncHandler, sendSuccess } from "../utils/helperFunction";

export const registerUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password, role } = req.body;
    //need to put zod validation here
    const inputValues = registerUserSchema.parse({ email, password, role });

    //call service layer
    const result = await registerUser(
      inputValues.email,
      inputValues.password,
      inputValues.role
    );
    res.cookie("token", result.data.token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3 * 60 * 60 * 1000,
    });
    return sendSuccess(res, {
      message: "Logged In",
      userRole: result.data.role,
    });
  }
);

export const loginUserController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    //validate input with zod
    const inputValues = loginUserSchema.parse({ email, password });

    //call service layer
    const result = await signInUser(inputValues.email, inputValues.password);
    res.cookie("token", result.data.token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3 * 60 * 60 * 1000,
    });
    return sendSuccess(
      res,
      { message: "Logged In", userRole: result.data.role },
      200
    );
  }
);

export const exportFeedbackController = asyncHandler(
  async (req: Request, res: Response) => {
    const { from, to, format } = req.query;
    //zod parsing of the input
    const inputValues = exportControllerInput.parse({ from, to, format });

    const fileData = await exportFeedbackService(
      inputValues.from,
      inputValues.to,
      inputValues.format
    );

    if (format && format == "csv") {
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Description", "attachment; filename=feedback.csv");
      res.send(fileData);
    }
    return sendSuccess(res, fileData, 200);
  }
);

export const getMeController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user?.userId || !req.user?.role) {
      return sendSuccess(res, { userId: null, role: null }, 200);
    }
    return sendSuccess(
      res,
      { userId: req.user.userId, role: req.user.role },
      200
    );
  }
);
