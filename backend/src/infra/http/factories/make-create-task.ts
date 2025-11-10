import { CreateTaskUseCase } from "@/domain/application/use-cases/create-task";
import { MySqlTasksRepository } from "@/infra/repositories/tasks-repository";
import { MySqlUsersLevelRepository } from "@/infra/repositories/users-level-repositoty";
import { MySqlUsersRepository } from "@/infra/repositories/users-repository";

export const makeCreateTask = () => {
  const tasksRepository = new MySqlTasksRepository();

  const usersLevelRepository = new MySqlUsersLevelRepository();

  const usersRepository = new MySqlUsersRepository(usersLevelRepository);

  const createTaskUseCase = new CreateTaskUseCase(
    usersRepository,
    tasksRepository
  );

  return createTaskUseCase;
};
