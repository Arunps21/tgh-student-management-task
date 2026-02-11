import express from "express";
import {
  addStudent,
  viewAllStudents,
  viewStudent,
  deleteStudent,
  assignTask,
  viewAllTasks,
  viewTasksByStudent,
} from "../controllers/adminController";
import { isAdmin } from "../middlewares/authMiddleware";

const adminRoutes = express.Router();

adminRoutes.route("/addstudent").post(isAdmin, addStudent);
adminRoutes.route("/viewstudents").get(isAdmin, viewAllStudents);
adminRoutes.route("/viewstudent/:id").get(isAdmin, viewStudent);
adminRoutes.route("/deletestudent/:id").post(isAdmin, deleteStudent);
adminRoutes.route("/assigntask").post(isAdmin, assignTask);
adminRoutes.route("/viewtasks").get(isAdmin, viewAllTasks);
adminRoutes.route("/studenttasks/:studentId").get(isAdmin, viewTasksByStudent);

export default adminRoutes;
