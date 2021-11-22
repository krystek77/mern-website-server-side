import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  // creator: { type: String,trim:true, default: "some author" },
  author:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  title: { type: String,trim:true, default: "some title" },
  contents: { type: String, default: "some contents" },
  selectedImage: String,
  tags: [{type:String,trim:true,default:"some tag"}],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
