import { Entity } from "../../core/entities/entity";

export interface UserGroupProps {
  id: string;
  groupName: string;
}

export class UserGroup extends Entity<UserGroupProps> {
  get groupName() {
    return this.props.groupName;
  }

  get id() {
    return this.props.id;
  }

  static create(props: UserGroupProps) {
    const userGroup = new UserGroup({
      ...props,
    });

    return userGroup;
  }
}
