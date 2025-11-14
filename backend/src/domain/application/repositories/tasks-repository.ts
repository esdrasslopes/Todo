import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { Task } from "@/domain/entities/task";

export interface TasksRepository {
  findById(id: string): Promise<Task | null>;
  create(task: Task): Promise<void>;
  completeTask(id: string, completedBy: string): Promise<void>;
  delete(id: string): Promise<void>;
  update(task: Task): Promise<void>;
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
  fetchAllTasks({
    page,
  }: PaginationParams): Promise<{ tasks: Task[]; totalPages: number }>;
  fetchAllTasksOfOneGroup(
    groupId: string,
    { page }: PaginationParams
  ): Promise<{ tasks: Task[]; totalPages: number }>;
  fetchHighPriorityTask(
    params: PaginationParams
  ): Promise<{ tasks: Task[]; totalPages: number }>;
  fetchLowPriorityTask(
    params: PaginationParams
  ): Promise<{ tasks: Task[]; totalPages: number }>;
}
