import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { sub: string; groupId: string; levelId: string };
    user: { sub: string; groupId: string; levelId: string };
  }
}
