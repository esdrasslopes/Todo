import { FetchLowPriorityTasksUseCase } from "@/domain/application/use-cases/fetch-low-priority-tasks";
import { MySqlTasksRepository } from "@/infra/repositories/my-sql/tasks-repository";
import { MySqlUsersLevelRepository } from "@/infra/repositories/my-sql/users-level-repository";
import { MySqlUsersRepository } from "@/infra/repositories/my-sql/users-repository";

export const makeFetchLowPriorityTasks = () => {
  const tasksRepository = new MySqlTasksRepository();

  const usersLevelRepository = new MySqlUsersLevelRepository();

  const usersRepository = new MySqlUsersRepository(usersLevelRepository);

  const fetchLowPriorityTasksUseCase = new FetchLowPriorityTasksUseCase(
    tasksRepository,
    usersRepository
  );

  return fetchLowPriorityTasksUseCase;
};
