import { DeleteTaskUseCase } from "@/domain/application/use-cases/delete-task";
import { MySqlTasksRepository } from "@/infra/repositories/tasks-repository";
import { MySqlUsersLevelRepository } from "@/infra/repositories/users-level-repositoty";
import { MySqlUsersRepository } from "@/infra/repositories/users-repository";

export const makeDeleteTask = () => {
  const tasksRepository = new MySqlTasksRepository();

  const usersLevelRepository = new MySqlUsersLevelRepository();

  const usersRepository = new MySqlUsersRepository(usersLevelRepository);

  const deleteTaskUseCase = new DeleteTaskUseCase(
    usersRepository,
    tasksRepository
  );

  return deleteTaskUseCase;
};
