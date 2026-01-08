import { type Response, type Request } from "express";
import User from "../models/user.model.js";
import { generateAccessTokenAndSetCookie, generateRefreshTokenAndSetCookie } from "../utils/generateTokenAndSetCookies.js";
import { RefreshToken } from "../models/refreshToken.model.js";
import bcrypt from "bcryptjs";
import { Types } from "mongoose";

export const createUser = async(req: Request, res: Response) => {
     try {
      
       const { username, email, password, phone, deviceId}  = req.body;

       const userAlreadyExists = await User.findOne({ email });
       if (userAlreadyExists) {
         return res
           .status(400)
           .json({ success: false, message: "user already exists" });
       }

       const user = new User({
         email,
         password,
         username,
         phone,
       });

       await user.save();

       const refreshToken = generateRefreshTokenAndSetCookie(user._id, res);

       const refSessionToken = await RefreshToken.create({
         user: user._id,
         token: refreshToken,

         device: {
           deviceId: deviceId || "unknown",
           userAgent: req.headers["user-agent"] || "unknown",
         },
       });

       const accessToken = generateAccessTokenAndSetCookie(user._id, res);

       res.status(201).json({
         success: true,
         user,
         message: "User creating successfully"
           
         
       });
     } catch (error: any) {
        console.log("Error creating user:", error.message)
       return res.status(400).json({ success: false, message: "Server error" });
     }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password, deviceId } = req.body;
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" });
    }
 console.log("hi", email, password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
   
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials" });
    }

    const refreshToken = generateRefreshTokenAndSetCookie(user._id, res);

    const refSessionToken = await RefreshToken.create({
      user: user._id,
      token: refreshToken,

      device: {
        deviceId: deviceId || "unknown",
        userAgent: req.headers["user-agent"] || "unknown",
      },
    });

    const accessToken = generateAccessTokenAndSetCookie(user._id, res);


    res.status(201).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined
      },
      message: "User logined successfully",
    });
  } catch (error: any) {
    console.log("Error logining user:", error.message);
    return res.status(400).json({ success: false, message: "Server error" });
  }
};

export const getAuthUser = async (req: Request, res: Response) => {
      try {
        if (!req.user) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(req.user._id );
        if (!user) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
        }

        res.status(200).json({ success: true, user });
      } catch (error) {
        console.log("Error checking auth", error);
        res.status(500).json({ success: false, message: "Server Error" });
      }
};