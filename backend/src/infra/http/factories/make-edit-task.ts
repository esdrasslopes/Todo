import { EditTaskUseCase } from "@/domain/application/use-cases/edit-task";
import { MongoTasksRepository } from "@/infra/repositories/mongo/tasks-repository";
import { MySqlTasksRepository } from "@/infra/repositories/my-sql/tasks-repository";
import { MySqlUsersLevelRepository } from "@/infra/repositories/my-sql/users-level-repository";
import { MySqlUsersRepository } from "@/infra/repositories/my-sql/users-repository";

export const makeEditTask = () => {
  const tasksRepository = new MySqlTasksRepository();

  const usersLevelRepository = new MySqlUsersLevelRepository();

  const cacheTasksRepository = new MongoTasksRepository();

  const usersRepository = new MySqlUsersRepository(usersLevelRepository);

  const editTaskUseCase = new EditTaskUseCase(
    usersRepository,
    tasksRepository,
    cacheTasksRepository
  );

  return editTaskUseCase;
};
