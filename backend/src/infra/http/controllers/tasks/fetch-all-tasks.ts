import type { FastifyReply, FastifyRequest } from "fastify";
import { fetchAllTasksParamsSchema } from "@/infra/types";
import { makeFetchAllTasks } from "../../factories/make-fetch-all-tasks";
import { UnauthorizedError } from "@/domain/application/errors/unauthorized-error";

export const fetchAllTasks = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { page } = fetchAllTasksParamsSchema.parse(request.query);
  try {
    const fetchAllTasksUseCase = makeFetchAllTasks();

    const requesterId = request.user.sub;

    const result = await fetchAllTasksUseCase.execute({ page, requesterId });

    if (result.isRight()) {
      return reply.status(200).send({
        message: "Tasks found successfully.",
        tasks: result.value?.tasks,
      });
    } else if (result.value instanceof UnauthorizedError) {
      return reply.status(401).send({ message: result.value.message });
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
