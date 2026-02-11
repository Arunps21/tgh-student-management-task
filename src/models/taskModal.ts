import mongoose, { Document, Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  assignedTo: Types.ObjectId;
  assignedBy: Types.ObjectId;
  dueDate: Date;
  status: "pending" | "overdue" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "overdue", "completed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const taskModel = mongoose.model<ITask>("task", taskSchema);

export default taskModel;
