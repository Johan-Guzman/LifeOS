import { apiFetch } from "../../lib/api";
import type { Task } from "../../types/tasks/task";

export interface CreateTaskRequest {
  title: string;
  description?: string;
  status?: Task["status"];
  priority?: Task["priority"];
  estimatedMinutes?: number;
  dueDate?: string;
}

export type UpdateTaskRequest = CreateTaskRequest;

export const taskService = {
  getAll: () => {
    return apiFetch<Task[]>("/api/tasks");
  },

  getById: (id: number) => {
    return apiFetch<Task>(`/api/tasks/${id}`);
  },

  create: (data: CreateTaskRequest) => {
    return apiFetch<Task>("/api/tasks", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: (id: number, data: UpdateTaskRequest) => {
    return apiFetch<Task>(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: (id: number) => {
    return apiFetch<void>(`/api/tasks/${id}`, {
      method: "DELETE",
    });
  },
};