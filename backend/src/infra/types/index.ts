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

export const completeTaskParamsSchema = z.object({
  taskId: z.string(),
});

export const getTaskByIdParamsSchema = z.object({
  taskId: z.string(),
});

export const fetchAllTasksParamsSchema = z.object({
  page: z.coerce.number(),
});

export const fetchAllTasksOfOneGroupParamsSchema = z.object({
  page: z.coerce.number(),
});

export const deleteTaskParamsSchema = z.object({
  taskId: z.string(),
});

export const fetchCompletedTasksByUserParamsSchema = z.object({
  page: z.coerce.number(),
});

export const fetchCompletedTasksParamsSchema = z.object({
  page: z.coerce.number(),
});

export const fetchPendingTasksParamsSchema = z.object({
  page: z.coerce.number(),
});

export const fetchHighTasksParamsSchema = z.object({
  page: z.coerce.number(),
});

export const fetchLowTasksParamsSchema = z.object({
  page: z.coerce.number(),
});

export const editTaskBodySchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(["PENDING", "COMPLETED"]),
  priority: z.enum(["HIGH", "LOW"]),
});

export const editTaskParamsSchema = z.object({
  taskId: z.string(),
});
