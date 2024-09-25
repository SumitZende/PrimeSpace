import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const signin = 
    async (req,res,next)=>{
        const {name,email,password}=req.body;
        const hashedPassword = bcryptjs.hashSync(password,12)
        const newUser = new User({name,email,password:hashedPassword});
    try{
        await newUser.save()
        res.status(201).json('User created!')
    }
    catch(error){
        next(error);
    }
}