import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true, required: true, select: false },
  createdAt: { type: Date },
  roles:[{type:String,trim:true,required:true,default:'user'}]
});

const User = mongoose.model("User", userSchema);
export default User;
