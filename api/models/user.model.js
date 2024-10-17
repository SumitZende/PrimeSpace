import mongoose, { Mongoose } from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    avatar:{
        type:String,
        default: process.env.DEFAULT_IMAGE,
       
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;