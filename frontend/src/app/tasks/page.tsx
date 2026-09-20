import AppLayout from "../../components/layout/AppLayout";

const tasks = [
  {
    title: "Complete project documentation",
    category: "University",
    priority: "High",
    status: "Today",
  },
  {
    title: "Review backend architecture",
    category: "LifeOS",
    priority: "Medium",
    status: "Today",
  },
  {
    title: "Study DevOps",
    category: "University",
    priority: "Medium",
    status: "Tomorrow",
  },
];

export default function TasksPage() {
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

          <button className="shrink-0 rounded-full bg-black px-4 py-2.5 text-xs font-medium text-white transition hover:bg-black/80 sm:px-5">
            <span className="sm:hidden">+</span>
            <span className="hidden sm:inline">New task</span>
          </button>
        </div>

        <div className="mb-5 -mx-1 flex gap-1 overflow-x-auto px-1 pb-1">
          <button className="shrink-0 rounded-full bg-black px-4 py-2 text-xs font-medium text-white">
            All
          </button>

          <button className="shrink-0 rounded-full px-4 py-2 text-xs text-black/45 transition hover:bg-black/[0.05] hover:text-black">
            Today
          </button>

          <button className="shrink-0 rounded-full px-4 py-2 text-xs text-black/45 transition hover:bg-black/[0.05] hover:text-black">
            Upcoming
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
          <div className="divide-y divide-black/[0.05]">
            {tasks.map((task) => (
              <div
                key={task.title}
                className="flex items-start gap-3 px-4 py-4 transition hover:bg-black/[0.015] sm:items-center sm:gap-4 sm:px-6 sm:py-5"
              >
                <button
                  aria-label={`Complete ${task.title}`}
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/20 transition hover:border-black sm:mt-0"
                />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-5 text-black">
                    {task.title}
                  </p>

                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-black/35 sm:text-xs">
                    <span>{task.category}</span>
                    <span>·</span>
                    <span>{task.status}</span>
                  </div>
                </div>

                <span
                  className={`hidden rounded-full px-3 py-1 text-[11px] font-medium sm:block ${
                    task.priority === "High"
                      ? "bg-black/[0.07] text-black"
                      : "bg-black/[0.04] text-black/45"
                  }`}
                >
                  {task.priority}
                </span>

                <button
                  aria-label={`More options for ${task.title}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg leading-none text-black/25 transition hover:bg-black/[0.05] hover:text-black"
                >
                  ···
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between px-1">
          <p className="text-xs text-black/30">
            3 tasks
          </p>

          <button className="text-xs text-black/40 transition hover:text-black">
            Manage
          </button>
        </div>
      </section>
    </AppLayout>
  );
}