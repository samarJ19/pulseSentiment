import express from 'express';
import { createFeedbackController, getFeedbackSummaryController, } from '../controllers/feedback.controller';
const router = express.Router();

router.post('/create',createFeedbackController);
router.get('/summary',getFeedbackSummaryController);
export default router;