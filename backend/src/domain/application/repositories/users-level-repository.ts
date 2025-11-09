import type { UsersLevel } from "@/domain/entities/users-level";

export interface UsersLevelRepository {
  fetchUsersLevel(): Promise<UsersLevel[]>;
  getUserLevelById(id: string): Promise<UsersLevel | null>;
}
