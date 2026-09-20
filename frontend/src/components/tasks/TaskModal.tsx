
"use client";

import { FormEvent, useEffect, useState } from "react";
import type {
  CreateTaskRequest,
  UpdateTaskRequest,
} from "../../services/tasks/taskService";
import type { Task } from "../../types/tasks/task";

interface TaskModalProps {
  open: boolean;
  task?: Task | null;
  onClose: () => void;
  onCreate: (data: CreateTaskRequest) => Promise<void>;
  onUpdate: (
    id: number,
    data: UpdateTaskRequest
  ) => Promise<void>;
}

export default function TaskModal({
  open,
  task,
  onClose,
  onCreate,
  onUpdate,
}: TaskModalProps) {
  const isEditing = Boolean(task);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] =
    useState<Task["status"]>("TODO");
  const [priority, setPriority] =
    useState<Task["priority"]>("MEDIUM");
  const [estimatedMinutes, setEstimatedMinutes] =
    useState("");
  const [dueDate, setDueDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    if (task) {
      setTitle(task.title);
      setDescription(task.description ?? "");
      setStatus(task.status);
      setPriority(task.priority);
      setEstimatedMinutes(
        task.estimatedMinutes?.toString() ?? ""
      );
      setDueDate(task.dueDate ?? "");
    } else {
      setTitle("");
      setDescription("");
      setStatus("TODO");
      setPriority("MEDIUM");
      setEstimatedMinutes("");
      setDueDate("");
    }

    setError("");
  }, [open, task]);

  if (!open) {
    return null;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const data = {
        title: title.trim(),
        description:
          description.trim() || undefined,
        status,
        priority,
        estimatedMinutes: estimatedMinutes
          ? Number(estimatedMinutes)
          : undefined,
        dueDate: dueDate || undefined,
      };

      if (task) {
        await onUpdate(task.id, data);
      } else {
        await onCreate(data);
      }

      onClose();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to save task"
      );
    } finally {
      setSaving(false);
    }
  }

  function handleClose() {
    if (saving) {
      return;
    }

    setError("");
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/20 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={handleClose}
    >
      <div
        className="w-full max-w-lg rounded-t-3xl border border-black/[0.06] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.15)] sm:rounded-3xl sm:p-6"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-[-0.02em]">
              {isEditing ? "Edit task" : "New task"}
            </h2>

            <p className="mt-1 text-xs text-black/40">
              {isEditing
                ? "Update your task."
                : "Add something you want to get done."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={saving}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-lg text-black/30 transition hover:bg-black/[0.05] hover:text-black disabled:opacity-30"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="task-title"
              className="mb-1.5 block text-xs font-medium text-black/60"
            >
              Title
            </label>

            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="What needs to get done?"
              autoFocus
              className="w-full rounded-xl border border-black/[0.08] bg-[#f5f5f7] px-3.5 py-3 text-sm outline-none transition placeholder:text-black/25 focus:border-black/20 focus:bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="task-description"
              className="mb-1.5 block text-xs font-medium text-black/60"
            >
              Description
            </label>

            <textarea
              id="task-description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Add some context..."
              rows={3}
              className="w-full resize-none rounded-xl border border-black/[0.08] bg-[#f5f5f7] px-3.5 py-3 text-sm outline-none transition placeholder:text-black/25 focus:border-black/20 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="task-status"
                className="mb-1.5 block text-xs font-medium text-black/60"
              >
                Status
              </label>

              <select
                id="task-status"
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value as Task["status"]
                  )
                }
                className="w-full appearance-none rounded-xl border border-black/[0.08] bg-[#f5f5f7] px-3.5 py-3 text-sm outline-none transition focus:border-black/20 focus:bg-white"
              >
                <option value="TODO">To do</option>
                <option value="IN_PROGRESS">
                  In progress
                </option>
                <option value="COMPLETED">
                  Completed
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="task-priority"
                className="mb-1.5 block text-xs font-medium text-black/60"
              >
                Priority
              </label>

              <select
                id="task-priority"
                value={priority}
                onChange={(event) =>
                  setPriority(
                    event.target.value as Task["priority"]
                  )
                }
                className="w-full appearance-none rounded-xl border border-black/[0.08] bg-[#f5f5f7] px-3.5 py-3 text-sm outline-none transition focus:border-black/20 focus:bg-white"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="task-duration"
                className="mb-1.5 block text-xs font-medium text-black/60"
              >
                Estimated time
              </label>

              <input
                id="task-duration"
                type="number"
                min="1"
                value={estimatedMinutes}
                onChange={(event) =>
                  setEstimatedMinutes(event.target.value)
                }
                placeholder="Minutes"
                className="w-full rounded-xl border border-black/[0.08] bg-[#f5f5f7] px-3.5 py-3 text-sm outline-none transition placeholder:text-black/25 focus:border-black/20 focus:bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="task-due-date"
                className="mb-1.5 block text-xs font-medium text-black/60"
              >
                Due date
              </label>

              <input
                id="task-due-date"
                type="date"
                value={dueDate}
                onChange={(event) =>
                  setDueDate(event.target.value)
                }
                className="w-full rounded-xl border border-black/[0.08] bg-[#f5f5f7] px-3.5 py-3 text-sm outline-none transition focus:border-black/20 focus:bg-white"
              />
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500">
              {error}
            </p>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={saving}
              className="flex-1 rounded-full border border-black/[0.08] px-4 py-3 text-xs font-medium text-black/60 transition hover:bg-black/[0.04] hover:text-black disabled:opacity-40"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-full bg-black px-4 py-3 text-xs font-medium text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : isEditing
                  ? "Save changes"
                  : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

