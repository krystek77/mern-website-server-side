import dotenv from 'dotenv'
dotenv.config();

import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user={
          id:decodedData?.id,
          email:decodedData?.email,
          role:decodedData?.role,
          //iat,exp
      }
      next();
    }
  } catch (error) {
      res.status(409).json({message:error.message})
  }
};

export default auth;