import { AuthenticateUserUseCase } from "@/domain/application/use-cases/authenticate";
import { BcryptHasher } from "@/infra/cryptography/bcrypt-hasher";
import { MySqlUsersLevelRepository } from "@/infra/repositories/my-sql/users-level-repository";
import { MySqlUsersRepository } from "@/infra/repositories/my-sql/users-repository";

export const makeAuthenticate = () => {
  const usersLevelRepository = new MySqlUsersLevelRepository();

  const usersRepository = new MySqlUsersRepository(usersLevelRepository);

  const bcryptHasher = new BcryptHasher();

  const authenticateUserUseCase = new AuthenticateUserUseCase(
    usersRepository,
    bcryptHasher
  );

  return authenticateUserUseCase;
};
