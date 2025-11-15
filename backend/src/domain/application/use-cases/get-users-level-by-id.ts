import { left, right, type Either } from "@/core/either";
import type { UsersLevel } from "@/domain/entities/users-level";
import type { UsersLevelRepository } from "../repositories/users-level-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetUserLevelByIdUseCaseRequest {
  id: string;
}

type GetUserLevelByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  { usersLevel: UsersLevel }
>;

export class GetUsersLevelByIdUseCase {
  constructor(private usersLevel: UsersLevelRepository) {}

  async execute({
    id,
  }: GetUserLevelByIdUseCaseRequest): Promise<GetUserLevelByIdUseCaseResponse> {
    const usersLevel = await this.usersLevel.getUserLevelById(id);

    if (!usersLevel) {
      return left(new ResourceNotFoundError());
    }

    return right({
      usersLevel,
    });
  }
}
