import express from 'express';
import { msg, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/updateUser.js';

const router = express.Router();

router.get('/test',msg)
router.post('/update/:id',verifyToken,updateUser)

export default router;