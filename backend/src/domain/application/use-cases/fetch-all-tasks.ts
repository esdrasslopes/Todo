import { right, type Either } from "@/core/either";
import type { TasksRepository } from "../repositories/tasks-repository";
import type { Task } from "@/domain/entities/task";

interface FetchAllTasksUseCaseRequest {
  page: number;
}

type FetchAllTasksUseCaseResponse = Either<null, { tasks: Task[] }>;

export class FetchAllTasksUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    page,
  }: FetchAllTasksUseCaseRequest): Promise<FetchAllTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.fetchAllTasks({
      page,
    });

    return right({
      tasks,
    });
  }
}
