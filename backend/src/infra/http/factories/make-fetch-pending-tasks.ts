import { FetchPendingTasksUseCase } from "@/domain/application/use-cases/fetch-pending-tasks";
import { MongoTasksRepository } from "@/infra/repositories/mongo/tasks-repository";
import { MySqlTasksRepository } from "@/infra/repositories/my-sql/tasks-repository";

export const makeFetchPendingTasks = () => {
  const tasksRepository = new MySqlTasksRepository();

  const cacheTasksRepository = new MongoTasksRepository();

  const fetchPendingTasksUseCase = new FetchPendingTasksUseCase(
    tasksRepository,
    cacheTasksRepository
  );

  return fetchPendingTasksUseCase;
};
