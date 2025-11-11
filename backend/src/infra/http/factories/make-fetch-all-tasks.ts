import { FetchAllTasksUseCase } from "@/domain/application/use-cases/fetch-all-tasks";
import { MySqlTasksRepository } from "@/infra/repositories/my-sql/tasks-repository";
import { MySqlUsersLevelRepository } from "@/infra/repositories/my-sql/users-level-repositoty";
import { MySqlUsersRepository } from "@/infra/repositories/my-sql/users-repository";

export const makeFetchAllTasks = () => {
  const tasksRepository = new MySqlTasksRepository();

  const usersLevelRepository = new MySqlUsersLevelRepository();

  const usersRepository = new MySqlUsersRepository(usersLevelRepository);

  const fetchAllTasksUseCase = new FetchAllTasksUseCase(
    tasksRepository,
    usersRepository
  );

  return fetchAllTasksUseCase;
};
