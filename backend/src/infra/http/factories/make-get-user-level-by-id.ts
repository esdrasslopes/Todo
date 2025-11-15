import { GetUsersLevelByIdUseCase } from "@/domain/application/use-cases/get-users-level-by-id";
import { MySqlUsersLevelRepository } from "@/infra/repositories/my-sql/users-level-repository";

export const makeGetUsersLevelById = () => {
  const tasksRepository = new MySqlUsersLevelRepository();

  const getUserLevelByIdUseCase = new GetUsersLevelByIdUseCase(tasksRepository);

  return getUserLevelByIdUseCase;
};
