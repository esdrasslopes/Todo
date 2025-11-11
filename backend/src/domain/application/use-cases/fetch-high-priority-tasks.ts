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
  { tasks: Task[] }
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

    const tasks = await this.tasksRepository.fetchHighPriorityTask({
      page,
    });

    return right({
      tasks,
    });
  }
}
