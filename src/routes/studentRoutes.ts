import express from "express";
import {
  viewMyTasks,
  viewTask,
  completeTask,
} from "../controllers/studentController";
import { isStudent } from "../middlewares/authMiddleware";

const studentRoutes = express.Router();

studentRoutes.route("/mytasks").get(isStudent, viewMyTasks);
studentRoutes.route("/task/:taskId").get(isStudent, viewTask);
studentRoutes.route("/completetask/:taskId").post(isStudent, completeTask);

export default studentRoutes;
