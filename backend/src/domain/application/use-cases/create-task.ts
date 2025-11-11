import { left, right, type Either } from "@/core/either";
import type { UsersRepository } from "../repositories/users-repository";
import { UnauthorizedError } from "../errors/unauthorized-error";
import type { TasksRepository } from "../repositories/tasks-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { Task } from "@/domain/entities/task";
import { generateCustomId } from "@/core/utils/id-generator";
import type { CacheTasksRepository } from "../repositories/cache/cache-repository";

interface CreateTaskUseCaseRequest {
  title: string;
  description: string;
  status: "PENDING" | "COMPLETED";
  priority: "LOW" | "HIGH";
  requesterId: string;
  directedTo: string;
}

type CreateTaskUseCaseResponse = Either<
  UnauthorizedError | ResourceNotFoundError,
  null
>;

export class CreateTaskUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private tasksRepository: TasksRepository,
    private cacheTasksRepository: CacheTasksRepository
  ) {}

  async execute({
    description,
    priority,
    status,
    title,
    requesterId,
    directedTo,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const permission = await this.usersRepository.hasPermission(requesterId);

    if (!permission) {
      return left(new UnauthorizedError());
    }

    const task = Task.create({
      description,
      priority,
      status,
      title,
      directedTo,
      id: generateCustomId("TSK"),
    });

    await this.tasksRepository.create(task);

    await this.cacheTasksRepository.create(task);

    return right(null);
  }
}
