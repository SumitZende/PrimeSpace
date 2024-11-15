import express from 'express';
import { verifyToken } from '../utils/updateUser.js';
import { createListing, deleteListing, getListing, searchListings, updateListing } from '../controllers/listing.controller.js';

const router=express.Router();

router.post('/create',verifyToken,createListing);
router.delete('/delete/:id',verifyToken,deleteListing)
router.post('/update/:id',verifyToken,updateListing)
router.get('/getListings/:id',getListing);
router.get('/get',searchListings)
export default router;