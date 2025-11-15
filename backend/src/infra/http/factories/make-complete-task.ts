import { CompleteTaskUseCase } from "@/domain/application/use-cases/complete-task";
import { MongoTasksRepository } from "@/infra/repositories/mongo/tasks-repository";
import { MySqlTasksRepository } from "@/infra/repositories/my-sql/tasks-repository";
import { MySqlUsersLevelRepository } from "@/infra/repositories/my-sql/users-level-repository";
import { MySqlUsersRepository } from "@/infra/repositories/my-sql/users-repository";

export const makeCompleteTask = () => {
  const tasksRepository = new MySqlTasksRepository();

  const usersLevelRepository = new MySqlUsersLevelRepository();

  const cacheTasksRepository = new MongoTasksRepository();

  const usersRepository = new MySqlUsersRepository(usersLevelRepository);

  const completeTaskUseCase = new CompleteTaskUseCase(
    tasksRepository,
    usersRepository,
    cacheTasksRepository
  );

  return completeTaskUseCase;
};
