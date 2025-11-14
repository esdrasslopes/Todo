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

export interface Tasks {
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
