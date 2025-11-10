import { CompleteTaskUseCase } from "@/domain/application/use-cases/complete-task";
import { MySqlTasksRepository } from "@/infra/repositories/tasks-repository";
import { MySqlUsersLevelRepository } from "@/infra/repositories/users-level-repositoty";
import { MySqlUsersRepository } from "@/infra/repositories/users-repository";

export const makeCompleteTask = () => {
  const tasksRepository = new MySqlTasksRepository();

  const usersLevelRepository = new MySqlUsersLevelRepository();

  const usersRepository = new MySqlUsersRepository(usersLevelRepository);

  const completeTaskUseCase = new CompleteTaskUseCase(
    tasksRepository,
    usersRepository
  );

  return completeTaskUseCase;
};
