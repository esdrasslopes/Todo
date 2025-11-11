import { CreateUserGroupUseCase } from "@/domain/application/use-cases/create-user-group";
import { MySqlGroupsRepository } from "@/infra/repositories/my-sql/groups-repository";
import { MySqlUsersLevelRepository } from "@/infra/repositories/my-sql/users-level-repositoty";
import { MySqlUsersRepository } from "@/infra/repositories/my-sql/users-repository";

export const makeCreateUserGroup = () => {
  const usersLevelRepository = new MySqlUsersLevelRepository();

  const usersRepository = new MySqlUsersRepository(usersLevelRepository);

  const groupsRepository = new MySqlGroupsRepository();

  const createUserGroupUseCase = new CreateUserGroupUseCase(
    usersRepository,
    groupsRepository
  );

  return createUserGroupUseCase;
};
