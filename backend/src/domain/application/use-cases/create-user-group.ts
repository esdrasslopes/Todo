import { left, right, type Either } from "@/core/either";
import type { UsersRepository } from "../repositories/users-repository";
import { UnauthorizedError } from "../errors/unauthorized-error";
import { UserGroupAlreadyExistsError } from "../errors/user-group-already-exists-error";
import type { GroupsRepository } from "../repositories/groups-repository";

interface CreateUserGroupUseCaseRequest {
  groupName: string;
  requesterId: string;
}

type CreateUserGroupUseCaseResponse = Either<
  UserGroupAlreadyExistsError | UnauthorizedError,
  null
>;

export class CreateUserGroupUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private groupsRepository: GroupsRepository
  ) {}

  async execute({
    groupName,
    requesterId,
  }: CreateUserGroupUseCaseRequest): Promise<CreateUserGroupUseCaseResponse> {
    const permission = await this.usersRepository.hasPermission(requesterId);

    if (!permission) {
      return left(new UnauthorizedError());
    }

    const groupWithSameName = await this.groupsRepository.findByGroupName(
      groupName
    );

    if (groupWithSameName) {
      return left(new UserGroupAlreadyExistsError(groupName));
    }

    await this.groupsRepository.create({
      groupName,
    });

    return right(null);
  }
}
