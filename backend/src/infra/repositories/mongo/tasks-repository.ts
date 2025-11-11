import type { CacheTasksRepository } from "@/domain/application/repositories/cache/cache-repository";
import { Task } from "@/domain/entities/task";
import { Task as TaskModel } from "@/infra/database/mongo/model/task-schema";

export class MongoTasksRepository implements CacheTasksRepository {
  async create(task: Task): Promise<void> {
    await TaskModel.create(task);
  }

  async createMany(tasks: Task[]): Promise<void> {
    await TaskModel.insertMany(tasks);
  }

  async save(task: Task): Promise<void> {
    await TaskModel.updateOne({ id: task.id }, task);
  }

  async delete(taskId: string): Promise<void> {
    await TaskModel.deleteOne({ id: taskId });
  }

  async findByGroupId(groupId: string): Promise<Task[]> {
    const tasks = await TaskModel.find({ groupId });

    return tasks.map((task) => {
      return Task.create({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        directedTo: task.groupId,
        createdAt: task.createdAt ?? new Date(),
        updatedAt: task.updatedAt ?? null,
        completedAt: task.completedAt ?? null,
        completedBy: task.completedBy ?? null,
      });
    });
  }
}
