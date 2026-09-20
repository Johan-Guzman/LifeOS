
"use client";

import { useMemo, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import TaskFilters, {
  type TaskFilter,
} from "../../components/tasks/TaskFilters";
import TaskList from "../../components/tasks/TaskList";
import TaskModal from "../../components/tasks/TaskModal";
import { useTasks } from "../../hooks/tasks/useTasks";
import type { Task } from "../../types/tasks/task";

export default function TasksPage() {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [editingTask, setEditingTask] =
    useState<Task | null>(null);

  const [filter, setFilter] =
    useState<TaskFilter>("ALL");

  const [modalOpen, setModalOpen] =
    useState(false);

  const filteredTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return tasks.filter((task) => {
      if (filter === "ALL") {
        return true;
      }

      if (!task.dueDate) {
        return false;
      }

      const dueDate = new Date(
        `${task.dueDate}T00:00:00`
      );

      dueDate.setHours(0, 0, 0, 0);

      if (filter === "TODAY") {
        return dueDate.getTime() === today.getTime();
      }

      return dueDate.getTime() > today.getTime();
    });
  }, [tasks, filter]);

  const handleToggleTask = async (task: Task) => {
    await updateTask(task.id, {
      title: task.title,
      description:
        task.description ?? undefined,
      status:
        task.status === "COMPLETED"
          ? "TODO"
          : "COMPLETED",
      priority: task.priority,
      estimatedMinutes:
        task.estimatedMinutes ?? undefined,
      dueDate: task.dueDate ?? undefined,
    });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = async (task: Task) => {  
  await deleteTask(task.id);
};

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  return (
    <AppLayout>
      <section>
        <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8 sm:items-end">
          <div className="min-w-0">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-black/35 sm:text-xs">
              Workspace
            </p>

            <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Tasks
            </h1>

            <p className="mt-2 max-w-md text-sm leading-5 text-black/45">
              Keep track of what needs to get done.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setEditingTask(null);
              setModalOpen(true);
            }}
            className="shrink-0 rounded-full bg-black px-4 py-2.5 text-xs font-medium text-white transition hover:bg-black/80 sm:px-5"
          >
            <span className="sm:hidden">+</span>

            <span className="hidden sm:inline">
              New task
            </span>
          </button>
        </div>

        <TaskFilters
          activeFilter={filter}
          onFilterChange={setFilter}
        />

        {loading && (
          <div className="rounded-2xl border border-black/[0.06] bg-white px-6 py-10 text-center text-sm text-black/35">
            Loading tasks...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-black/[0.06] bg-white px-6 py-10 text-center text-sm text-black/45">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <TaskList
              tasks={filteredTasks}
              onToggle={handleToggleTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />

            <div className="mt-5 flex items-center justify-between px-1">
              <p className="text-xs text-black/30">
                {filteredTasks.length}{" "}
                {filteredTasks.length === 1
                  ? "task"
                  : "tasks"}
              </p>

              <button
                type="button"
                className="text-xs text-black/40 transition hover:text-black"
              >
                Manage
              </button>
            </div>
          </>
        )}

        <TaskModal
          open={
            modalOpen ||
            editingTask !== null
          }
          task={editingTask}
          onClose={handleCloseModal}
          onCreate={createTask}
          onUpdate={updateTask}
        />
      </section>
    </AppLayout>
  );
}

