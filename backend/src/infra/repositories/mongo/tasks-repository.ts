import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { CacheTasksRepository } from "@/domain/application/repositories/cache/cache-repository";
import { Task } from "@/domain/entities/task";
import { Task as TaskModel } from "@/infra/database/mongo/model/task-schema";

export class MongoTasksRepository implements CacheTasksRepository {
  async create(task: Task): Promise<void> {
    await TaskModel.create({
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      groupId: task.directedTo,
      createdAt: task.createdAt,
      completedAt: task.completedAt,
      completedBy: task.completedBy,
      updatedAt: task.updatedAt,
    });
  }

  async save(task: Task): Promise<void> {
    try {
      await TaskModel.updateOne(
        { id: task.id },
        {
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async completeTask(taskId: string, completedBy: string): Promise<void> {
    try {
      await TaskModel.updateOne(
        { id: taskId },
        { completedAt: new Date(), completedBy, status: "COMPLETED" }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async delete(taskId: string): Promise<void> {
    await TaskModel.deleteOne({ id: taskId });
  }

  async findByGroupId(
    groupId: string,
    { page }: PaginationParams
  ): Promise<Task[]> {
    const tasks = await TaskModel.find({ groupId });

    return tasks
      .map((task) => {
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
      })
      .slice((page - 1) * 20, page * 10);
  }
}
