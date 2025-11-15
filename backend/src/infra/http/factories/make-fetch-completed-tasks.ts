import { FetchCompletedTasksUseCase } from "@/domain/application/use-cases/fetch-completed-tasks";
import { MongoTasksRepository } from "@/infra/repositories/mongo/tasks-repository";
import { MySqlTasksRepository } from "@/infra/repositories/my-sql/tasks-repository";

export const makeFetchCompletedTasks = () => {
  const tasksRepository = new MySqlTasksRepository();

  const cacheTasksRepository = new MongoTasksRepository();

  const fetchCompletedTasksUseCase = new FetchCompletedTasksUseCase(
    tasksRepository,
    cacheTasksRepository
  );

  return fetchCompletedTasksUseCase;
};
