"use client";

export type TaskFilter = "ALL" | "TODAY" | "UPCOMING";

interface TaskFiltersProps {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

const filters: {
  value: TaskFilter;
  label: string;
}[] = [
  {
    value: "ALL",
    label: "All",
  },
  {
    value: "TODAY",
    label: "Today",
  },
  {
    value: "UPCOMING",
    label: "Upcoming",
  },
];

export default function TaskFilters({
  activeFilter,
  onFilterChange,
}: TaskFiltersProps) {
  return (
    <div className="-mx-1 mb-5 flex gap-1 overflow-x-auto px-1 pb-1">
      {filters.map((filter) => {
        const active = activeFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs transition ${
              active
                ? "bg-black font-medium text-white"
                : "text-black/45 hover:bg-black/[0.05] hover:text-black"
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}