import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
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

const Post = mongoose.model("Post",postSchema);
export default Post;