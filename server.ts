import express, { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import router from './routes/index.js'
import cors from 'cors'
import connectDB from './db/config.js';


const app = express();
dotenv.config();



app.use(express.json());
app.use(cors({ origin: '*' }));

const PORT = process.env.PORT ;

connectDB();

app.use("/api",router)

app.get("/shakti",(req:Request,res:Response)=>{
    res.status(200).json({
        message:"yes everthing is well"
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)

})


