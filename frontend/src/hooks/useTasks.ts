import { api } from "../lib/api";
import type { TaskStatus } from "../pages/Task";

export const useTasks = () => {
  const getTasks = async (page: number, filter: "ALL" | TaskStatus | "MY") => {
    let url: string;

    if (filter === "ALL") {
      url = `/task?page=${page}`;
    } else if (filter === "COMPLETED") {
      url = `/task/completed?page=${page}`;
    } else if (filter === "PENDING") {
      url = `/task/pending?page=${page}`;
    } else {
      url = `/task/user?page=${page}`;
    }

    try {
      const tasks = await api.get(url);

      return {
        status: tasks.status,
        tasks: tasks.data.tasks,
        totalPages: tasks.data.totalPages,
      };
    } catch (error: any) {
      return {
        status: error.status,
        message: error.response.data,
      };
    }
  };

  const getTaskById = async (taskId: string) => {
    try {
      const task = await api.get(`/task/${taskId}`);

      return {
        task: task.data.task,
        status: task.status,
      };
    } catch (error: any) {
      return {
        status: error.status,
        message: error.response.data,
      };
    }
  };

  const completeTaskById = async (taskId: string) => {
    try {
      const task = await api.patch(`/task/${taskId}`);

      return {
        status: task.status,
      };
    } catch (error: any) {
      return {
        status: error.status,
        message: error.response.data,
      };
    }
  };

  return { getTasks, getTaskById, completeTaskById };
};
