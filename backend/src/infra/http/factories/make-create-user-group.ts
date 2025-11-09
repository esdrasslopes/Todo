import { CreateUserGroupUseCase } from "@/domain/application/use-cases/create-user-group";
import { MySqlGroupsRepository } from "@/infra/repositories/groups-repository";
import { MySqlUsersLevelRepository } from "@/infra/repositories/users-level-repositoty";
import { MySqlUsersRepository } from "@/infra/repositories/users-repository";

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
