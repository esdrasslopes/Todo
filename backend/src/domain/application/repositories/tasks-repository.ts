import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { Optional } from "@/core/types/optional";
import type { Task, TaskProps } from "@/domain/entities/task";

export interface TasksRepository {
  findById(id: string): Promise<Task | null>;
  create(taskProps: Optional<TaskProps, "id" | "createdAt">): Promise<void>;
  completedTask(id: string, completedBy: string): Promise<void>;
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
  fetchHighPriorityTask(params: PaginationParams): Promise<Task[]>;
}
