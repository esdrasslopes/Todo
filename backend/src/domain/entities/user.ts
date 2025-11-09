import { Entity } from "../../core/entities/entity";

export interface UserProps {
  id: string;
  userGroupId: string;
  userLevelId: string;
  email: string;
  password: string;
  name: string;
}

export class User extends Entity<UserProps> {
  get userGroupId() {
    return this.props.userGroupId;
  }

  get userLevelId() {
    return this.props.userLevelId;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get name() {
    return this.props.name;
  }

  get id() {
    return this.props.id;
  }

  static create(props: UserProps) {
    const user = new User({
      ...props,
    });

    return user;
  }
}
