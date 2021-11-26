import express from "express";
import { signin, signup, getAllPostsUser,refreshToken } from "../controllers/users.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/posts", auth, getAllPostsUser);
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/refreshToken",refreshToken);

export default router;
