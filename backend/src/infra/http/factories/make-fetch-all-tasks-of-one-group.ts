import { FetchAllTasksOfOneGroupUseCase } from "@/domain/application/use-cases/fetch-all-tasks-of-one-group";
import { MySqlTasksRepository } from "@/infra/repositories/my-sql/tasks-repository";

export const makeFetchAllTasksOfOneGroup = () => {
  const tasksRepository = new MySqlTasksRepository();

  const fetchAllTasksOfOneGroupUseCase = new FetchAllTasksOfOneGroupUseCase(
    tasksRepository
  );

  return fetchAllTasksOfOneGroupUseCase;
};
