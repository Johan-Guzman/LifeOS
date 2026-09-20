import AppLayout from "../../components/layout/AppLayout";

const habits = [
  {
    name: "Exercise",
    frequency: "Every day",
    streak: 7,
    progress: 85,
  },
  {
    name: "Read",
    frequency: "Every day",
    streak: 12,
    progress: 92,
  },
  {
    name: "Study",
    frequency: "Weekdays",
    streak: 5,
    progress: 71,
  },
  {
    name: "Sleep before 11 PM",
    frequency: "Every day",
    streak: 3,
    progress: 60,
  },
];

const week = ["M", "T", "W", "T", "F", "S", "S"];

export default function HabitsPage() {
  return (
    <AppLayout>
      <section>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-black/35">
              Workspace
            </p>

            <h1 className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
              Habits
            </h1>

            <p className="mt-2 text-sm text-black/45">
              Build consistency through small actions.
            </p>
          </div>

          <button className="rounded-full bg-black px-5 py-2.5 text-xs font-medium text-white transition hover:bg-black/80">
            New habit
          </button>
        </div>

        <div className="mb-6 rounded-2xl border border-black/[0.06] bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-black/40">This week</p>
              <p className="mt-1 text-lg font-semibold tracking-tight">
                Your consistency
              </p>
            </div>

            <span className="text-2xl font-semibold tracking-tight">
              78%
            </span>
          </div>

          <div className="mt-6 flex gap-2">
            {week.map((day, index) => (
              <div key={`${day}-${index}`} className="flex-1 text-center">
                <p className="mb-2 text-[10px] font-medium text-black/30">
                  {day}
                </p>

                <div
                  className={`mx-auto h-2.5 w-2.5 rounded-full ${
                    index < 5 ? "bg-black" : "bg-black/[0.08]"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
          <div className="divide-y divide-black/[0.05]">
            {habits.map((habit) => (
              <div
                key={habit.name}
                className="px-5 py-5 transition hover:bg-black/[0.015] md:px-6"
              >
                <div className="flex items-center gap-4">
                  <button
                    aria-label={`Complete ${habit.name}`}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/[0.12] transition hover:border-black"
                  >
                    <span className="h-2 w-2 rounded-full bg-black/10" />
                  </button>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">
                      {habit.name}
                    </p>

                    <p className="mt-1 text-xs text-black/35">
                      {habit.frequency}
                    </p>
                  </div>

                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-medium">
                      {habit.streak} day{habit.streak !== 1 ? "s" : ""}
                    </p>

                    <p className="mt-1 text-[11px] text-black/30">
                      current streak
                    </p>
                  </div>
                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-black/[0.05]">
                  <div
                    className="h-full rounded-full bg-black"
                    style={{ width: `${habit.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}