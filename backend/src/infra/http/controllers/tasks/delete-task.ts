import type { FastifyReply, FastifyRequest } from "fastify";
import { deleteTaskParamsSchema } from "@/infra/types";
import { makeDeleteTask } from "../../factories/make-delete-task";
import { UnauthorizedError } from "@/domain/application/errors/unauthorized-error";
import { ResourceNotFoundError } from "@/domain/application/errors/resource-not-found-error";

export const deleteTask = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { taskId } = deleteTaskParamsSchema.parse(request.params);

  try {
    const deleteTaskUseCase = makeDeleteTask();

    const requesterId = request.user.sub;

    const result = await deleteTaskUseCase.execute({
      taskId,
      requesterId,
    });

    if (result.isRight()) {
      return reply.status(200).send({
        message: "Task successfully deleted",
      });
    } else if (result.value instanceof UnauthorizedError) {
      throw new UnauthorizedError();
    } else if (result.value instanceof ResourceNotFoundError) {
      throw new ResourceNotFoundError();
    }
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return reply.status(401).send({
        message: error.message,
      });
    }
  }
};
