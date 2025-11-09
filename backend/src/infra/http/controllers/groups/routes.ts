import type { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";
import { createUserGroup } from "./create-user-group";
import { fetchUsersGroup } from "./fetch-user-groups";

export const usergroupRoutes = async (app: FastifyInstance) => {
  app.post("/", { onRequest: [verifyJwt] }, createUserGroup);
  app.get("/", fetchUsersGroup);
};
