import { FetchAllTasksOfOneGroupUseCase } from "@/domain/application/use-cases/fetch-all-tasks-of-one-group";
import { MongoTasksRepository } from "@/infra/repositories/mongo/tasks-repository";
import { MySqlTasksRepository } from "@/infra/repositories/my-sql/tasks-repository";

export const makeFetchAllTasksOfOneGroup = () => {
  const tasksRepository = new MySqlTasksRepository();

  const cacheTasksRepository = new MongoTasksRepository();

  const fetchAllTasksOfOneGroupUseCase = new FetchAllTasksOfOneGroupUseCase(
    tasksRepository,
    cacheTasksRepository
  );

  return fetchAllTasksOfOneGroupUseCase;
};
