
import type { Task } from "../../types/tasks/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (task: Task) => Promise<void>;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => Promise<void>;
}

export default function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-black/[0.06] bg-white px-6 py-12 text-center">
        <p className="text-sm font-medium text-black">
          No tasks yet
        </p>

        <p className="mt-1 text-xs text-black/35">
          Create your first task to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-black/[0.06] bg-white">
      <div className="divide-y divide-black/[0.05]">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

