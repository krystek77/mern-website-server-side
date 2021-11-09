import express from 'express';
import {getPosts,getPostById,createPost,updatePost,deletePost,likePost} from '../controllers/posts.js';

const router = express.Router();


router.get("/",getPosts);
router.get("/:id",getPostById);
router.post("/",createPost);
router.patch("/:id",updatePost);
router.delete("/:id",deletePost);
router.patch("/:id/likePost",likePost);

export default router;
