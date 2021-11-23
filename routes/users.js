import express from "express";
import { signin, signup, getAllPostsUser } from "../controllers/users.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/posts", auth, getAllPostsUser);
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
