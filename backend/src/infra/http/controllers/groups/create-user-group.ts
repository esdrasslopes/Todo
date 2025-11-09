import { UnauthorizedError } from "@/domain/application/errors/unauthorized-error";
import { UserGroupAlreadyExistsError } from "@/domain/application/errors/user-group-already-exists-error";
import type { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateUserGroup } from "../../factories/make-create-user-group";
import { createUserGroupBodySchema } from "@/infra/types";

export const createUserGroup = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { groupName } = createUserGroupBodySchema.parse(request.body);

  try {
    const createGroupUseCase = makeCreateUserGroup();

    const requesterId = request.user.sub;

    const result = await createGroupUseCase.execute({
      groupName,
      requesterId,
    });

    if (result.isRight()) {
      return reply.status(201).send({
        message: "Group successfully created",
      });
    } else if (result.value instanceof UserGroupAlreadyExistsError) {
      throw new UserGroupAlreadyExistsError(result.value.message);
    }
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return reply.status(201).send({
        message: error.message,
      });
    }

    if (error instanceof UserGroupAlreadyExistsError) {
      return reply.status(400).send({
        message: error.message,
      });
    }

    throw error;
  }
};
