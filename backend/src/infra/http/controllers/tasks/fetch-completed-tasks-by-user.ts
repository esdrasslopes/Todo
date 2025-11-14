import type { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchCompletedTasksByUser } from "../../factories/make-fetch-completed-tasks-by-user";
import { fetchCompletedTasksByUserParamsSchema } from "@/infra/types";

export const fetchCompletedTasksByUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { page } = fetchCompletedTasksByUserParamsSchema.parse(request.query);

  const fetchCompletedTasksByUserUseCase = makeFetchCompletedTasksByUser();

  const requester = request.user;

  const result = await fetchCompletedTasksByUserUseCase.execute({
    page,
    groupId: requester.groupId,
    userId: requester.sub,
  });

  if (result.isRight()) {
    return reply.status(200).send({
      message: "Tasks found successfully.",
      task: result.value.tasks,
      totalPages: result.value.totalPages,
    });
  }
};
