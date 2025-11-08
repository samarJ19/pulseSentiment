import express, { Request, Response } from 'express';
import dotenv from 'dotenv'
import feedbackRoutes from './routes/feedback.routes';
dotenv.config({ path: './.env' });

const app = express();
const PORT = 3000;

app.get('/health/server', async (req:Request,res:Response) => {
    res.json({message:"Server is running !"});
});
app.use(express.json());

app.use('/feedback',feedbackRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
});