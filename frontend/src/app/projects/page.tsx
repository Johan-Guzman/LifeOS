import AppLayout from "../../components/layout/AppLayout";

const projects = [
  {
    name: "LifeOS",
    description: "Personal operating system",
    status: "In progress",
    progress: 68,
    tasks: "12 / 18 tasks",
  },
  {
    name: "Degree Project",
    description: "Barco Hospital San Raffaele analytics platform",
    status: "In progress",
    progress: 45,
    tasks: "9 / 20 tasks",
  },
  {
    name: "KORΛ",
    description: "Discover and connect through music",
    status: "Active",
    progress: 32,
    tasks: "6 / 19 tasks",
  },
];

export default function ProjectsPage() {
  return (
    <AppLayout>
      <section>
        <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8 sm:items-end">
          <div className="min-w-0">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-black/35 sm:text-xs">
              Workspace
            </p>

            <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Projects
            </h1>

            <p className="mt-2 max-w-md text-sm leading-5 text-black/45">
              Organize the work behind your bigger goals.
            </p>
          </div>

          <button className="shrink-0 rounded-full bg-black px-4 py-2.5 text-xs font-medium text-white transition hover:bg-black/80 sm:px-5">
            <span className="sm:hidden">+</span>
            <span className="hidden sm:inline">New project</span>
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.name}
              className="group rounded-2xl border border-black/[0.06] bg-white p-5 transition hover:border-black/[0.1] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="truncate text-base font-semibold tracking-tight">
                    {project.name}
                  </h2>

                  <p className="mt-1.5 text-xs leading-5 text-black/40">
                    {project.description}
                  </p>
                </div>

                <button
                  aria-label={`More options for ${project.name}`}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg leading-none text-black/25 transition hover:bg-black/[0.05] hover:text-black"
                >
                  ···
                </button>
              </div>

              <div className="mt-8">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[11px] text-black/35">
                    Progress
                  </span>

                  <span className="text-xs font-semibold">
                    {project.progress}%
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-black/[0.05]">
                  <div
                    className="h-full rounded-full bg-black transition-all"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-black/[0.05] pt-4">
                <span className="text-[11px] text-black/30">
                  {project.tasks}
                </span>

                <span className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[10px] font-medium text-black/45">
                  {project.status}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}