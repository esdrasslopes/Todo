import type { FastifyReply, FastifyRequest } from "fastify";
import { makeUsersSummury } from "../../factories/make-users-summury";
import { UnauthorizedError } from "@/domain/application/errors/unauthorized-error";
import { fetchUsersSummurySchema } from "@/infra/types";

export const fetchUsersSummary = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { page } = fetchUsersSummurySchema.parse(request.query);

  try {
    const fetchUsersSummuryUseCase = makeUsersSummury();

    const requesterId = request.user.sub;

    const result = await fetchUsersSummuryUseCase.execute({
      requesterId,
      page,
    });

    if (result.isRight()) {
      return reply.status(200).send({
        message: "Users summary fetched successfully.",
        summury: result.value.summary,
        totalPages: result.value.totalPages,
      });
    } else if (result.value instanceof UnauthorizedError) {
      throw new UnauthorizedError();
    }
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return reply.status(400).send({
        message: error.message,
      });
    }
  }
};
