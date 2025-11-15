import type { FastifyReply, FastifyRequest } from "fastify";
import { fetchPendingTasksParamsSchema } from "@/infra/types";
import { makeFetchPendingTasks } from "../../factories/make-fetch-pending-tasks";

export const fetchPendingTasks = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { page } = fetchPendingTasksParamsSchema.parse(request.query);

  const fetchPendingTasksUseCase = makeFetchPendingTasks();

  const requester = request.user;

  const result = await fetchPendingTasksUseCase.execute({
    page,
    groupId: requester.groupId,
  });

  if (result.isRight()) {
    return reply.status(200).send({
      message: "Tasks found successfully.",
      tasks: result.value.tasks,
      totalPages: result.value.totalPages,
    });
  }
};
