import "dotenv/config";
import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_ADMIN_URL: z.string(),
  DATABASE_USER_URL: z.string(),
  JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid environment variables", _env.error.format());

  throw new Error("❌ Invalid environment variables");
}

export const env = _env.data;
