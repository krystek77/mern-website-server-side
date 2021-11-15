import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();

app.use(express.json({extended:true,limit:"30mb"}));
app.use(express.urlencoded({ extended: true,limit:"30mb" }));
app.use(cors());

app.use('/posts',postRoutes);
app.use('/users',userRoutes);

const PORT = process.env.PORT || 4000;
const CONNECTION_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@pralma.xhska.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(CONNECTION_URL).then(()=>app.listen(PORT,()=>console.log(`Server running on PORT: ${PORT}. Successful connection to the database`))).catch((error)=>console.log(error));


