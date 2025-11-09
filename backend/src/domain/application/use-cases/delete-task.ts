import { left, right, type Either } from "@/core/either";
import type { UsersRepository } from "../repositories/users-repository";
import { UnauthorizedError } from "../errors/unauthorized-error";
import type { TasksRepository } from "../repositories/tasks-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteTaskUseCaseRequest {
  taskId: string;
  requesterId: string;
}

type DeleteTaskUseCaseResponse = Either<
  UnauthorizedError | ResourceNotFoundError,
  null
>;

export class DeleteTaskUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private tasksRepository: TasksRepository
  ) {}

  async execute({
    taskId,
    requesterId,
  }: DeleteTaskUseCaseRequest): Promise<DeleteTaskUseCaseResponse> {
    const permission = this.usersRepository.hasPermission(requesterId);

    if (!permission) {
      return left(new UnauthorizedError());
    }

    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      return left(new ResourceNotFoundError());
    }

    await this.tasksRepository.delete(task.id);

    return right(null);
  }
}
