import { left, right, type Either } from "@/core/either";
import type { UsersRepository } from "../repositories/users-repository";
import { UnauthorizedError } from "../errors/unauthorized-error";
import type { TasksRepository } from "../repositories/tasks-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

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
    private tasksRepository: TasksRepository
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

    console.log(permission);

    if (!permission) {
      return left(new UnauthorizedError());
    }

    await this.tasksRepository.create({
      description,
      priority,
      status,
      title,
      directedTo,
    });

    return right(null);
  }
}
