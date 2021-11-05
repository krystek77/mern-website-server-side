import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    creator:String,
    title:String,
    contents:String,
    selectedImage:String,
    tags:[String],
    createdAt:{
        type:Date,
        default:new Date()
    },
    likeCount:{
        type:Number,
        default:0
    }
});

const Message = mongoose.model("Message",messageSchema);
export default Message;