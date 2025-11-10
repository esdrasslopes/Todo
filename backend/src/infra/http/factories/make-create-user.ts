import { CreateUserUseCase } from "@/domain/application/use-cases/create-user";
import { BcryptHasher } from "@/infra/cryptography/bcrypt-hasher";
import { MySqlUsersLevelRepository } from "@/infra/repositories/users-level-repositoty";
import { MySqlUsersRepository } from "@/infra/repositories/users-repository";

export const makeCreateUser = () => {
  const usersLevelRepository = new MySqlUsersLevelRepository();

  const usersRepository = new MySqlUsersRepository(usersLevelRepository);

  const bcryptHasher = new BcryptHasher();

  const createUserUseCase = new CreateUserUseCase(
    usersRepository,
    bcryptHasher
  );

  return createUserUseCase;
};
