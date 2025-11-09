import { left, right, type Either } from "@/core/either";
import type { UsersRepository } from "../repositories/users-repository";
import { WrongCredentialsError } from "../errors/wrong-credentials-error";
import type { HashComparer } from "../cryptography/hash-comparer";
import type { User } from "@/domain/entities/user";

interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentialsError,
  {
    user: User;
  }
>;

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    return right({
      user,
    });
  }
}
