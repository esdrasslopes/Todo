import { WrongCredentialsError } from "@/domain/application/errors/wrong-credentials-error";
import { authenticateUserBodySchema } from "@/infra/types";
import type { FastifyReply, FastifyRequest } from "fastify";
import { makeAuthenticate } from "../../factories/make-authenticate";

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { email, password } = authenticateUserBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticate();

    const result = await authenticateUseCase.execute({
      email,
      password,
    });

    if (result.isRight()) {
      const { value } = result;

      const token = await reply.jwtSign({
        sub: value.user.id,
        groupId: value.user.userGroupId,
      });

      const refreshToken = await reply.jwtSign(
        {
          sub: value.user.id,
          groupId: value.user.userGroupId,
        },
        {
          expiresIn: "7d",
        }
      );

      return reply
        .setCookie("refreshToken", refreshToken, {
          path: "/",
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        })
        .status(200)
        .send({
          token,
        });
    } else if (result.value instanceof WrongCredentialsError) {
      throw new WrongCredentialsError();
    }
  } catch (error) {
    if (error instanceof WrongCredentialsError) {
      return reply.status(400).send({
        message: error.message,
      });
    }
  }
};
