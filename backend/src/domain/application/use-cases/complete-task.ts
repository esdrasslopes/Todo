import { left, right, type Either } from "@/core/either";
import type { TasksRepository } from "../repositories/tasks-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import type { UsersRepository } from "../repositories/users-repository";
import type { CacheTasksRepository } from "../repositories/cache/cache-repository";

interface CompleteTaskUseCaseRequest {
  taskId: string;
  completedBy: string;
}

type CompleteTaskUseCaseResponse = Either<ResourceNotFoundError, null>;

export class CompleteTaskUseCase {
  constructor(
    private tasksRepository: TasksRepository,
    private usersRepository: UsersRepository,
    private cacheTasksRepository: CacheTasksRepository
  ) {}

  async execute({
    taskId,
    completedBy,
  }: CompleteTaskUseCaseRequest): Promise<CompleteTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      return left(new ResourceNotFoundError());
    }

    const user = await this.usersRepository.findById(completedBy);

    if (!user) {
      return left(new ResourceNotFoundError());
    }

    await this.tasksRepository.completeTask(taskId, completedBy);

    await this.cacheTasksRepository.completeTask(taskId, completedBy);

    return right(null);
  }
}
