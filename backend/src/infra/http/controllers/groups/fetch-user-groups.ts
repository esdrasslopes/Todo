import type { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchUsersGroup } from "../../factories/make-fetch-users-groups";
import { fetchUsersGroupQuerySchema } from "@/infra/types";

export const fetchUsersGroup = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { page } = fetchUsersGroupQuerySchema.parse(request.query);

  const fetchUsersGroupUseCase = makeFetchUsersGroup();

  const result = await fetchUsersGroupUseCase.execute({
    page,
  });

  if (result.isRight()) {
    return reply.status(200).send({
      message: "Users group fetched successfully.",
      usersGroups: result.value.userGroups,
    });
  }
};
