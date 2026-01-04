import express from 'express';
import { createFeedbackController, getFeedbackSummaryController, } from '../controllers/feedback.controller';
import authMiddleware from '../middleware/auth';
import { roleMiddleware } from '../middleware/role';
const router = express.Router();

router.post('/create',authMiddleware,createFeedbackController);
router.get('/summary',authMiddleware,roleMiddleware,getFeedbackSummaryController);
export default router;