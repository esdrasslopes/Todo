import { right, type Either } from "@/core/either";
import type { TasksRepository } from "../repositories/tasks-repository";
import type { Task } from "@/domain/entities/task";

interface FetchPendingTasksUseCaseRequest {
  page: number;
  groupId: string;
}

type FetchPendingTasksUseCaseResponse = Either<
  null,
  { tasks: Task[]; totalPages: number }
>;

export class FetchPendingTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    page,
    groupId,
  }: FetchPendingTasksUseCaseRequest): Promise<FetchPendingTasksUseCaseResponse> {
    const response = await this.tasksRepository.fetchPendingTasks(groupId, {
      page,
    });

    return right({
      tasks: response.tasks,
      totalPages: response.totalPages,
    });
  }
}
