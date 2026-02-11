import { Response } from "express";
import taskModel, { ITask } from "../models/taskModal";
import { AuthRequest } from "../middlewares/authMiddleware";

interface TaskSummary {
  pending: number;
  overdue: number;
  completed: number;
}

// Retrieve tasks assigned to the logged-in student
const viewMyTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId: string = req.userId as string;
    await taskModel.updateMany(
      { assignedTo: userId, status: "pending", dueDate: { $lt: new Date() } },
      { $set: { status: "overdue" } },
    );
    let tasks: ITask[] = await taskModel
      .find({ assignedTo: userId })
      .populate("assignedBy", "name email");
    if (tasks.length > 0) {
      let summary: TaskSummary = {
        pending: tasks.filter((t: ITask) => t.status === "pending").length,
        overdue: tasks.filter((t: ITask) => t.status === "overdue").length,
        completed: tasks.filter((t: ITask) => t.status === "completed").length,
      };
      res.status(200).json({ success: true, summary, tasks });
    } else {
      res.status(200).json({ success: false, msg: "No tasks found" });
    }
  } catch (err: unknown) {
    const error = err as Error;
    console.log(error.message);
    res.status(200).json({ success: false, msg: "Failed to fetch tasks" });
  }
};

// Retrieve details of a specific task
const viewTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { taskId }: { taskId: string } = req.params as { taskId: string };
    const userId: string = req.userId as string;
    let task: ITask | null = await taskModel
      .findOne({ _id: taskId, assignedTo: userId })
      .populate("assignedBy", "name email");
    if (!task) {
      res.status(200).json({ success: false, msg: "Task not found" });
      return;
    }
    if (task.status === "pending" && new Date(task.dueDate) < new Date()) {
      task.status = "overdue";
      await task.save();
    }
    res.status(200).json({ success: true, task });
  } catch (err: unknown) {
    const error = err as Error;
    console.log(error.message);
    res.status(200).json({ success: false, msg: "Failed to fetch task" });
  }
};

// Mark a specific task as completed
const completeTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { taskId }: { taskId: string } = req.params as { taskId: string };
    const userId: string = req.userId as string;
    let task: ITask | null = await taskModel.findOne({
      _id: taskId,
      assignedTo: userId,
    });
    if (!task) {
      res.status(200).json({ success: false, msg: "Task not found" });
      return;
    }
    if (task.status === "completed") {
      res
        .status(200)
        .json({ success: false, msg: "Task is already completed" });
      return;
    }
    task.status = "completed";
    await task.save();
    res
      .status(200)
      .json({ success: true, msg: "Task marked as completed", task });
  } catch (err: unknown) {
    const error = err as Error;
    console.log(error.message);
    res.status(200).json({ success: false, msg: "Failed to update task" });
  }
};

export { viewMyTasks, viewTask, completeTask };
