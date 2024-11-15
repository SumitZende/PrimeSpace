import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import User from "../models/user.model.js"
import Listing from "../models/listing.model.js"

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

export const deleteUser=async(req,res,next)=>{
    if(req.user.id !== req.params.id) return(errorHandler(401,'Not Allowed to Access'))
        try {
            await User.findByIdAndDelete(req.params.id)
            res.clearCookie('access_token')
            res.status(200).json('user has been deleted')
        } catch (error) {
            next(error)
        }
}


export const getUserListing = async(req,res,next)=>{
    if(req.params.id == req.params.id){
        try {
            const listings = await Listing.find({userRef : req.params.id})
            res.status(200).json(listings);
        } catch (error) {
            next(error)
        }
    }else{
      return next(errorHandler(401,'Not allowd to access'))
    }
  }

export const getUser =  async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);

        if(!user) return next(errorHandler(404,"User Not Found"));

        const {password:pass, ...rest }=user._doc;

        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}
