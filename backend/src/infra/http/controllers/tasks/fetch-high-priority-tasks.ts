import type { FastifyReply, FastifyRequest } from "fastify";
import { fetchHighTasksParamsSchema } from "@/infra/types";
import { makeFetchHighPriorityTasks } from "../../factories/make-fetch-high-priority-tasks";
import { UnauthorizedError } from "@/domain/application/errors/unauthorized-error";

export const fetchHighPriorityTasks = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { page } = fetchHighTasksParamsSchema.parse(request.query);

  try {
    const fetchHighTasksUseCase = makeFetchHighPriorityTasks();

    const requester = request.user;

    const result = await fetchHighTasksUseCase.execute({
      page,
      requesterId: requester.sub,
    });

    if (result.isRight()) {
      return reply.status(200).send({
        message: "Tasks found successfully.",
        task: result.value.tasks,
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
