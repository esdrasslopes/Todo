import { FetchAllTasksUseCase } from "@/domain/application/use-cases/fetch-all-tasks";
import { MySqlTasksRepository } from "@/infra/repositories/tasks-repository";

export const makeFetchAllTasks = () => {
  const tasksRepository = new MySqlTasksRepository();

  const fetchAllTasksUseCase = new FetchAllTasksUseCase(tasksRepository);

  return fetchAllTasksUseCase;
};
