import { AuthenticateUserUseCase } from "@/domain/application/use-cases/authenticate";
import { BcryptHasher } from "@/infra/cryptography/bcrypt-hasher";
import { MySqlUsersLevelRepository } from "@/infra/repositories/users-level-repositoty";
import { MySqlUsersRepository } from "@/infra/repositories/users-repository";

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
