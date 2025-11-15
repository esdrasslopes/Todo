import { right, type Either } from "@/core/either";
import type { TasksRepository } from "../repositories/tasks-repository";
import type { Task } from "@/domain/entities/task";
import type { CacheTasksRepository } from "../repositories/cache/cache-repository";

interface FetchCompletedTasksByUserUseCaseRequest {
  page: number;
  userId: string;
  groupId: string;
}

type FetchCompletedTasksByUserUseCaseResponse = Either<
  null,
  { tasks: Task[]; totalPages: number }
>;

export class FetchCompletedTasksByUserUseCase {
  constructor(
    private tasksRepository: TasksRepository,
    private cacheTasksRepository: CacheTasksRepository
  ) {}

  async execute({
    userId,
    page,
    groupId,
  }: FetchCompletedTasksByUserUseCaseRequest): Promise<FetchCompletedTasksByUserUseCaseResponse> {
    let response = await this.cacheTasksRepository.fetchCompletedTasksByUser(
      userId,
      groupId,
      {
        page,
      }
    );

    if (response.tasks.length > 0) {
      return right({
        tasks: response.tasks,
        totalPages: response.totalPages,
      });
    }

    response = await this.tasksRepository.fetchCompletedTasksByUser(
      userId,
      groupId,
      {
        page,
      }
    );

    return right({
      tasks: response.tasks,
      totalPages: response.totalPages,
    });
  }
}
