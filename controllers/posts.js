import Post from '../models/posts.js';
import mongoose from 'mongoose';
import User from '../models/users.js';

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query; //{searchQuery,tags}
  const title = new RegExp(searchQuery, 'i');

  try {
    const posts = await Post.find(
      {
        $or: [{ title }, { tags: { $in: tags.split(',') } }],
      },
      '-__v'
    ).populate({ path: 'author', select: 'firstName' });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}, '-__v').populate({
      path: 'author',
      select: 'firstName',
    });
    // console.log(posts);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const getPostById = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: 'No post with that ID' });

  try {
    const post = await Post.findById(_id, '-__v').populate({
      path: 'author',
      select: 'firstName',
    });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const createPost = async (req, res) => {
  const post = req.body;

  const { id } = req.user;

  if (!id) return res.status(401).json({ message: 'Unauthenticated' });

  const newPost = new Post(post);

  try {
    const currentUser = await User.findById(id);
    const resultPost = {
      ...post,
      _id: newPost._id,
      likes: [],
      author: { _id: currentUser._id, firstName: currentUser.firstName },
    };
    await newPost.save();

    return res.status(201).json(resultPost);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  const post = req.body;
  const user = req.user;
  const { id: _id } = req.params;

  if (!user.id) return res.status(401).json({ message: 'Unauthenticated' });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: 'No post with that ID' });

  try {
    const currentUser = await User.findById(user.id);
    const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
    const returnedUpdatedPost = {
      ...post,
      _id: updatedPost._id,
      author: { _id: currentUser._id, firstName: currentUser.firstName },
    };
    return res.status(200).json(returnedUpdatedPost);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).json({ message: 'No post with that ID' });
  try {
    await Post.findByIdAndRemove(_id);
    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  const { id: userID } = req.user;
  if (!userID) return res.status(401).json({ message: 'Unauthorization' });
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.satatus(404).json({ message: 'No post with that ID' });

  try {
    const post = await Post.findById(_id);
    if (post.author.toString() === userID)
      return res.status(400).json({ message: 'You can not like your posts!' });
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
