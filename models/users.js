import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, required:true },
  lastName: { type: String, trim: true, required:true },
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true, required: true },
  createdAt: { type: Date, default:null },
  roles: {
    type: [String],
    required: true,
    trim: true,
    enum: ["admin", "user"],
    default: "user",
  },
  lastLogin: { type: Date, default:null },
});

const User = mongoose.model("User", userSchema);
export default User;
