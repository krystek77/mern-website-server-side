import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  email: { type: String, trim: true, required: true, unique: true },
  password: { type: String, trim: true, required: true },
  createdAt: { type: Date },
  roles: {
    type: [String],
    required: true,
    trim: true,
    enum: ["admin", "user"],
    default: "user",
  },
  lastLogin: { type: Date },
});

const User = mongoose.model("User", userSchema);
export default User;
