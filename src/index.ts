import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

import "./config/mongoConnection";
import authRoutes from "./routes/authRoutes";
import adminRoutes from "./routes/adminRoutes";
import studentRoutes from "./routes/studentRoutes";

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Student Management System");
});

app.listen(port, () => {
  console.log(`Server run at http://localhost:${port}`);
});

export default app;
