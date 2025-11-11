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
  ): Promise<Task[]>;
  fetchPendingTasks(groupId: string, params: PaginationParams): Promise<Task[]>;
  fetchCompletedTasksByUser(
    userId: string,
    groupId: string,
    params: PaginationParams
  ): Promise<Task[]>;
  fetchAllTasks({ page }: PaginationParams): Promise<Task[]>;
  fetchAllTasksOfOneGroup(
    groupId: string,
    { page }: PaginationParams
  ): Promise<Task[]>;
  fetchHighPriorityTask(params: PaginationParams): Promise<Task[]>;
  fetchLowPriorityTask(params: PaginationParams): Promise<Task[]>;
}
