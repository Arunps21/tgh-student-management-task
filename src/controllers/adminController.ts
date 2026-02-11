import { Response } from "express";
import userModel, { IUser } from "../models/userModal";
import taskModel, { ITask } from "../models/taskModal";
import bcrypt from "bcryptjs";
import validator from "validator";
import { AuthRequest } from "../middlewares/authMiddleware";

const salt: number = 10;

// Add Student
const addStudent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      name,
      email,
      password,
      department,
    }: { name: string; email: string; password: string; department: string } =
      req.body;
    let user: IUser | null = await userModel.findOne({ email });
    if (user) {
      res.status(200).json({ success: false, msg: "Student already exists" });
      return;
    }
    if (!validator.isEmail(email)) {
      res
        .status(200)
        .json({ success: false, msg: "Please enter a valid email" });
      return;
    }
    if (password.length < 6) {
      res
        .status(200)
        .json({ success: false, msg: "Please enter a strong password" });
      return;
    }
    const hash: string = await bcrypt.hash(password, salt);
    let student: IUser = await userModel.create({
      name,
      email,
      password: hash,
      department,
      role: "student",
    });
    res
      .status(200)
      .json({
        success: true,
        msg: "Student added successfully",
        student: {
          _id: student._id,
          name: student.name,
          email: student.email,
          department: student.department,
        },
      });
  } catch (err: unknown) {
    const error = err as Error;
    console.log(error.message);
    res.status(200).json({ success: false, msg: "Failed to add student" });
  }
};

// View All Students
const viewAllStudents = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    let students: IUser[] = await userModel
      .find({ role: "student" })
      .select("-password");
    if (students.length > 0) {
      res.status(200).json({ success: true, students });
    } else {
      res.status(200).json({ success: false, msg: "No students found" });
    }
  } catch (err: unknown) {
    const error = err as Error;
    console.log(error.message);
    res.status(200).json({ success: false, msg: "Failed to fetch students" });
  }
};

// View Single Student
const viewStudent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id }: { id: string } = req.params as { id: string };
    let student: IUser | null = await userModel
      .findOne({ _id: id, role: "student" })
      .select("-password");
    if (student) {
      res.status(200).json({ success: true, student });
    } else {
      res.status(200).json({ success: false, msg: "Student not found" });
    }
  } catch (err: unknown) {
    const error = err as Error;
    console.log(error.message);
    res.status(200).json({ success: false, msg: "Failed to fetch student" });
  }
};

// Delete Student
const deleteStudent = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { id }: { id: string } = req.params as { id: string };
    let student: IUser | null = await userModel.findOneAndDelete({
      _id: id,
      role: "student",
    });
    if (student) {
      await taskModel.deleteMany({ assignedTo: id });
      res
        .status(200)
        .json({ success: true, msg: "Student deleted successfully" });
    } else {
      res.status(200).json({ success: false, msg: "Student not found" });
    }
  } catch (err: unknown) {
    const error = err as Error;
    console.log(error.message);
    res.status(200).json({ success: false, msg: "Failed to delete student" });
  }
};

// Assign Task to Student
const assignTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      assignedTo,
      dueDate,
    }: {
      title: string;
      description: string;
      assignedTo: string;
      dueDate: string;
    } = req.body;
    let student: IUser | null = await userModel.findOne({
      _id: assignedTo,
      role: "student",
    });
    if (!student) {
      res.status(200).json({ success: false, msg: "Student not found" });
      return;
    }
    const adminId: string = req.userId as string;
    let task: ITask = await taskModel.create({
      title,
      description,
      assignedTo,
      assignedBy: adminId,
      dueDate: new Date(dueDate),
      status: "pending",
    });
    res
      .status(200)
      .json({ success: true, msg: "Task assigned successfully", task });
  } catch (err: unknown) {
    const error = err as Error;
    console.log(error.message);
    res.status(200).json({ success: false, msg: "Failed to assign task" });
  }
};

// View All Tasks (Admin)
const viewAllTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await taskModel.updateMany(
      { status: "pending", dueDate: { $lt: new Date() } },
      { $set: { status: "overdue" } },
    );
    let tasks: ITask[] = await taskModel
      .find()
      .populate("assignedTo", "name email department")
      .populate("assignedBy", "name email");
    if (tasks.length > 0) {
      res.status(200).json({ success: true, tasks });
    } else {
      res.status(200).json({ success: false, msg: "No tasks found" });
    }
  } catch (err: unknown) {
    const error = err as Error;
    console.log(error.message);
    res.status(200).json({ success: false, msg: "Failed to fetch tasks" });
  }
};

// View Tasks by Student (Admin)
const viewTasksByStudent = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { studentId }: { studentId: string } = req.params as {
      studentId: string;
    };
    let student: IUser | null = await userModel.findOne({
      _id: studentId,
      role: "student",
    });
    if (!student) {
      res.status(200).json({ success: false, msg: "Student not found" });
      return;
    }
    await taskModel.updateMany(
      {
        assignedTo: studentId,
        status: "pending",
        dueDate: { $lt: new Date() },
      },
      { $set: { status: "overdue" } },
    );
    let tasks: ITask[] = await taskModel
      .find({ assignedTo: studentId })
      .populate("assignedTo", "name email department")
      .populate("assignedBy", "name email");
    if (tasks.length > 0) {
      res.status(200).json({ success: true, tasks });
    } else {
      res
        .status(200)
        .json({ success: false, msg: "No tasks found for this student" });
    }
  } catch (err: unknown) {
    const error = err as Error;
    console.log(error.message);
    res.status(200).json({ success: false, msg: "Failed to fetch tasks" });
  }
};

export {
  addStudent,
  viewAllStudents,
  viewStudent,
  deleteStudent,
  assignTask,
  viewAllTasks,
  viewTasksByStudent,
};
