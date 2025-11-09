import type { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateTask } from "../../factories/make-task";
import { createTaskBodySchema } from "@/infra/types";
import { UnauthorizedError } from "@/domain/application/errors/unauthorized-error";

export const createTask = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { description, directedTo, priority, status, title } =
    createTaskBodySchema.parse(request.body);

  try {
    const createTaskUseCase = makeCreateTask();

    const requesterId = request.user.sub;

    const result = await createTaskUseCase.execute({
      description,
      directedTo,
      priority,
      status,
      title,
      requesterId,
    });

    if (result.isRight()) {
      return reply.status(201).send({
        message: "Task successfully created",
      });
    } else if (result.value instanceof UnauthorizedError) {
      throw new UnauthorizedError();
    }
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return reply.status(401).send({
        message: error.message,
      });
    }

    throw error;
  }
};
