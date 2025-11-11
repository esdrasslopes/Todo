import type { FastifyReply, FastifyRequest } from "fastify";
import { makeEditTask } from "../../factories/make-edit-task";
import { editTaskBodySchema, editTaskParamsSchema } from "@/infra/types";
import { UnauthorizedError } from "@/domain/application/errors/unauthorized-error";
import { ResourceNotFoundError } from "@/domain/application/errors/resource-not-found-error";

export const editTask = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { description, priority, status, title } = editTaskBodySchema.parse(
    request.body
  );

  const { taskId } = editTaskParamsSchema.parse(request.params);

  try {
    const editTaskUseCase = makeEditTask();

    const requesterId = request.user.sub;

    const result = await editTaskUseCase.execute({
      description,
      priority,
      status,
      title,
      requesterId,
      taskId,
    });

    if (result.isRight()) {
      return reply.status(201).send({
        message: "Task successfully edited",
      });
    } else if (result.value instanceof UnauthorizedError) {
      return reply.status(401).send({ message: result.value.message });
    } else if (result.value instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: result.value.message });
    }
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return reply.status(401).send({
        message: error.message,
      });
    }

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      });
    }

    throw error;
  }
};
