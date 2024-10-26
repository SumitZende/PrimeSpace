import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async(req,res,next)=>{
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing)
    } catch (error) {
        next(error);
    }
}

export const deleteListing = async(req,res,next)=>{
    const listings = await Listing.findById(req.params.id);
    if(!listings){
        return next(errorHandler(404,"No Listing Found !!"))
    }
    if(req.user.id !== listings.userRef){
        return next(errorHandler(401,'Access denied !!'))
    }
    try {
        await Listing.findByIdAndDelete(req.params.id)  
        res.status(200).json('listing deleted successfully !! ')
      } catch (error) {
         next(error) 
      }
}