import { right, type Either } from "@/core/either";
import type { TasksRepository } from "../repositories/tasks-repository";
import type { Task } from "@/domain/entities/task";
import type { CacheTasksRepository } from "../repositories/cache/cache-repository";

interface FetchCompletedTasksUseCaseRequest {
  page: number;
  groupId: string;
}

type FetchCompletedTasksUseCaseResponse = Either<
  null,
  { tasks: Task[]; totalPages: number }
>;

export class FetchCompletedTasksUseCase {
  constructor(
    private tasksRepository: TasksRepository,
    private cacheTasksRepository: CacheTasksRepository
  ) {}

  async execute({
    page,
    groupId,
  }: FetchCompletedTasksUseCaseRequest): Promise<FetchCompletedTasksUseCaseResponse> {
    let response = await this.cacheTasksRepository.fetchCompletedTasks(
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

    response = await this.tasksRepository.fetchCompletedTasks(groupId, {
      page,
    });

    return right({
      tasks: response.tasks,
      totalPages: response.totalPages,
    });
  }
}
