import AppLayout from "../../components/layout/AppLayout";

const schedule = [
  {
    time: "08:00",
    duration: "1h",
    title: "Morning routine",
    type: "Habit",
  },
  {
    time: "09:00",
    duration: "2h",
    title: "Complete project documentation",
    type: "Task",
  },
  {
    time: "11:30",
    duration: "1h",
    title: "Study DevOps",
    type: "Task",
  },
  {
    time: "14:00",
    duration: "1h 30m",
    title: "Work on LifeOS",
    type: "Project",
  },
  {
    time: "16:00",
    duration: "1h",
    title: "Free time",
    type: "Available",
  },
];

export default function PlanningPage() {
  return (
    <AppLayout>
      <section>
        <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8 sm:items-end">
          <div className="min-w-0">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-black/35 sm:text-xs">
              Intelligence
            </p>

            <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Planning
            </h1>

            <p className="mt-2 max-w-lg text-sm leading-5 text-black/45">
              Turn your priorities into a plan for the day.
            </p>
          </div>

          <button className="shrink-0 rounded-full bg-black px-4 py-2.5 text-xs font-medium text-white transition hover:bg-black/80 sm:px-5">
            <span className="sm:hidden">Plan</span>
            <span className="hidden sm:inline">Generate plan</span>
          </button>
        </div>

        <div className="mb-6 rounded-2xl border border-black/[0.06] bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-black/40">
                Today
              </p>

              <h2 className="mt-1 text-lg font-semibold tracking-tight">
                Monday, September 21
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.06] text-sm text-black/40 transition hover:bg-black/[0.04]">
                ‹
              </button>

              <button className="rounded-full bg-black/[0.05] px-4 py-2 text-xs font-medium">
                Today
              </button>

              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.06] text-sm text-black/40 transition hover:bg-black/[0.04]">
                ›
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
            <div className="border-b border-black/[0.05] px-5 py-4 sm:px-6">
              <h2 className="text-sm font-semibold">
                Suggested schedule
              </h2>

              <p className="mt-1 text-xs text-black/35">
                Based on your priorities and available time.
              </p>
            </div>

            <div className="divide-y divide-black/[0.05]">
              {schedule.map((item) => (
                <div
                  key={`${item.time}-${item.title}`}
                  className="flex gap-3 px-4 py-5 transition hover:bg-black/[0.015] sm:gap-5 sm:px-6"
                >
                  <div className="w-11 shrink-0 pt-0.5 sm:w-14">
                    <span className="text-[11px] font-medium text-black/35 sm:text-xs">
                      {item.time}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1 border-l border-black/[0.07] pl-4 sm:pl-5">
                    <p className="text-sm font-medium">
                      {item.title}
                    </p>

                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-black/35 sm:text-xs">
                      <span>{item.type}</span>
                      <span>·</span>
                      <span>{item.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-black/[0.06] bg-white p-5 sm:p-6">
            <div>
              <h2 className="text-sm font-semibold">
                Planning context
              </h2>

              <p className="mt-1 text-xs leading-5 text-black/35">
                LifeOS uses your information to understand how your day
                should be organized.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-xl bg-[#f5f5f7] p-4">
                <p className="text-[11px] text-black/35">
                  Tasks
                </p>

                <p className="mt-1 text-sm font-medium">
                  3 pending
                </p>
              </div>

              <div className="rounded-xl bg-[#f5f5f7] p-4">
                <p className="text-[11px] text-black/35">
                  Events
                </p>

                <p className="mt-1 text-sm font-medium">
                  2 scheduled
                </p>
              </div>

              <div className="rounded-xl bg-[#f5f5f7] p-4">
                <p className="text-[11px] text-black/35">
                  Available time
                </p>

                <p className="mt-1 text-sm font-medium">
                  5h 30m
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-black/[0.05] pt-5">
              <p className="text-[11px] leading-5 text-black/30">
                The planning engine will eventually combine tasks, events,
                goals, habits, deadlines and your available time.
              </p>
            </div>
          </section>
        </div>
      </section>
    </AppLayout>
  );
}