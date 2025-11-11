import type { FastifyReply, FastifyRequest } from "fastify";
import { fetchCompletedTasksParamsSchema } from "@/infra/types";
import { makeFetchCompletedTasks } from "../../factories/make-fetch-completed-tasks";

export const fetchCompletedTasks = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { page } = fetchCompletedTasksParamsSchema.parse(request.query);

  const fetchCompletedTasksUseCase = makeFetchCompletedTasks();

  const requester = request.user;

  const result = await fetchCompletedTasksUseCase.execute({
    page,
    groupId: requester.groupId,
  });

  if (result.isRight()) {
    return reply.status(200).send({
      message: "Tasks found successfully.",
      task: result.value.tasks,
    });
  }
};
