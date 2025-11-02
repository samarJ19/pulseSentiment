import express, { Request, Response } from 'express';
import 'dotenv/config'; //might need to add path of env file

const app = express();
const PORT = 3000;

app.get('/health/server', async (req:Request,res:Response) => {
    res.json({message:"Server is running !"});
});

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
});