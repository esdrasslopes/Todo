import { left, right, type Either } from "@/core/either";
import type { UsersRepository } from "../repositories/users-repository";
import { UnauthorizedError } from "../errors/unauthorized-error";
import type { TasksRepository } from "../repositories/tasks-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import type { Task } from "@/domain/entities/task";
import type { CacheTasksRepository } from "../repositories/cache/cache-repository";

interface EditTaskUseCaseRequest {
  taskId: string;
  requesterId: string;
  title: string;
  description: string;
  status: "PENDING" | "COMPLETED";
  priority: "LOW" | "HIGH";
}

type EditTaskUseCaseResponse = Either<
  UnauthorizedError | ResourceNotFoundError,
  {
    task: Task;
  }
>;

export class EditTaskUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private tasksRepository: TasksRepository,
    private taskCacheRepository: CacheTasksRepository
  ) {}

  async execute({
    taskId,
    requesterId,
    description,
    priority,
    status,
    title,
  }: EditTaskUseCaseRequest): Promise<EditTaskUseCaseResponse> {
    const permission = this.usersRepository.hasPermission(requesterId);

    if (!permission) {
      return left(new UnauthorizedError());
    }

    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      return left(new ResourceNotFoundError());
    }

    task.title = title;
    task.description = description;
    task.priority = priority;
    task.status = status;

    await this.tasksRepository.update(task);

    await this.taskCacheRepository.save(task);

    return right({
      task,
    });
  }
}
