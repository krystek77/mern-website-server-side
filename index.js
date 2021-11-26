import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";

const app = express();

app.use(express.json({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors({origin:true}));

app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 4000;
const CONNECTION_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@pralma.xhska.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}. Successful connection to the database`)))
  .catch((error) => console.log(error));
