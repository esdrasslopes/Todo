import { api } from "../lib/api";
import type { TaskStatus } from "../pages/Task";

export const useTasks = () => {
  const getTasks = async (page: number, filter: "ALL" | TaskStatus) => {
    let url: string;

    if (filter === "ALL") {
      url = `/task?page=${page}`;
    } else if (filter === "COMPLETED") {
      url = `/task/completed?page=${page}`;
    } else {
      url = `/task/pending?page=${page}`;
    }

    try {
      const tasks = await api.get(url);

      console.log(tasks.data.tasks);

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

  return { getTasks };
};
