
"use client";

import { useState } from "react";
import type { Task } from "../../types/tasks/task";

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => Promise<void>;
}

export default function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isCompleted = task.status === "COMPLETED";

  const priorityLabel =
    task.priority.charAt(0) +
    task.priority.slice(1).toLowerCase();

  const statusLabel = {
    TODO: "To do",
    IN_PROGRESS: "In progress",
    COMPLETED: "Completed",
  }[task.status];

  const handleDelete = async () => {
    setDeleting(true);

    try {
      await onDelete(task);
      setConfirmOpen(false);
    } finally {
      setDeleting(false);
      setMenuOpen(false);
    }
  };

  return (
    <>
      <div
        className={`relative flex items-start gap-3 px-4 py-4 transition hover:bg-black/[0.015] sm:items-center sm:gap-4 sm:px-6 sm:py-5 ${
          menuOpen ? "z-50" : "z-0"
        }`}
      >
        <button
          type="button"
          aria-label={
            isCompleted
              ? `Mark ${task.title} as incomplete`
              : `Complete ${task.title}`
          }
          onClick={() => onToggle(task)}
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition sm:mt-0 ${
            isCompleted
              ? "border-black bg-black"
              : "border-black/20 hover:border-black"
          }`}
        >
          {isCompleted && (
            <span className="text-[10px] text-white">
              ✓
            </span>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <p
            className={`text-sm font-medium leading-5 ${
              isCompleted
                ? "text-black/35 line-through"
                : "text-black"
            }`}
          >
            {task.title}
          </p>

          <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-black/35 sm:text-xs">
            <span>{statusLabel}</span>

            {task.dueDate && (
              <>
                <span>·</span>
                <span>{task.dueDate}</span>
              </>
            )}

            {task.estimatedMinutes && (
              <>
                <span>·</span>
                <span>{task.estimatedMinutes} min</span>
              </>
            )}
          </div>
        </div>

        <span
          className={`hidden rounded-full px-3 py-1 text-[11px] font-medium sm:block ${
            task.priority === "HIGH"
              ? "bg-black/[0.07] text-black"
              : "bg-black/[0.04] text-black/45"
          }`}
        >
          {priorityLabel}
        </span>

        <div className="relative">
          <button
            type="button"
            aria-label={`More options for ${task.title}`}
            onClick={() =>
              setMenuOpen((open) => !open)
            }
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs text-black/35 transition hover:bg-black/[0.05] hover:text-black"
          >
            ···
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-10 z-[100] w-36 overflow-hidden rounded-xl border border-black/[0.08] bg-white p-1 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(task);
                }}
                className="w-full rounded-lg px-3 py-2 text-left text-xs text-black transition hover:bg-black/[0.05]"
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setConfirmOpen(true);
                }}
                className="w-full rounded-lg px-3 py-2 text-left text-xs text-red-500 transition hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {confirmOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm"
          onMouseDown={() => {
            if (!deleting) {
              setConfirmOpen(false);
            }
          }}
        >
          <div
            className="w-full max-w-sm rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            <div className="mb-5">
              <h2 className="text-lg font-semibold tracking-[-0.02em] text-black">
                Delete task?
              </h2>

              <p className="mt-2 text-sm leading-5 text-black/45">
                Are you sure you want to delete{" "}
                <span className="font-medium text-black/70">
                  “{task.title}”
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                disabled={deleting}
                className="flex-1 rounded-full border border-black/[0.08] px-4 py-3 text-xs font-medium text-black/60 transition hover:bg-black/[0.04] hover:text-black disabled:opacity-40"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 rounded-full bg-black px-4 py-3 text-xs font-medium text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

