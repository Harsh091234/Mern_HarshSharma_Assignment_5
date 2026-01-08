import jwt from "jsonwebtoken";
import { type Response } from "express";
import { Types } from "mongoose";


export const generateAccessTokenAndSetCookie = (userId: Types.ObjectId, res: Response) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "5m",
  });

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 5 * 60 * 1000, // 5 min
  });

  return accessToken;
};

export const generateRefreshTokenAndSetCookie = (
  userId: Types.ObjectId,
  res: Response
) => {
  const refreshToken = jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: "15m",
    }
  );

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 15 * 60 * 1000, // 15 min
  });

  return refreshToken;
};
