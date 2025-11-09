import type { UsersLevelRepository } from "@/domain/application/repositories/users-level-repository";
import { UsersLevel } from "@/domain/entities/users-level";
import { adminDb, userDb } from "../database/my-sql-connection";
import type { RowDataPacket } from "mysql2";

export class MySqlUsersLevelRepository implements UsersLevelRepository {
  async fetchUsersLevel(): Promise<UsersLevel[]> {
    const [rows] = await userDb.execute<RowDataPacket[]>(`SELECT * FROM users`);

    const levels: UsersLevel[] = (rows as RowDataPacket[]).map((row) => {
      return UsersLevel.create({
        id: row["id"],
        role: row["role"],
      });
    });

    return levels;
  }

  async getUserLevelById(id: string): Promise<UsersLevel | null> {
    const [rows] = await adminDb.execute<RowDataPacket[]>(
      `SELECT * FROM users WHERE id =  ?`,
      [id]
    );

    if ((rows as RowDataPacket[]).length === 0) return null;

    const row = rows[0] as RowDataPacket;

    return UsersLevel.create({
      id: row.id,
      role: row.role,
    });
  }
}
