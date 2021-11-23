import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  // creator: { type: String,trim:true, default: "some author" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, trim: true, default: "some title" },
  contents: { type: String, default: "some contents" },
  selectedImage: String,
  tags: [{ type: String, trim: true, default: "some tag" }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes:{
    type:[mongoose.Schema.Types.ObjectId],
    ref:'User',
    default:[]
  }
});

const Post = mongoose.model("Post", postSchema);
export default Post;
