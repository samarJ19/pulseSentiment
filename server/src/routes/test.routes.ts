import express, { Request, Response } from "express";
import authMiddleware from "../middleware/auth";
import { roleMiddleware } from "../middleware/role";

const router = express.Router();

router.get(
  "/authCheck",
  authMiddleware,
  roleMiddleware,
  async (req: Request, res: Response) => {
    res.json({
        success:true,
        data:{
            name:"Auth middleware",
            message:"Auth middleware working as expected"
        }
    })
  }
);

export default router;