import express from 'express'
import  mongoose from 'mongoose'
import dotenv from 'dotenv'
import { error, log } from 'console';
dotenv.config();

mongoose
.connect(process.env.MOONGODB_URL)
.then(()=>{
    console.log('MongoDB is Connected succesfully');
})
.catch((error)=>{
    console.log(error);
});

const app = express();

app.listen(3000,()=>{
    console.log("Server running on port 3000!!");
})