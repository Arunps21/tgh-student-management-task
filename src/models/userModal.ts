import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  department: string;
  role: "admin" | "student";
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    role: { type: String, enum: ["admin", "student"], default: "student" },
  },
  { timestamps: true },
);

const userModel = mongoose.model<IUser>("user", userSchema);

export default userModel;
