import { FetchUserGroupsUseCase } from "@/domain/application/use-cases/fetch-user-groups";
import { MySqlGroupsRepository } from "@/infra/repositories/my-sql/groups-repository";

export const makeFetchUsersGroup = () => {
  const usersGroupRepository = new MySqlGroupsRepository();

  const fetchUsersGroupsUseCase = new FetchUserGroupsUseCase(
    usersGroupRepository
  );

  return fetchUsersGroupsUseCase;
};
