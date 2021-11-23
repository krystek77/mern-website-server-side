import express from "express";
import { createAccount, getAllUsers } from "../controllers/admin.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.get("/users", auth, getAllUsers);
router.post("/createAccount", auth, createAccount);

export default router;
