import express from 'express';
import { loginUserController, registerUserController } from '../controllers/user.controller';

const router = express.Router();

router.post('/signup',registerUserController);
router.post('/login',loginUserController);

export default router;