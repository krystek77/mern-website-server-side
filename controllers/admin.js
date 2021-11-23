import User from "../models/users.js";
import bcrypt from "bcryptjs";

const Roles = {
  ADMIN: "admin",
  USER: "user",
};

export const getAllUsers = async (req, res) => {
  const { role, id } = req.user;
  if (role !== Roles.ADMIN) return res.status(401).json({ message: "Unauthorization" });

  try {
    const data = await User.find({ _id: { $ne: id } }, "-__v");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const createAccount = async (req, res) => {
  const userData = req.body;

  const { role } = req.user;
  if (role !== Roles.ADMIN) return res.status(401).json({ message: "Unauthorization" });

  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) return res.status(400).json({ message: `User with email: ${userData.email} already exists!` });
    if (userData.password !== userData.confirmPassword) return res.status(400).json({ message: "Passwords do not match!" });

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({ ...userData, password: hashedPassword, createdAt: Date.now() });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
