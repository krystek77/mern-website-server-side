import Post from "../models/posts.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  // if(!req.user.id) return res.status().json({message:"Unauthenticated"});

  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getPostById = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: "No post with that ID" });

  try {
    const post = await Post.findById(_id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;
  const { id } = req.user;

  if (!id) return res.status(401).json({ message: "Unauthenticated" });

  const newPost = new Post(post);
  // console.log("FROM backend", post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  const post = req.body;
  const user = req.user;
  const { id: _id } = req.params;

  if (!user.id) return res.status(401).json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: "No post with that ID" });

  try {
    const updatedPost = await Post.findByIdAndUpdate(_id, { ...post }, { new: true });
    // console.log(updatedPost);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: "No post with that ID" });
  try {
    await Post.findByIdAndRemove(_id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.satatus(404).json({ message: "No post with that ID" });
  try {
    const post = await Post.findById(_id);
    const likedPost = await Post.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true });
    res.status(200).json(likedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
