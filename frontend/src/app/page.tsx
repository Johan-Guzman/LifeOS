import AppLayout from "../components/layout/AppLayout";

const stats = [
  {
    label: "Tasks",
    value: "0",
    detail: "pending",
  },
  {
    label: "Events",
    value: "0",
    detail: "today",
  },
  {
    label: "Goals",
    value: "0",
    detail: "active",
  },
  {
    label: "Expenses",
    value: "$0",
    detail: "this month",
  },
];

export default function Home() {
  return (
    <AppLayout>
      <section>
        <div className="mb-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-black/35">
            Overview
          </p>

          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-black md:text-4xl">
            Your life, organized.
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-black/45">
            Everything you need to manage your time, goals, tasks and
            priorities in one place.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
            >
              <p className="text-xs text-black/40">{stat.label}</p>

              <div className="mt-4 flex items-end justify-between">
                <span className="text-3xl font-semibold tracking-tight">
                  {stat.value}
                </span>

                <span className="pb-1 text-xs text-black/35">
                  {stat.detail}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-2xl border border-black/[0.06] bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">Today</h2>
                <p className="mt-1 text-xs text-black/40">
                  Your schedule at a glance
                </p>
              </div>

              <button className="rounded-full bg-black px-4 py-2 text-xs font-medium text-white transition hover:bg-black/80">
                Add
              </button>
            </div>

            <div className="mt-8 flex min-h-40 items-center justify-center rounded-xl bg-[#f5f5f7]">
              <p className="text-sm text-black/35">
                Nothing scheduled for today.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-black/[0.06] bg-white p-6">
            <h2 className="text-sm font-semibold">Focus</h2>
            <p className="mt-1 text-xs text-black/40">
              What deserves your attention
            </p>

            <div className="mt-8 rounded-xl bg-[#f5f5f7] p-5">
              <p className="text-sm font-medium">
                Your workspace is ready.
              </p>

              <p className="mt-2 text-xs leading-5 text-black/40">
                Add tasks, goals and events to start building your personal
                operating system.
              </p>
            </div>
          </section>
        </div>
      </section>
    </AppLayout>
  );
}