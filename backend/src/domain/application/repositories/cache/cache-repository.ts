import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { Task } from "@/domain/entities/task";

export interface CacheTasksRepository {
  create(task: Task): Promise<void>;
  save(task: Task): Promise<void>;
  delete(taskId: string): Promise<void>;
  findByGroupId(
    groupId: string,
    params: PaginationParams
  ): Promise<{ tasks: Task[]; totalPages: number }>;
  completeTask(taskId: string, completedBy: string): Promise<void>;
  fetchCompletedTasks(
    groupId: string,
    params: PaginationParams
  ): Promise<{ tasks: Task[]; totalPages: number }>;
  fetchPendingTasks(
    groupId: string,
    params: PaginationParams
  ): Promise<{ tasks: Task[]; totalPages: number }>;
  fetchCompletedTasksByUser(
    userId: string,
    groupId: string,
    params: PaginationParams
  ): Promise<{ tasks: Task[]; totalPages: number }>;
}
