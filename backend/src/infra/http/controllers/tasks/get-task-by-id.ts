import type { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/domain/application/errors/resource-not-found-error";
import { getTaskByIdParamsSchema } from "@/infra/types";
import { makeGetTaskByIdTask } from "../../factories/make-get-task-by-id";

export const getTaskById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { taskId } = getTaskByIdParamsSchema.parse(request.params);

  try {
    const getTaskByIdUseCase = makeGetTaskByIdTask();

    const result = await getTaskByIdUseCase.execute({
      taskId,
    });

    if (result.isRight()) {
      return reply.status(200).send({
        message: "Task found successfully.",
        task: result.value.task,
      });
    } else if (result.value instanceof ResourceNotFoundError) {
      throw new ResourceNotFoundError();
    }
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(401).send({
        message: error.message,
      });
    }

    throw error;
  }
};
