import express from 'express';
import { exportFeedbackController, loginUserController, registerUserController } from '../controllers/user.controller';
import authMiddleware from '../middleware/auth';
import { roleMiddleware } from '../middleware/role';

const router = express.Router();

router.post('/signup',registerUserController);
router.post('/login',loginUserController);
router.get('/export',authMiddleware,roleMiddleware,exportFeedbackController);

export default router;