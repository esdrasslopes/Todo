import type { FastifyRequest, FastifyReply } from "fastify";

export const refresh = async (request: FastifyRequest, reply: FastifyReply) => {
  await request.jwtVerify({ onlyCookie: true });

  const token = await reply.jwtSign({
    sub: request.user.sub,
    groupId: request.user.groupId,
    levelId: request.user.levelId,
  });

  const refreshToken = await reply.jwtSign(
    {
      sub: request.user.sub,
      groupId: request.user.groupId,
      levelId: request.user.levelId,
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
};
