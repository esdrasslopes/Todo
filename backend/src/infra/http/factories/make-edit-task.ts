import { EditTaskUseCase } from "@/domain/application/use-cases/edit-task";
import { MySqlTasksRepository } from "@/infra/repositories/my-sql/tasks-repository";
import { MySqlUsersLevelRepository } from "@/infra/repositories/my-sql/users-level-repositoty";
import { MySqlUsersRepository } from "@/infra/repositories/my-sql/users-repository";

export const makeEditTask = () => {
  const tasksRepository = new MySqlTasksRepository();

  const usersLevelRepository = new MySqlUsersLevelRepository();

  const usersRepository = new MySqlUsersRepository(usersLevelRepository);

  const editTaskUseCase = new EditTaskUseCase(usersRepository, tasksRepository);

  return editTaskUseCase;
};
