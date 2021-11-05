import express from 'express';
import {getMessages,getMessageById,createMessage} from '../controllers/messages.js';

const router = express.Router();


router.get("/",getMessages);
router.get("/:id",getMessageById);
router.post("/",createMessage);

export default router;
