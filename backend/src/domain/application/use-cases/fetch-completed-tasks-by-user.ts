import { right, type Either } from "@/core/either";
import type { TasksRepository } from "../repositories/tasks-repository";
import type { Task } from "@/domain/entities/task";

interface FetchCompletedTasksByUserUseCaseRequest {
  page: number;
  userId: string;
  groupId: string;
}

type FetchCompletedTasksByUserUseCaseResponse = Either<null, { tasks: Task[] }>;

export class FetchCompletedTasksByUserUseCase {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    userId,
    page,
    groupId,
  }: FetchCompletedTasksByUserUseCaseRequest): Promise<FetchCompletedTasksByUserUseCaseResponse> {
    const tasks = await this.tasksRepository.fetchCompletedTasksByUser(
      userId,
      groupId,
      {
        page,
      }
    );

    return right({
      tasks,
    });
  }
}
