import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import userModel from "../models/userModal";

const salt: number = 10;

// Seed the database with a default admin user if none exists
const seedAdmin = async (): Promise<void> => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("Connected to MongoDB");

    let admin = await userModel.findOne({ role: "admin" });
    if (admin) {
      console.log("Admin already exists");
      console.log(`Email: ${admin.email}`);
      await mongoose.disconnect();
      return;
    }

    const hash: string = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || "Admin@123",
      salt,
    );
    await userModel.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL || "admin@gmail.com",
      password: hash,
      department: "Administration",
      role: "admin",
    });

    console.log("Admin created successfully");
    console.log(`Email: ${process.env.ADMIN_EMAIL}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD}`);
    await mongoose.disconnect();
  } catch (err: unknown) {
    const error = err as Error;
    console.log(error.message);
  }
};

seedAdmin();
