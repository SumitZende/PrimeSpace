import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
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

app.listen(3000,()=>{
    console.log("Server running on port 3000!!");
})