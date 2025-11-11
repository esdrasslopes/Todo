import { FetchPendingTasksUseCase } from "@/domain/application/use-cases/fetch-pending-tasks";
import { MySqlTasksRepository } from "@/infra/repositories/my-sql/tasks-repository";

export const makeFetchPendingTasks = () => {
  const tasksRepository = new MySqlTasksRepository();

  const fetchPendingTasksUseCase = new FetchPendingTasksUseCase(
    tasksRepository
  );

  return fetchPendingTasksUseCase;
};
