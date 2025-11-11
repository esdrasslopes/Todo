import type { Task } from "@/domain/entities/task";

export interface CacheTasksRepository {
  create(task: Task): Promise<void>;
  createMany(tasks: Task[]): Promise<void>;
  save(task: Task): Promise<void>;
  delete(taskId: string): Promise<void>;
  findByGroupId(groupId: string): Promise<Task[]>;
}
