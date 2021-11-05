import Message from '../models/messages.js';
import mongoose from 'mongoose';

export const getMessages = async (req,res)=>{ 
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
export const getMessageById = async (req,res)=>{
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json("No message with that id");

    try {
        const message = await Message.findById(_id);
        res.status(200).json(message);
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
export const createMessage = async (req,res) => {
    const message = req.body;
    const newMessage = new Message(message);
    try {
        await newMessage.save();
        res.status(201).json(newMessage);        
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}