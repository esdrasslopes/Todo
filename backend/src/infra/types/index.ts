import z from "zod";

export const createUserBodySchema = z.object({
  groupId: z.string(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
});

export const createUserGroupBodySchema = z.object({
  groupName: z.string(),
});

export const authenticateUserBodySchema = z.object({
  email: z.string(),
  password: z.string().min(6),
});

export const fetchUsersGroupQuerySchema = z.object({
  page: z.coerce.number(),
});

export const createTaskBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["PENDING", "COMPLETED"]),
  priority: z.enum(["HIGH", "LOW"]),
  directedTo: z.string(),
});
