import { GetTaskByIdUseCase } from "@/domain/application/use-cases/get-task-by-id";
import { MySqlTasksRepository } from "@/infra/repositories/tasks-repository";

export const makeGetTaskByIdTask = () => {
  const tasksRepository = new MySqlTasksRepository();

  const getTaskByIdUseCase = new GetTaskByIdUseCase(tasksRepository);

  return getTaskByIdUseCase;
};
