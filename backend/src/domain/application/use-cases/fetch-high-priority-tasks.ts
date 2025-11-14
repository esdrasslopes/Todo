import { left, right, type Either } from "@/core/either";
import type { TasksRepository } from "../repositories/tasks-repository";
import type { Task } from "@/domain/entities/task";
import type { UsersRepository } from "../repositories/users-repository";
import { UnauthorizedError } from "../errors/unauthorized-error";

interface FetchHighPriorityTasksUseCaseRequest {
  page: number;
  requesterId: string;
}

type FetchHighPriorityTasksUseCaseResponse = Either<
  UnauthorizedError,
  { tasks: Task[]; totalPages: number }
>;

export class FetchHighPriorityTasksUseCase {
  constructor(
    private tasksRepository: TasksRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    page,
    requesterId,
  }: FetchHighPriorityTasksUseCaseRequest): Promise<FetchHighPriorityTasksUseCaseResponse> {
    const permission = await this.usersRepository.hasPermission(requesterId);

    if (!permission) {
      return left(new UnauthorizedError());
    }

    const response = await this.tasksRepository.fetchHighPriorityTask({
      page,
    });

    return right({
      tasks: response.tasks,
      totalPages: response.totalPages,
    });
  }
}
