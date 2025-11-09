import type { FastifyRequest, FastifyReply } from "fastify";

export const verifyJwt = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await request.jwtVerify();
  } catch (error) {
    console.log(error);

    return reply.status(401).send({
      message: "Unauthorized",
    });
  }
};
