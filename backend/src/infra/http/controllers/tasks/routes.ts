import type { FastifyInstance } from "fastify";
import { createTask } from "./create-task";
import { verifyJwt } from "../../middlewares/verify-jwt";

export const taskRoutes = async (app: FastifyInstance) => {
  app.post("/", { onRequest: [verifyJwt] }, createTask);
};
