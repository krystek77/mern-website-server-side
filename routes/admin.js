import express from "express";
import { createAccount } from "../controllers/admin.js";
const router = express.Router();

router.post("/createAccount", createAccount);

export default router;
