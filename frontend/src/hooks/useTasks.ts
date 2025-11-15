import { api } from "../lib/api";
import type { TaskStatus } from "../pages/Task";
import type { CreateTaskForm, EditTaskForm } from "../types";

type Filter = "ALLGROUP" | TaskStatus | "MY" | "ALL" | "HIGH" | "LOW";

export const useTasks = () => {
  const getTasks = async (page: number, filter: Filter) => {
    let url: string;

    switch (filter) {
      case "ALL":
        url = `/task/all?page=${page}`;
        break;
      case "ALLGROUP":
        url = `/task?page=${page}`;
        break;
      case "COMPLETED":
        url = `/task/completed?page=${page}`;
        break;
      case "PENDING":
        url = `/task/pending?page=${page}`;
        break;
      case "MY":
        url = `/task/user?page=${page}`;
        break;
      case "HIGH":
        url = `/task/high?page=${page}`;
        break;
      case "LOW":
        url = `/task/low?page=${page}`;
        break;
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

  const createTask = async (data: CreateTaskForm) => {
    try {
      const task = await api.post("/task", {
        ...data,
      });

      if (task.status === 201) {
        return {
          status: task.status,
        };
      }
    } catch (error: any) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  };

  const editTask = async (data: EditTaskForm, taskId: string) => {
    try {
      const task = await api.put(`/task/${taskId}`, {
        ...data,
      });

      if (task.status === 201) {
        return {
          status: task.status,
        };
      }
    } catch (error: any) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const taskDeleted = await api.delete(`/task/${taskId}`);

      if (taskDeleted.status === 200) {
        return {
          status: taskDeleted.status,
        };
      }
    } catch (error: any) {
      return {
        status: error.status,
        message: error.message,
      };
    }
  };

  return {
    getTasks,
    getTaskById,
    completeTaskById,
    createTask,
    editTask,
    deleteTask,
  };
};
