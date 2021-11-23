import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true, required: true },
  createdAt: { type: Date, default: null },
  selectedImage: { type: String, default: "" },
  role: {
    type: String,
    required: true,
    trim: true,
    default: "user",
  },
  lastLogin: { type: Date, default: null },
});

userSchema.set('toJSON',{virtuals:true});
userSchema.virtual("posts", { ref: "Post", localField: "_id", foreignField: "author", justOne: false });

const User = mongoose.model("User", userSchema);
export default User;
