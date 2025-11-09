import { right, type Either } from "@/core/either";
import type { TasksRepository } from "../repositories/tasks-repository";
import type { Task } from "@/domain/entities/task";

interface FetchCompletedTasksUseCaseRequest {
  page: number;
  groupId: string;
}

type FetchCompletedTasksUseCaseResponse = Either<null, { tasks: Task[] }>;

export class FetchCompletedTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    page,
    groupId,
  }: FetchCompletedTasksUseCaseRequest): Promise<FetchCompletedTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.fetchCompletedTasks(groupId, {
      page,
    });

    return right({
      tasks,
    });
  }
}
