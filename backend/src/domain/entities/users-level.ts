import { Entity } from "../../core/entities/entity";

export interface UsersLevelProps {
  id: string;
  role: "ADMIN" | "USER";
}

export class UsersLevel extends Entity<UsersLevelProps> {
  get role() {
    return this.props.role;
  }

  get id() {
    return this.props.id;
  }

  static create(props: UsersLevelProps) {
    const users = new UsersLevel({
      ...props,
    });

    return users;
  }
}
