import { left, right, type Either } from "@/core/either";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import type { UsersRepository } from "../repositories/users-repository";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import type { UserSummary } from "@/domain/entities/value-objects/user-summary";

interface FetchUsersSummuryUseCaseRequest {
  requesterId: string;
}

type FetchUsersSummuryUseCaseResponse = Either<
  UserAlreadyExistsError | ResourceNotFoundError | UnauthorizedError,
  { summary: UserSummary[] }
>;

export class FetchUsersSummuryUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    requesterId,
  }: FetchUsersSummuryUseCaseRequest): Promise<FetchUsersSummuryUseCaseResponse> {
    const permission = await this.usersRepository.hasPermission(requesterId);

    if (!permission) {
      return left(new UnauthorizedError());
    }

    const summary = await this.usersRepository.fetchUsersSummary();

    return right({
      summary,
    });
  }
}
