import express from 'express';
import { createFeedbackController } from '../controllers/feedback.controller';
const router = express.Router();

router.post('/create',createFeedbackController);
export default router;