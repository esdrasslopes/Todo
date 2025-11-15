export interface UserAuthenticate {
  email: string;
  password: string;
}

export interface createUser {
  groupId: string;
  email: string;
  password: string;
  name: string;
}

export interface UsersGroups {
  props: {
    id: string;
    groupName: string;
  };
}

export interface Task {
  props: {
    id: string;
    title: string;
    description?: string | null;
    status: "PENDING" | "COMPLETED";
    priority: "LOW" | "HIGH";
    directedTo: string;
    createdAt: Date;
    updatedAt?: Date | null;
    completedAt?: Date | null;
    completedBy?: string | null;
  };
}

export interface CreateTaskForm {
  title: string;
  description: string;
  status: "PENDING" | "COMPLETED";
  priority: "HIGH" | "LOW";
  directedTo: string;
}

export interface EditTaskForm {
  title: string;
  description?: string | null;
  status: "PENDING" | "COMPLETED";
  priority: "HIGH" | "LOW";
}

export interface UsersSummary {
  props: {
    id: string;
    userName: string;
    groupName: "ADMIN" | "MANAGER" | "USER";
    finishedTasks: number;
  };
}
