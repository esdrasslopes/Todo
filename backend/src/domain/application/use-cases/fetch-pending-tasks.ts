import { right, type Either } from "@/core/either";
import type { TasksRepository } from "../repositories/tasks-repository";
import type { Task } from "@/domain/entities/task";
import type { CacheTasksRepository } from "../repositories/cache/cache-repository";

interface FetchPendingTasksUseCaseRequest {
  page: number;
  groupId: string;
}

type FetchPendingTasksUseCaseResponse = Either<
  null,
  { tasks: Task[]; totalPages: number }
>;

export class FetchPendingTasksUseCase {
  constructor(
    private tasksRepository: TasksRepository,
    private cacheTasksRepository: CacheTasksRepository
  ) {}

  async execute({
    page,
    groupId,
  }: FetchPendingTasksUseCaseRequest): Promise<FetchPendingTasksUseCaseResponse> {
    let response = await this.cacheTasksRepository.fetchPendingTasks(groupId, {
      page,
    });

    if (response.tasks.length > 0) {
      return right({
        tasks: response.tasks,
        totalPages: response.totalPages,
      });
    }

    response = await this.tasksRepository.fetchPendingTasks(groupId, {
      page,
    });

    return right({
      tasks: response.tasks,
      totalPages: response.totalPages,
    });
  }
}
