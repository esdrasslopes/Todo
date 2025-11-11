import { DeleteTaskUseCase } from "@/domain/application/use-cases/delete-task";
import { MongoTasksRepository } from "@/infra/repositories/mongo/tasks-repository";
import { MySqlTasksRepository } from "@/infra/repositories/my-sql/tasks-repository";
import { MySqlUsersLevelRepository } from "@/infra/repositories/my-sql/users-level-repositoty";
import { MySqlUsersRepository } from "@/infra/repositories/my-sql/users-repository";

export const makeDeleteTask = () => {
  const tasksRepository = new MySqlTasksRepository();

  const usersLevelRepository = new MySqlUsersLevelRepository();

  const usersRepository = new MySqlUsersRepository(usersLevelRepository);

  const cacheTasksRepository = new MongoTasksRepository();

  const deleteTaskUseCase = new DeleteTaskUseCase(
    usersRepository,
    tasksRepository,
    cacheTasksRepository
  );

  return deleteTaskUseCase;
};
