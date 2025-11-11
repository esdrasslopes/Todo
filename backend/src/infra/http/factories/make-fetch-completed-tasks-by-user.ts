import { FetchCompletedTasksByUserUseCase } from "@/domain/application/use-cases/fetch-completed-tasks-by-user";
import { MySqlTasksRepository } from "@/infra/repositories/my-sql/tasks-repository";

export const makeFetchCompletedTasksByUser = () => {
  const tasksRepository = new MySqlTasksRepository();

  const fetchCompletedTasksByUserUseCase = new FetchCompletedTasksByUserUseCase(
    tasksRepository
  );

  return fetchCompletedTasksByUserUseCase;
};
