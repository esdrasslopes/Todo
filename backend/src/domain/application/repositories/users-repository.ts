import type { Optional } from "@/core/types/optional";
import type { User, UserProps } from "@/domain/entities/user";
import type { UserSummary } from "@/domain/entities/value-objects/user-summary";

export interface UsersRepository {
  create(user: Optional<UserProps, "id" | "userLevelId">): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  fetchUsersSummary(): Promise<UserSummary[]>;
  hasPermission(id: string): Promise<boolean>;
}
