import type { FastifyReply, FastifyRequest } from "fastify";
import { fetchLowTasksParamsSchema } from "@/infra/types";
import { makeFetchLowPriorityTasks } from "../../factories/make-fetch-low-priority-tasks";
import { UnauthorizedError } from "@/domain/application/errors/unauthorized-error";

export const fetchLowPriorityTasks = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { page } = fetchLowTasksParamsSchema.parse(request.query);

  try {
    const fetchLowTasksUseCase = makeFetchLowPriorityTasks();

    const requester = request.user;

    const result = await fetchLowTasksUseCase.execute({
      page,
      requesterId: requester.sub,
    });

    if (result.isRight()) {
      return reply.status(200).send({
        message: "Tasks found successfully.",
        tasks: result.value.tasks,
        totalPages: result.value.totalPages,
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
