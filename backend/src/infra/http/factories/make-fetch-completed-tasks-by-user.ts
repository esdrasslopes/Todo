import { FetchCompletedTasksByUserUseCase } from "@/domain/application/use-cases/fetch-completed-tasks-by-user";
import { MongoTasksRepository } from "@/infra/repositories/mongo/tasks-repository";
import { MySqlTasksRepository } from "@/infra/repositories/my-sql/tasks-repository";

export const makeFetchCompletedTasksByUser = () => {
  const tasksRepository = new MySqlTasksRepository();

  const cacheTasksRepository = new MongoTasksRepository();

  const fetchCompletedTasksByUserUseCase = new FetchCompletedTasksByUserUseCase(
    tasksRepository,
    cacheTasksRepository
  );

  return fetchCompletedTasksByUserUseCase;
};
