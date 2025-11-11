import { right, type Either } from "@/core/either";
import type { TasksRepository } from "../repositories/tasks-repository";
import type { Task } from "@/domain/entities/task";

interface FetchAllTasksOfOneGroupUseCaseRequest {
  page: number;
  groupId: string;
}

type FetchAllTasksOfOneGroupUseCaseResponse = Either<null, { tasks: Task[] }>;

export class FetchAllTasksOfOneGroupUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    page,
    groupId,
  }: FetchAllTasksOfOneGroupUseCaseRequest): Promise<FetchAllTasksOfOneGroupUseCaseResponse> {
    const tasks = await this.tasksRepository.fetchAllTasksOfOneGroup(groupId, {
      page,
    });

    return right({
      tasks,
    });
  }
}
