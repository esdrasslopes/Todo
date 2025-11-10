import { FetchCompletedTasksByUserUseCase } from "@/domain/application/use-cases/fetch-completed-tasks-by-user";
import { MySqlTasksRepository } from "@/infra/repositories/tasks-repository";

export const makeFetchCompletedTasksByUser = () => {
  const tasksRepository = new MySqlTasksRepository();

  const fetchAllTasksUseCase = new FetchCompletedTasksByUserUseCase(
    tasksRepository
  );

  return fetchAllTasksUseCase;
};
