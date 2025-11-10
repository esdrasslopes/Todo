import type { PaginationParams } from "@/core/repositories/pagination-params";
import type { Optional } from "@/core/types/optional";
import type { TasksRepository } from "@/domain/application/repositories/tasks-repository";
import { Task, type TaskProps } from "@/domain/entities/task";
import { userDb, adminDb } from "../database/my-sql-connection";
import type { RowDataPacket } from "mysql2";

export class MySqlTasksRepository implements TasksRepository {
  async findById(id: string): Promise<Task | null> {
    const [rows] = await userDb.execute<RowDataPacket[]>(
      `SELECT * FROM task WHERE id = ?`,
      [id]
    );

    if ((rows as RowDataPacket[]).length === 0) return null;

    const row = rows[0] as RowDataPacket;

    const task: TaskProps = {
      id: row.id,
      title: row.title,
      status: row.status,
      priority: row.priority,
      description: row.description,
      directedTo: row.group_id,
      createdAt: row.created_at,
      completedBy: row.completed_by,
      completedAt: row.completed_at,
      updatedAt: row.updated_at,
    };

    return Task.create(task);
  }

  async create(
    taskProps: Optional<TaskProps, "id" | "createdAt">
  ): Promise<void> {
    await adminDb.execute(
      `INSERT INTO task (title, description, status, priority, group_id) 
           VALUES (?, ?, ?, ?, ?)`,
      [
        taskProps.title,
        taskProps.description,
        taskProps.status,
        taskProps.priority,
        taskProps.directedTo,
      ]
    );
  }

  async completedTask(id: string, completedBy: string): Promise<void> {
    await userDb.execute(`CALL sp_complete_task(?, ?)`, [id, completedBy]);
  }

  async delete(id: string): Promise<void> {
    await adminDb.execute(`DELETE FROM task WHERE id = ?`, [id]);
  }

  async update(task: Task): Promise<void> {
    await adminDb.execute(
      `UPDATE task 
         SET title = ?, description = ?, status = ?, priority = ?
         WHERE id = ?`,
      [task.title, task.description, task.status, task.priority, task.id]
    );
  }

  async fetchCompletedTasks(
    groupId: string,
    { page }: PaginationParams
  ): Promise<Task[]> {
    const [rows] = await userDb.execute<RowDataPacket[]>(
      `CALL sp_fetch_completed_tasks(?, ?, ?)`,
      [groupId, 20, (page - 1) * 20]
    );

    const tasks: Task[] = (rows as RowDataPacket[]).map((row) => {
      return Task.create({
        id: row.id,
        title: row.title,
        description: row.description,
        status: row.status,
        priority: row.priority,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        completedAt: row.completed_at,
        completedBy: row.completed_by,
        directedTo: row.group_id,
      });
    });

    return tasks;
  }

  async fetchCompletedTasksByUser(
    userId: string,
    groupId: string,
    { page }: PaginationParams
  ): Promise<Task[]> {
    const [rows] = await userDb.execute<RowDataPacket[]>(
      `SELECT *
   FROM task
   WHERE group_id = ? 
     AND completed_by = ? 
     AND task.status = "COMPLETED"
   ORDER BY created_at DESC`,
      [groupId, userId]
    );

    const tasks: Task[] = (rows as RowDataPacket[]).map((row) => {
      return Task.create({
        id: row.id,
        title: row.title,
        description: row.description,
        status: row.status,
        priority: row.priority,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        completedAt: row.completed_at,
        completedBy: row.completed_by,
        directedTo: row.group_id,
      });
    });

    return tasks;
  }

  async fetchPendingTasks(
    groupId: string,
    { page }: PaginationParams
  ): Promise<Task[]> {
    const [rows] = await userDb.execute<RowDataPacket[]>(
      `CALL sp_fetch_pending_tasks(?, ?, ?)`,
      [groupId, 20, (page - 1) * 20]
    );

    const tasks: Task[] = (rows as RowDataPacket[]).map((row) => {
      return Task.create({
        id: row.id,
        title: row.title,
        description: row.description,
        status: row.status,
        priority: row.priority,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        completedAt: row.completed_at,
        completedBy: row.completed_by,
        directedTo: row.group_id,
      });
    });

    return tasks.slice((page - 1) * 20, page * 20);
  }

  async fetchAllTasks({ page }: PaginationParams): Promise<Task[]> {
    const [rows] = await adminDb.execute<RowDataPacket[]>(`SELECT * FROM task`);

    const tasks: Task[] = (rows as RowDataPacket[]).map((row) => {
      return Task.create({
        id: row.id,
        title: row.title,
        description: row.description,
        status: row.status,
        priority: row.priority,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        completedAt: row.completed_at,
        completedBy: row.completed_by,
        directedTo: row.group_id,
      });
    });

    return tasks.slice((page - 1) * 20, page * 20);
  }

  async fetchHighPriorityTask({ page }: PaginationParams): Promise<Task[]> {
    const [rows] = await adminDb.execute<RowDataPacket[]>(
      `SELECT * FROM view_high_priority_tasks`
    );

    const tasks: Task[] = (rows as RowDataPacket[]).map((row) => {
      return Task.create({
        id: row.id,
        title: row.title,
        description: row.description,
        status: row.status,
        priority: row.priority,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        completedAt: row.completed_at,
        completedBy: row.completed_by,
        directedTo: row.group_id,
      });
    });
    return tasks.slice((page - 1) * 20, page * 20);
  }
}
