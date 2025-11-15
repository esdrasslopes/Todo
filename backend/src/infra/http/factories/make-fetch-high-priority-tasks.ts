import { FetchHighPriorityTasksUseCase } from "@/domain/application/use-cases/fetch-high-priority-tasks";
import { MySqlTasksRepository } from "@/infra/repositories/my-sql/tasks-repository";
import { MySqlUsersLevelRepository } from "@/infra/repositories/my-sql/users-level-repository";
import { MySqlUsersRepository } from "@/infra/repositories/my-sql/users-repository";

export const makeFetchHighPriorityTasks = () => {
  const tasksRepository = new MySqlTasksRepository();

  const usersLevelRepository = new MySqlUsersLevelRepository();

  const usersRepository = new MySqlUsersRepository(usersLevelRepository);

  const fetchHighPriorityTasksUseCase = new FetchHighPriorityTasksUseCase(
    tasksRepository,
    usersRepository
  );

  return fetchHighPriorityTasksUseCase;
};
