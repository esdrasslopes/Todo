import type { FastifyInstance } from "fastify";
import { createUser } from "./create-user";
import { authenticate } from "./authenticate-user";
import { fetchUsersSummary } from "./fetch-users-summary";
import { verifyJwt } from "../../middlewares/verify-jwt";

export const userRoutes = async (app: FastifyInstance) => {
  app.post("/", createUser);
  app.post("/auth", authenticate);
  app.get("/summury", { onRequest: [verifyJwt] }, fetchUsersSummary);
};
