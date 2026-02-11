import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModal";

export interface AuthRequest extends Request {
  userId?: string;
}

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}

const isAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { token } = req.headers as { token: string };
    if (!token) {
      res.status(200).json({ success: false, msg: "You need to login first" });
      return;
    }
    const decode: DecodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as DecodedToken;
    let admin = await userModel.findOne({ _id: decode.userId, role: "admin" });
    if (!admin) {
      res.status(200).json({ success: false, msg: "You need to login first" });
      return;
    }
    req.userId = decode.userId;
    next();
  } catch (err: unknown) {
    const error = err as Error;
    console.log(error.message);
    res.status(200).json({ success: false, msg: "Invalid token" });
  }
};

const isStudent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { token } = req.headers as { token: string };
    if (!token) {
      res.status(200).json({ success: false, msg: "You need to login first" });
      return;
    }
    const decode: DecodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as DecodedToken;
    let student = await userModel.findOne({
      _id: decode.userId,
      role: "student",
    });
    if (!student) {
      res.status(200).json({ success: false, msg: "You need to login first" });
      return;
    }
    req.userId = decode.userId;
    next();
  } catch (err: unknown) {
    const error = err as Error & { name: string };
    if (error.name === "TokenExpiredError") {
      res
        .status(200)
        .json({ success: false, msg: "Session expired. Please log in again." });
      return;
    }
    console.log(error.message);
    res.status(200).json({ success: false, msg: "Invalid token" });
  }
};

export { isAdmin, isStudent };
