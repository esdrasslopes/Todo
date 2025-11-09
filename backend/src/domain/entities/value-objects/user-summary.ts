import { ValueObject } from "@/core/entities/value-object";

export interface UserSummaryProps {
  userName: string;
  groupName: string;
  finishedTasks: number;
}

export class UserSummary extends ValueObject<UserSummaryProps> {
  get userName() {
    return this.props.userName;
  }

  get groupName() {
    return this.props.groupName;
  }

  get finishedTasks() {
    return this.props.finishedTasks;
  }

  static create(props: UserSummaryProps) {
    return new UserSummary(props);
  }
}
