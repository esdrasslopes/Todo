import type { FastifyReply, FastifyRequest } from "fastify";
import { fetchAllTasksParamsSchema } from "@/infra/types";
import { makeFetchAllTasks } from "../../factories/make-fetch-all-tasks";

export const fetchAllTasks = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { page } = fetchAllTasksParamsSchema.parse(request.query);

  console.log(page);

  const fetchAllTasksUseCase = makeFetchAllTasks();

  const result = await fetchAllTasksUseCase.execute({ page });

  return reply.status(200).send({
    message: "Tasks found successfully.",
    tasks: result.value?.tasks,
  });
};
