
"use client";

import { useCallback, useEffect, useState } from "react";
import { taskService } from "../../services/tasks/taskService";
import type {
  CreateTaskRequest,
  UpdateTaskRequest,
} from "../../services/tasks/taskService";
import type { Task } from "../../types/tasks/task";

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  createTask: (data: CreateTaskRequest) => Promise<Task>;
  updateTask: (
    id: number,
    data: UpdateTaskRequest
  ) => Promise<Task>;
  deleteTask: (id: number) => Promise<void>;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await taskService.getAll();

      setTasks(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load tasks"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const createTask = useCallback(
    async (data: CreateTaskRequest) => {
      const newTask = await taskService.create(data);

      setTasks((currentTasks) => [
        newTask,
        ...currentTasks,
      ]);

      return newTask;
    },
    []
  );

  const updateTask = useCallback(
    async (
      id: number,
      data: UpdateTaskRequest
    ) => {
      const updatedTask =
        await taskService.update(id, data);

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id
            ? updatedTask
            : task
        )
      );

      return updatedTask;
    },
    []
  );

  const deleteTask = useCallback(
    async (id: number) => {
      await taskService.delete(id);

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task.id !== id
        )
      );
    },
    []
  );

  return {
    tasks,
    loading,
    error,
    reload: loadTasks,
    createTask,
    updateTask,
    deleteTask,
  };
}

