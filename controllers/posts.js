import Post from '../models/posts.js';
import mongoose from 'mongoose';

export const getPosts = async (req,res)=>{ 
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
export const getPostById = async (req,res)=>{
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json("No post with that id");

    try {
        const post = await Post.findById(_id);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
export const createPost = async (req,res) => {
    const post = req.body;
    const newPost = new Post(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);        
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}
export const updatePost = async (req,res)=>{
    const post = req.body;
    const {id:_id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json("No post with that id");

    try {
        const updatedPost = await Post.findOneAndUpdate({_id},{...post,_id},{new:true});
        res.status(200).json(updatedPost);
        
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}

export const deletePost = async (req,res)=>{
    const {id:_id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json("No post with that id");
    try {
        await Post.findOneAndDelete({_id});
        res.status(200).json("Post deleted sucessfully!");
    } catch (error) {
        res.status(409).json({message:error.message});
    }


}