import type { Optional } from "@/core/types/optional";
import type { UsersRepository } from "@/domain/application/repositories/users-repository";
import { type UserProps, User } from "@/domain/entities/user";
import type { RowDataPacket } from "mysql2";
import type { UsersLevelRepository } from "@/domain/application/repositories/users-level-repository";
import { UserSummary } from "@/domain/entities/value-objects/user-summary";
import { adminDb, userDb } from "../my-sql/my-sql-connection";

export class MySqlUsersRepository implements UsersRepository {
  constructor(private usersLevelRepository: UsersLevelRepository) {}

  async create(user: Optional<UserProps, "id">): Promise<void> {
    const userLevel = await this.usersLevelRepository.fetchUsersLevel();

    const userLevelId = userLevel.find((item) => item.role === "USER")?.id;

    await userDb.execute(
      `INSERT INTO user (email, password, name, users_group_id, users_id) 
         VALUES (?, ?, ?, ?, ?)`,
      [user.email, user.password, user.name, user.userGroupId, userLevelId]
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
      userGroupId: row.userGroupId,
      userLevelId: row.userLevelId,
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
      userGroupId: row.userGroupId,
      userLevelId: row.userLevelId,
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

  async getUserSummary(): Promise<UserSummary[]> {
    const [rows] = await adminDb.execute<RowDataPacket[]>(
      `SELECT * FROM view_user_summary`
    );

    const summary: UserSummary[] = (rows as RowDataPacket[]).map((row) => {
      return UserSummary.create({
        userName: row.nome,
        groupName: row.grupo,
        finishedTasks: row.tarefas_concluidas,
      });
    });

    return summary;
  }
}
