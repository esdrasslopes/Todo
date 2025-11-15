import type { Optional } from "@/core/types/optional";
import type { UsersRepository } from "@/domain/application/repositories/users-repository";
import { type UserProps, User } from "@/domain/entities/user";
import { adminDb, userDb } from "../../database/my-sql/my-sql-connection";
import type { RowDataPacket } from "mysql2";
import type { UsersLevelRepository } from "@/domain/application/repositories/users-level-repository";
import { UserSummary } from "@/domain/entities/value-objects/user-summary";
import type { PaginationParams } from "@/core/repositories/pagination-params";

export class MySqlUsersRepository implements UsersRepository {
  constructor(private usersLevelRepository: UsersLevelRepository) {}

  async create(user: Optional<UserProps, "id">): Promise<void> {
    const usersLevel = await this.usersLevelRepository.fetchUsersLevel();

    const userLevel = usersLevel.find((item) => item.role === "USER");

    await adminDb.execute(
      `INSERT INTO user (email, password, name, users_group_id, users_id) 
         VALUES (?, ?, ?, ?, ?)`,
      [user.email, user.password, user.name, user.userGroupId, userLevel?.id]
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await userDb.execute<RowDataPacket[]>(
      `SELECT * FROM user WHERE email = ?`,
      [email]
    );

    if ((rows as RowDataPacket[]).length === 0) return null;

    const row = rows[0] as RowDataPacket;

    const user: UserProps = {
      id: row.id,
      userGroupId: row.users_group_id,
      userLevelId: row.users_id,
      email: row.email,
      password: row.password,
      name: row.name,
    };

    return User.create(user);
  }

  async findById(id: string): Promise<User | null> {
    const [rows] = await userDb.execute<RowDataPacket[]>(
      `SELECT * FROM user WHERE id = ?`,
      [id]
    );

    if ((rows as RowDataPacket[]).length === 0) return null;

    const row = rows[0] as RowDataPacket;

    const user: UserProps = {
      id: row.id,
      userGroupId: row.users_group_id,
      userLevelId: row.users_id,
      email: row.email,
      password: row.password,
      name: row.name,
    };

    return User.create(user);
  }

  async hasPermission(id: string): Promise<boolean> {
    const user = await this.findById(id);

    if (!user) return false;

    const userLevel = await this.usersLevelRepository.getUserLevelById(
      user.userLevelId
    );

    return userLevel?.role === "ADMIN" || false;
  }

  async fetchUsersSummary({ page }: PaginationParams): Promise<{
    summury: UserSummary[];
    totalPages: number;
  }> {
    const [rows] = await adminDb.execute<RowDataPacket[]>(
      `SELECT * FROM view_user_summary`
    );

    if (!rows || (rows as RowDataPacket[]).length === 0) {
      return {
        summury: [],
        totalPages: 0,
      };
    }

    const summary: UserSummary[] = (rows as RowDataPacket[]).map((row) => {
      return UserSummary.create({
        userName: row.nome ?? "",
        groupName: row.grupo ?? "",
        finishedTasks: Number(row.tarefas_concluidas) || 0,
      });
    });

    return {
      summury: summary.slice((page - 1) * 20, page * 20),
      totalPages: Math.ceil(summary.length / 20),
    };
  }
}
