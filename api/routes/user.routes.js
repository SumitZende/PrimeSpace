import express from 'express';
import { msg } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test',msg)

export default router;