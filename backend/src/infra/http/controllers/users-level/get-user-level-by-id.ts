import type { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "@/domain/application/errors/resource-not-found-error";
import { makeGetUsersLevelById } from "../../factories/make-get-user-level-by-id";

export const getUsersLevelById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const getUsersLevelByIdUseCase = makeGetUsersLevelById();

    const userLevelId = request.user.levelId;

    console.log(userLevelId);

    const result = await getUsersLevelByIdUseCase.execute({
      id: userLevelId,
    });

    if (result.isRight()) {
      return reply.status(200).send({
        message: "UsersLevel found successfully.",
        userLevel: result.value.usersLevel,
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
