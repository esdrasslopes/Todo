import { left, right, type Either } from "@/core/either";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import type { TasksRepository } from "../repositories/tasks-repository";
import type { Task } from "@/domain/entities/task";

interface GetTaskByIdUseCaseRequest {
  taskId: string;
}

type GetTaskByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    task: Task;
  }
>;

export class GetTaskByIdUseCase {
  private tasksRepository: TasksRepository;

  constructor(tasksRepository: TasksRepository) {
    this.tasksRepository = tasksRepository;
  }

  async execute({
    taskId,
  }: GetTaskByIdUseCaseRequest): Promise<GetTaskByIdUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId);

    if (!task) {
      return left(new ResourceNotFoundError());
    }

    return right({
      task,
    });
  }
}
