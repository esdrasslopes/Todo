import { FetchUsersSummuryUseCase } from "@/domain/application/use-cases/fetch-users-summary";
import { MySqlUsersLevelRepository } from "@/infra/repositories/my-sql/users-level-repositoty";
import { MySqlUsersRepository } from "@/infra/repositories/my-sql/users-repository";

export const makeUsersSummury = () => {
  const usersLevelRepository = new MySqlUsersLevelRepository();

  const usersRepository = new MySqlUsersRepository(usersLevelRepository);

  const fetchUsersSummaryUseCase = new FetchUsersSummuryUseCase(
    usersRepository
  );

  return fetchUsersSummaryUseCase;
};
