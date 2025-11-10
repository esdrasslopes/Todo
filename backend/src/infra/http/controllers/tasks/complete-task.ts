import type { FastifyReply, FastifyRequest } from "fastify";
import { makeCompleteTask } from "../../factories/make-complete-task";
import { completeTaskParamsSchema } from "@/infra/types";
import { ResourceNotFoundError } from "@/domain/application/errors/resource-not-found-error";

export const completeTask = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { taskId } = completeTaskParamsSchema.parse(request.params);

  try {
    const completeTaskUseCase = makeCompleteTask();

    const requesterId = request.user.sub;

    const result = await completeTaskUseCase.execute({
      completedBy: requesterId,
      taskId,
    });

    if (result.isRight()) {
      return reply.status(200).send({
        message: "Task successfully completed",
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
