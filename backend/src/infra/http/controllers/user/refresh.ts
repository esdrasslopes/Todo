import type { FastifyRequest, FastifyReply } from "fastify";

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
  await request.jwtVerify({ onlyCookie: true });

  const token = await reply.jwtSign({
    sub: request.user.sub,
    groupId: request.user.groupId,
  });

  const refreshToken = await reply.jwtSign(
    {
      sub: request.user.sub,
      groupId: request.user.groupId,
    },
    {
      expiresIn: "7d",
    }
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    });
};
