import { left, right, type Either } from "@/core/either";
import type { TasksRepository } from "../repositories/tasks-repository";
import type { Task } from "@/domain/entities/task";
import type { UsersRepository } from "../repositories/users-repository";
import { UnauthorizedError } from "../errors/unauthorized-error";

interface FetchAllTasksUseCaseRequest {
  page: number;
  requesterId: string;
}

type FetchAllTasksUseCaseResponse = Either<
  UnauthorizedError,
  { tasks: Task[] }
>;

export class FetchAllTasksUseCase {
  constructor(
    private tasksRepository: TasksRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    page,
    requesterId,
  }: FetchAllTasksUseCaseRequest): Promise<FetchAllTasksUseCaseResponse> {
    const permission = await this.usersRepository.hasPermission(requesterId);

    if (!permission) {
      return left(new UnauthorizedError());
    }

    const tasks = await this.tasksRepository.fetchAllTasks({
      page,
    });

    return right({
      tasks,
    });
  }
}
