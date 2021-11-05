import express from 'express';
import {getMessages,getMessageById} from '../controllers/messages.js';

const router = express.Router();


router.get("/",getMessages);
router.get("/:id",getMessageById);

export default router;
