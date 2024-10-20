import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import listingRouter from './routes/listing.routes.js'
import cookieParser from 'cookie-parser'
dotenv.config()

mongoose
.connect(process.env.MOONGODB_URL)
.then(()=>{
    console.log("MongoDB connected successfully")
})
.catch((err)=>{
    console.log(err);
})
const app = express();
app.use(express.json())

app.listen(3000,()=>{
    console.log("Server running on port 3000!!");
})

app.use(cookieParser());
app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use('/api/listing',listingRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message  = err.message ||'Internal Server Error';
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message,
    })
})