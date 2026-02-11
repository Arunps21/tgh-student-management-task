import express from "express";
import { adminLogin, studentLogin } from "../controllers/authController";

const authRoutes = express.Router();

authRoutes.route("/admin/login").post(adminLogin);
authRoutes.route("/student/login").post(studentLogin);

export default authRoutes;
