import AppLayout from "../../components/layout/AppLayout";

const goals = [
  {
    title: "Build LifeOS",
    category: "Personal",
    progress: 72,
    deadline: "Dec 20",
  },
  {
    title: "Complete degree project",
    category: "University",
    progress: 48,
    deadline: "Nov 12",
  },
  {
    title: "Save $5,000,000",
    category: "Finance",
    progress: 34,
    deadline: "Dec 31",
  },
  {
    title: "Improve English",
    category: "Learning",
    progress: 65,
    deadline: "Jan 15",
  },
];

export default function GoalsPage() {
  return (
    <AppLayout>
      <section>
        <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8 sm:items-end">
          <div className="min-w-0">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-black/35 sm:text-xs">
              Workspace
            </p>

            <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Goals
            </h1>

            <p className="mt-2 text-sm leading-5 text-black/45">
              Turn long-term priorities into measurable progress.
            </p>
          </div>

          <button className="shrink-0 rounded-full bg-black px-4 py-2.5 text-xs font-medium text-white transition hover:bg-black/80 sm:px-5">
            <span className="sm:hidden">+</span>
            <span className="hidden sm:inline">New goal</span>
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
            <p className="text-xs text-black/40">
              Active goals
            </p>

            <p className="mt-3 text-2xl font-semibold tracking-tight">
              4
            </p>
          </div>

          <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
            <p className="text-xs text-black/40">
              Average progress
            </p>

            <p className="mt-3 text-2xl font-semibold tracking-tight">
              55%
            </p>
          </div>

          <div className="rounded-2xl border border-black/[0.06] bg-white p-5">
            <p className="text-xs text-black/40">
              Due soon
            </p>

            <p className="mt-3 text-2xl font-semibold tracking-tight">
              2
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {goals.map((goal) => (
            <article
              key={goal.title}
              className="rounded-2xl border border-black/[0.06] bg-white p-5 transition hover:border-black/[0.1] sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {goal.title}
                  </p>

                  <p className="mt-1 text-xs text-black/35">
                    {goal.category}
                  </p>
                </div>

                <button
                  aria-label={`More options for ${goal.title}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg leading-none text-black/25 transition hover:bg-black/[0.05] hover:text-black"
                >
                  ···
                </button>
              </div>

              <div className="mt-8">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-black/35">
                    Progress
                  </span>

                  <span className="text-sm font-semibold">
                    {goal.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-black/[0.05]">
                  <div
                    className="h-full rounded-full bg-black transition-all"
                    style={{
                      width: `${goal.progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-black/[0.05] pt-4">
                <span className="text-[11px] text-black/30">
                  Deadline
                </span>

                <span className="text-xs font-medium text-black/60">
                  {goal.deadline}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}