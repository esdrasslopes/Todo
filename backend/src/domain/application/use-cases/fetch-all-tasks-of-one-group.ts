import { right, type Either } from "@/core/either";
import type { TasksRepository } from "../repositories/tasks-repository";
import type { Task } from "@/domain/entities/task";
import type { CacheTasksRepository } from "../repositories/cache/cache-repository";

interface FetchAllTasksOfOneGroupUseCaseRequest {
  page: number;
  groupId: string;
}

type FetchAllTasksOfOneGroupUseCaseResponse = Either<null, { tasks: Task[] }>;

export class FetchAllTasksOfOneGroupUseCase {
  constructor(
    private tasksRepository: TasksRepository,
    private cacheTasksRepository: CacheTasksRepository
  ) {}

  async execute({
    page,
    groupId,
  }: FetchAllTasksOfOneGroupUseCaseRequest): Promise<FetchAllTasksOfOneGroupUseCaseResponse> {
    let tasks = await this.cacheTasksRepository.findByGroupId(groupId, {
      page,
    });

    if (tasks.length > 0) {
      return right({
        tasks,
      });
    }

    tasks = await this.tasksRepository.fetchAllTasksOfOneGroup(groupId, {
      page,
    });

    return right({
      tasks,
    });
  }
}
