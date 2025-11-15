import fastify from "fastify";
import { userRoutes } from "./infra/http/controllers/user/routes";
import { env } from "./infra/env/env";
import fastifyJwt from "@fastify/jwt";
import cookies from "@fastify/cookie";
import { hash } from "bcryptjs";
import { ZodError } from "zod";
import { usergroupRoutes } from "./infra/http/controllers/groups/routes";
import { taskRoutes } from "./infra/http/controllers/tasks/routes";
import { mongoConnection } from "./infra/database/mongo/mongo-connection";
import cors from "@fastify/cors";
import { userLevelRoutes } from "./infra/http/controllers/users-level/routes";

mongoConnection();

export const app = fastify();

app.register(cors, {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
});

app.register(cookies);

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
});

app.register(userRoutes, {
  prefix: "/user",
});

app.register(usergroupRoutes, {
  prefix: "/user-group",
});

app.register(taskRoutes, {
  prefix: "/task",
});

app.register(userLevelRoutes, {
  prefix: "/users-level",
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation Error",
      issues: error.format(),
    });
  }

  console.log(error);

  return reply.status(500).send({
    message: "Internal Server Error",
  });
});
