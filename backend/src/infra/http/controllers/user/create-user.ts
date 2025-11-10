import type { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateUser } from "../../factories/make-create-user";
import { createUserBodySchema } from "@/infra/types";
import { UserAlreadyExistsError } from "@/domain/application/errors/user-already-exists-error";

export const createUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { email, groupId, name, password } = createUserBodySchema.parse(
    request.body
  );

  try {
    const createUserUseCase = makeCreateUser();

    const result = await createUserUseCase.execute({
      email,
      groupId,
      name,
      password,
    });

    if (result.isRight()) {
      return reply.status(201).send({
        message: "User successfully created",
      });
    }
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(400).send({
        message: error.message,
      });
    }

    throw error;
  }
};
