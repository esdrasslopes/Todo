import type { FastifyInstance } from "fastify";
import { createTask } from "./create-task";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { fetchAllTasks } from "./fetch-all-tasks";
import { getTaskById } from "./get-task-by-id";
import { completeTask } from "./complete-task";
import { deleteTask } from "./delete-task";
import { fetchCompletedTasksByUser } from "./fetch-completed-tasks-by-user";

export const taskRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);
  app.post("/", createTask);
  app.get("/all", fetchAllTasks);
  app.get("/:taskId", getTaskById);
  app.patch("/:taskId", completeTask);
  app.delete("/:taskId", deleteTask);
  app.get("/user", fetchCompletedTasksByUser);
};
