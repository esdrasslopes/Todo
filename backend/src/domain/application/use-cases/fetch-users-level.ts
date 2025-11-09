import { right, type Either } from "@/core/either";
import type { UsersLevelProps } from "@/domain/entities/users-level";
import type { UsersLevelRepository } from "../repositories/users-level-repository";

type FetchUsersLevelUseCaseResponse = Either<
  null,
  { usersLevel: UsersLevelProps[] }
>;

export class FetchUsersLevelUseCase {
  constructor(private usersLevel: UsersLevelRepository) {}

  async execute(): Promise<FetchUsersLevelUseCaseResponse> {
    const usersLevel = await this.usersLevel.fetchUsersLevel();

    return right({
      usersLevel,
    });
  }
}
