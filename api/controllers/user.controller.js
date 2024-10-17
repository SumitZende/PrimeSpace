import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import User from "../models/user.model.js"

export const msg = (req,res)=>{
    res.json({
        message:"Api routes connected succesfully"
    })
}


export const updateUser=async(req,res,next)=>{
    if(req.user.id !== req.params.id) return(errorHandler(401,'Not Allowed to Access'))
    try {
        if(req.body.password){
            req.body.password=bcryptjs.hashSync(req.body.password,10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:{
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar,
            }
        },{new:true})
        const {password, ...rest}=updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }

}