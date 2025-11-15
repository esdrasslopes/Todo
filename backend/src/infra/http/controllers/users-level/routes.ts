import type { FastifyInstance } from "fastify";
import { getUsersLevelById } from "./get-user-level-by-id";
import { verifyJwt } from "../../middlewares/verify-jwt";

export const userLevelRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);
  app.get("/", getUsersLevelById);
};
