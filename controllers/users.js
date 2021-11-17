import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/users.js";

export const signin = async (req, res) => {
  const userData = req.body;

  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (!existingUser) return res.status(400).json({ message: `User with email: ${userData.email} does not exist.` });
    const isPasswordCorrect = await bcrypt.compare(userData.password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid password" });
    const updatedUser = await User.findOneAndUpdate({ _id: existingUser._id }, { lastLogin: Date.now() }, { new: true });
    const token = jwt.sign({ id: existingUser._id, email: existingUser.email, roles: existingUser.roles }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({
      user: {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        roles: updatedUser.roles,
        createdAt: updatedUser.createdAt,
        lastLogin: updatedUser.lastLogin,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: `Something went wrong during login - ${error.message}` });
  }
};
export const signup = async (req, res) => {
  const userData = req.body;
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) return res.status(400).json({ message: `User with email ${userData.email} already exists` });
    if (userData.password !== userData.confirmPassword) return res.status(400).json({ message: "Passwords do not match!" });

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await User.create({ ...userData, password: hashedPassword, createdAt: Date.now(), lastLogin: Date.now() });
    const token = jwt.sign({ id: newUser._id, email: newUser.email, roles: newUser.roles }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(201).json({
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        roles: newUser.roles,
        createdAt: newUser.createdAt,
        lastLogin: newUser.lastLogin,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: `Something went wrong during signup! - ${error.message}` });
  }
};
