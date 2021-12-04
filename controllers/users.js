import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User from "../models/users.js";

export const refreshToken = (req, res) => {
  const refresh_token = req.body.token;

  if(!refresh_token) return res.status(401),json({message:"Unauthorization"});

  //TODO:  Check if refreshToken exists i DB

  jwt.verify(refresh_token,process.env.JWT_REFRESH_TOKEN_SECRET,(error,decodedData)=>{
    if(error){
      return res.status(403).json({message:error.message});
    }
    else {
      const access_token = jwt.sign({
        id: decodedData?.id,
        email: decodedData?.email,
        role: decodedData?.role,
      },process.env.JWT_ACCESS_TOKEN_SECRET,{expiresIn:20});
      return res.status(201).json({access_token})
    }
  })
};

export const getAllPostsUser = async (req, res) => {
  const { id } = req.user;
  if (!id) return res.status(401).json({ message: "Unauthorization" });
  try {
    const data = await User.findById(id).populate("posts");
    //data = {_id:,firstname,...,posts:[{},{},{}]}
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  const userData = req.body;

  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (!existingUser) return res.status(400).json({ message: `User with email: ${userData.email} does not exist.` });

    const isPasswordCorrect = await bcrypt.compare(userData.password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid password" });

    const updatedUser = await User.findOneAndUpdate({ _id: existingUser._id }, { lastLogin: Date.now() }, { new: true }).select("-password -__v");

    const access_token = jwt.sign({ id: existingUser._id, email: existingUser.email, role: existingUser.role }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: 20 });
    const refresh_token = jwt.sign({ id: existingUser._id, email: existingUser.email, role: existingUser.role }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: 600 });

    return res.status(200).json({ user: updatedUser, tokens: { access_token, refresh_token } });
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

    const access_token = jwt.sign({ id: existingUser._id, email: existingUser.email, role: existingUser.role }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: 20 });
    const refresh_token = jwt.sign({ id: existingUser._id, email: existingUser.email, role: existingUser.role }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: 600 });

    return res.status(201).json({
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        selectedImage: newUser.selectedImage,
        email: newUser.email,
        createdAt: newUser.createdAt,
        lastLogin: newUser.lastLogin,
      },
      tokens: { access_token, refresh_token },
    });
  } catch (error) {
    return res.status(500).json({ message: `Something went wrong during signup! - ${error.message}` });
  }
};
