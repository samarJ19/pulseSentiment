import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
import feedbackRoutes from './routes/feedback.routes';
import userRoutes from './routes/user.routes';
import testRoutes from "./routes/test.routes";
import { errorHandler } from './middleware/errorHandler';
dotenv.config({ path: './.env' });

const app = express();
const PORT = 3000;
export const saltRounds = 10;
app.get('/health/server', async (req:Request,res:Response) => {
    res.json({message:"Server is running !"});
});
app.use(express.json());

app.use('/feedback',feedbackRoutes);
app.use('/user',userRoutes);
app.use('/test',testRoutes);
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
});