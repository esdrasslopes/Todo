import { left, right, type Either } from "@/core/either";
import type { HashGenerator } from "../cryptography/hash-generator";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import type { UsersRepository } from "../repositories/users-repository";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreateUserUseCaseRequest {
  groupId: string;
  email: string;
  password: string;
  name: string;
}

type CreateUserUseCaseResponse = Either<
  UserAlreadyExistsError | ResourceNotFoundError | UnauthorizedError,
  null
>;

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    email,
    name,
    password,
    groupId,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email));
    }

    const passwordHash = await this.hashGenerator.hash(password);

    await this.usersRepository.create({
      email,
      name,
      password: passwordHash,
      userGroupId: groupId,
    });

    return right(null);
  }
}
