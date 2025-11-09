import { Entity } from "@/core/entities/entity";
import type { Optional } from "@/core/types/optional";

export interface TaskProps {
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
}

export class Task extends Entity<TaskProps> {
  get title() {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;

    this.touch();
  }

  get description(): string | undefined | null {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;

    this.touch();
  }

  get status() {
    return this.props.status;
  }

  set status(newStatus: "PENDING" | "COMPLETED") {
    this.props.status = newStatus;

    this.touch();
  }

  get priority() {
    return this.props.priority;
  }

  set priority(priority: "LOW" | "HIGH") {
    this.props.priority = priority;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get completedAt() {
    return this.props.completedAt;
  }

  set completedAt(date: Date | undefined | null) {
    this.completedAt = date;

    this.complete();
  }

  get id() {
    return this.props.id;
  }

  get completedBy(): undefined | string | null {
    return this.props.completedBy;
  }

  set completedBy(completedBy: string | null) {
    this.props.completedBy = completedBy;

    this.complete();
  }

  get directedTo() {
    return this.props.directedTo;
  }

  private complete() {
    this.props.completedAt = new Date();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(props: Optional<TaskProps, "createdAt" | "completedAt">) {
    const task = new Task({
      ...props,
      createdAt: props.completedAt ?? new Date(),
    });

    return task;
  }
}
