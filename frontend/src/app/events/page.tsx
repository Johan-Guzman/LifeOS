import AppLayout from "../../components/layout/AppLayout";

const events = [
  {
    time: "09:00",
    title: "Project meeting",
    category: "University",
    duration: "1h",
  },
  {
    time: "11:30",
    title: "Study session",
    category: "Study",
    duration: "2h",
  },
  {
    time: "15:00",
    title: "Work on LifeOS",
    category: "Personal",
    duration: "1h 30m",
  },
];

export default function EventsPage() {
  return (
    <AppLayout>
      <section>
        <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8 sm:items-end">
          <div className="min-w-0">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-black/35 sm:text-xs">
              Workspace
            </p>

            <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Calendar
            </h1>

            <p className="mt-2 text-sm leading-5 text-black/45">
              See how your time is organized.
            </p>
          </div>

          <button className="shrink-0 rounded-full bg-black px-4 py-2.5 text-xs font-medium text-white transition hover:bg-black/80 sm:px-5">
            <span className="sm:hidden">+</span>
            <span className="hidden sm:inline">New event</span>
          </button>
        </div>

        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-1">
            <button
              aria-label="Previous day"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-white text-sm text-black/50 transition hover:bg-black/[0.04]"
            >
              ‹
            </button>

            <span className="truncate px-2 text-xs font-medium sm:text-sm">
              September 21, 2026
            </span>

            <button
              aria-label="Next day"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/[0.06] bg-white text-sm text-black/50 transition hover:bg-black/[0.04]"
            >
              ›
            </button>
          </div>

          <button className="shrink-0 rounded-full bg-white px-3 py-2 text-xs text-black/50 shadow-sm ring-1 ring-black/[0.06] transition hover:text-black">
            Today
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
          <div className="border-b border-black/[0.05] px-4 py-5 sm:px-6">
            <p className="text-xs font-medium text-black/40">
              Monday
            </p>

            <p className="mt-1 text-lg font-semibold tracking-tight">
              September 21
            </p>
          </div>

          <div className="divide-y divide-black/[0.05]">
            {events.map((event) => (
              <div
                key={`${event.time}-${event.title}`}
                className="flex min-h-24 gap-3 px-4 py-5 transition hover:bg-black/[0.015] sm:gap-5 sm:px-6"
              >
                <div className="w-11 shrink-0 pt-0.5 sm:w-14">
                  <span className="text-[11px] font-medium text-black/35 sm:text-xs">
                    {event.time}
                  </span>
                </div>

                <div className="min-w-0 flex-1 border-l border-black/[0.07] pl-4 sm:pl-5">
                  <p className="text-sm font-medium leading-5 text-black">
                    {event.title}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-black/35 sm:text-xs">
                    <span>{event.category}</span>
                    <span>·</span>
                    <span>{event.duration}</span>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex min-h-20 items-center justify-center px-6">
              <p className="text-xs text-black/25">
                Your free time
              </p>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}