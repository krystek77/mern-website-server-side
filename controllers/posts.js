import Post from "../models/posts.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}, "-__v").populate({ path: "author", select: "firstName" });
    // console.log(posts);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(404).json({ message: error.message });
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
  console.log(post);
  const { id } = req.user;

  if (!id) return res.status(401).json({ message: "Unauthenticated" });

  const newPost = new Post({ ...post, author: id });

  try {
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  const post = req.body;
  const user = req.user;
  const { id: _id } = req.params;

  if (!user.id) return res.status(401).json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: "No post with that ID" });

  try {
    const updatedPost = await Post.findByIdAndUpdate(_id, { ...post, author: user.id }, { new: true });
    // console.log(updatedPost);
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({ message: "No post with that ID" });
  try {
    await Post.findByIdAndRemove(_id);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  const { id: userID } = req.user;
  if (!userID) return res.status(401).json({ message: "Unauthorization" });
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.satatus(404).json({ message: "No post with that ID" });

  try {
    const post = await Post.findById(_id);
    if (post.author.toString() === userID) return res.status(400).json({ message: "You can not like your posts!" });
    const index = post.likes.findIndex((id) => id.toString() === userID);
    if (index == -1) {
      //like
      post.likes.push(mongoose.Types.ObjectId(userID));
    } else {
      //dislike
      post.likes = post.likes.filter((id) => id.toString() !== userID);
    }
    const likedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
    // console.log(likedPost);
    return res.status(201).json(likedPost);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
