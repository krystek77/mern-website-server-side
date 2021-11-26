import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log("AuthHEADER",authHeader)
  try {
    //check if authorization header exists and then get access token;

    const access_token = authHeader && authHeader.split(" ")[1];

    if (access_token) {
      jwt.verify(access_token, process.env.JWT_ACCESS_TOKEN_SECRET, (error, decodedData) => {
        if (error) {
          //invalid access token or expired time elapsed
          return res.status(403).json({ message: error.message });
        }
        //token verified successfully
        req.user = {
          id: decodedData?.id,
          email: decodedData?.email,
          role: decodedData?.role,
        };
        next();
      });
    } else {
      // no access token
      return res.status(401).json({message:'Unauthorization'});
    }
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

export default auth;
