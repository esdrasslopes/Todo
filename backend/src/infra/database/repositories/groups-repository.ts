import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { Optional } from "@/core/types/optional";
import type { GroupsRepository } from "@/domain/application/repositories/groups-repository";
import { UserGroup, type UserGroupProps } from "@/domain/entities/user-group";
import { userDb } from "../database/my-sql-connection";
import type { RowDataPacket } from "mysql2";

export class MySqlGroupsRepository implements GroupsRepository {
  async fetchGroups({ page }: PaginationParams): Promise<UserGroup[]> {
    const [rows] = await userDb.execute<RowDataPacket[]>(
      `SELECT * FROM users_group`
    );

    const groups: UserGroup[] = (rows as RowDataPacket[]).map((row) => {
      return UserGroup.create({
        id: row["id"],
        groupName: row["group_name"],
      });
    });

    return groups.slice((page - 1) * 20, page * 20);
  }

  async findByGroupName(groupName: string): Promise<UserGroup | null> {
    const [rows] = await userDb.execute<RowDataPacket[]>(
      `SELECT * FROM users_group WHERE group_name = ?`,
      [groupName]
    );

    if ((rows as RowDataPacket[]).length === 0) return null;

    const row = rows[0] as RowDataPacket;

    const group: UserGroupProps = {
      groupName: row.group_name,
      id: row.id,
    };

    return UserGroup.create(group);
  }

  async create(userGroup: Optional<UserGroupProps, "id">): Promise<void> {
    await userDb.execute(
      `INSERT INTO users_group (group_name) 
           VALUES (?)`,
      [userGroup.groupName]
    );
  }
}
