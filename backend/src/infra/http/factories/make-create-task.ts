import { CreateTaskUseCase } from "@/domain/application/use-cases/create-task";
import { MongoTasksRepository } from "@/infra/repositories/mongo/tasks-repository";
import { MySqlTasksRepository } from "@/infra/repositories/my-sql/tasks-repository";
import { MySqlUsersLevelRepository } from "@/infra/repositories/my-sql/users-level-repository";
import { MySqlUsersRepository } from "@/infra/repositories/my-sql/users-repository";

export const makeCreateTask = () => {
  const tasksRepository = new MySqlTasksRepository();

  const usersLevelRepository = new MySqlUsersLevelRepository();

  const cacheTasksRepository = new MongoTasksRepository();

  const usersRepository = new MySqlUsersRepository(usersLevelRepository);

  const createTaskUseCase = new CreateTaskUseCase(
    usersRepository,
    tasksRepository,
    cacheTasksRepository
  );

  return createTaskUseCase;
};
