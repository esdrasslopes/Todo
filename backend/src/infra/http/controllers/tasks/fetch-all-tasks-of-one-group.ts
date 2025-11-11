import type { FastifyReply, FastifyRequest } from "fastify";
import { fetchAllTasksOfOneGroupParamsSchema } from "@/infra/types";
import { makeFetchAllTasksOfOneGroup } from "../../factories/make-fetch-all-tasks-of-one-group";

export const fetchAllTasksOfOneGroup = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { page } = fetchAllTasksOfOneGroupParamsSchema.parse(request.query);

  const fetchAllTasksUseCase = makeFetchAllTasksOfOneGroup();

  const groupId = request.user.groupId;

  console.log(groupId);

  const result = await fetchAllTasksUseCase.execute({ page, groupId });

  return reply.status(200).send({
    message: "Tasks found successfully.",
    tasks: result.value?.tasks,
  });
};
