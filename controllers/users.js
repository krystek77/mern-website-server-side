import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/users.js';

export const signin = (req,res) =>{
    const userData = req.body;
    console.log(userData);
    res.status(200).json("Signin user");
}
export const signup = (req,res)=>{
    const userData = req.body;
    console.log(userData);
    res.status(201).json("Signup user")
}
