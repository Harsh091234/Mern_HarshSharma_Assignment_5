import type {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import { RefreshToken } from "../models/refreshToken.model.js";
import bcrypt from "bcryptjs";
import { generateAccessTokenAndSetCookie } from "../utils/generateTokenAndSetCookies.js";
import type { JwtPayload } from "jsonwebtoken";
import type { Types } from "mongoose";

interface TokenPayload extends JwtPayload {
  userId: Types.ObjectId;
}

export const protectRoutes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req?.cookies?.access_token;

    if (!accessToken) {
      return handleRefreshToken(req, res, next);
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as TokenPayload;

    const user = await User.findById(decoded?.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return handleRefreshToken(req, res, next);
  }
};

export const handleRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refresh_token;

  // 🔑 This is NOT an error condition
  if (!refreshToken) {
    return res.status(401).json({
      authenticated: false,
      message: "Not logged in",
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as TokenPayload;
    if(!decoded) return;

    const storedRefreshToken = await RefreshToken.findOne({
      user: decoded.userId,
    });

    if (!storedRefreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const isValid = await bcrypt.compare(
      refreshToken,
      storedRefreshToken.token
    );

    if (!isValid) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    generateAccessTokenAndSetCookie(decoded.userId, res);
const user = await User.findById(decoded.userId);
   if (!user) {
     return res.status(401).json({ message: "User not found" });
   }

   req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Refresh token expired or invalid",
    });
  }
};