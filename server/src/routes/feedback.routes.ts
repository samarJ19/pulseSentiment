import express from 'express';
import { createFeedbackController, getFeedbackSummaryController, triggerAnalysisController, getAnalysisController, } from '../controllers/feedback.controller';
import authMiddleware from '../middleware/auth';
import { roleMiddleware } from '../middleware/role';
const router = express.Router();

router.post('/create',authMiddleware,createFeedbackController);
router.get('/summary',authMiddleware,roleMiddleware,getFeedbackSummaryController);
router.post('/analyze',authMiddleware,roleMiddleware,triggerAnalysisController);
router.get('/analysis',authMiddleware,roleMiddleware,getAnalysisController);
export default router;