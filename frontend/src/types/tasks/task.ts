export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "COMPLETED";

export type TaskPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  estimatedMinutes: number | null;
  dueDate: string | null;
  completedAt: string | null;
}