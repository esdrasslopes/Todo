import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { Optional } from "@/core/types/optional";
import type { User, UserProps } from "@/domain/entities/user";
import type { UserSummary } from "@/domain/entities/value-objects/user-summary";

export interface UsersRepository {
  create(user: Optional<UserProps, "id" | "userLevelId">): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  fetchUsersSummary(
    params: PaginationParams
  ): Promise<{ summury: UserSummary[]; totalPages: number }>;
  hasPermission(id: string): Promise<boolean>;
}
