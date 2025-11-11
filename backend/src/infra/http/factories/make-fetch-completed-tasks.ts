import { FetchCompletedTasksUseCase } from "@/domain/application/use-cases/fetch-completed-tasks";
import { MySqlTasksRepository } from "@/infra/repositories/my-sql/tasks-repository";

export const makeFetchCompletedTasks = () => {
  const tasksRepository = new MySqlTasksRepository();

  const fetchCompletedTasksUseCase = new FetchCompletedTasksUseCase(
    tasksRepository
  );

  return fetchCompletedTasksUseCase;
};
