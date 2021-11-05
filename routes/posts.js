import express from 'express';
import {getPosts,getPostById,createPost,updatePost,deletePost} from '../controllers/posts.js';

const router = express.Router();


router.get("/",getPosts);
router.get("/:id",getPostById);
router.post("/",createPost);
router.patch("/:id",updatePost);
router.delete("/:id",deletePost);

export default router;
