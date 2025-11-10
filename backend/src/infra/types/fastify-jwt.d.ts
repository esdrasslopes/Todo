import "@fastify/jwt";

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: { sub: string; groupId: string }; // payload do token
    user: { sub: string; groupId: string }; // resultado após jwtVerify
  }
}
