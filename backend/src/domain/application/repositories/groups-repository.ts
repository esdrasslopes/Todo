import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { Optional } from "@/core/types/optional";
import type { UserGroup, UserGroupProps } from "@/domain/entities/user-group";

export interface GroupsRepository {
  fetchGroups(params: PaginationParams): Promise<UserGroup[]>;
  findByGroupName(groupName: string): Promise<UserGroup | null>;
  create(userGroup: Optional<UserGroupProps, "id">): Promise<void>;
}
