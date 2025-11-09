import { right, type Either } from "@/core/either";
import type { GroupsRepository } from "../repositories/groups-repository";
import type { UserGroup } from "@/domain/entities/user-group";

interface FetchUserGroupsUseCaseRequest {
  page: number;
}

type FetchUserGroupsUseCaseResponse = Either<null, { userGroups: UserGroup[] }>;

export class FetchUserGroupsUseCase {
  constructor(private userGroups: GroupsRepository) {}

  async execute({
    page,
  }: FetchUserGroupsUseCaseRequest): Promise<FetchUserGroupsUseCaseResponse> {
    const userGroups = await this.userGroups.fetchGroups({
      page,
    });

    return right({
      userGroups,
    });
  }
}
