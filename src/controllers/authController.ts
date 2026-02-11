import { Request, Response } from "express";
import userModel, { IUser } from "../models/userModal";
import bcrypt from "bcryptjs";
import { tokenCreation } from "../utils/generateToken";

const salt: number = 10;

// Handle Admin login and generate JWT token
const adminLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    let admin: IUser | null = await userModel.findOne({ email, role: "admin" });
    if (!admin) {
      res.status(200).json({ success: false, msg: "Invalid credentials" });
      return;
    }
    let result: boolean = await bcrypt.compare(password, admin.password);
    if (!result) {
      res.status(200).json({ success: false, msg: "Invalid credentials" });
      return;
    }
    const token: string = tokenCreation(String(admin._id));
    res.status(200).json({ success: true, msg: "Login success", token });
  } catch (err: unknown) {
    const error = err as Error;
    console.log(error.message);
    res.status(200).json({ success: false, msg: "Failed to login" });
  }
};

// Handle Student login and generate JWT token
const studentLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    let student: IUser | null = await userModel.findOne({
      email,
      role: "student",
    });
    if (!student) {
      res.status(200).json({ success: false, msg: "Invalid credentials" });
      return;
    }
    let result: boolean = await bcrypt.compare(password, student.password);
    if (!result) {
      res.status(200).json({ success: false, msg: "Invalid credentials" });
      return;
    }
    const token: string = tokenCreation(String(student._id));
    res.status(200).json({ success: true, msg: "Login success", token });
  } catch (err: unknown) {
    const error = err as Error;
    console.log(error.message);
    res.status(200).json({ success: false, msg: "Failed to login" });
  }
};

export { adminLogin, studentLogin };
