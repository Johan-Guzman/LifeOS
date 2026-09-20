import AppLayout from "../../components/layout/AppLayout";

const expenses = [
  {
    name: "Transportation",
    category: "Transport",
    amount: "$550,000",
    date: "Sep 18",
  },
  {
    name: "Phone",
    category: "Subscriptions",
    amount: "$115,000",
    date: "Sep 15",
  },
  {
    name: "Food",
    category: "Food",
    amount: "$48,000",
    date: "Sep 14",
  },
  {
    name: "Study materials",
    category: "Education",
    amount: "$35,000",
    date: "Sep 12",
  },
];

export default function ExpensesPage() {
  return (
    <AppLayout>
      <section>
        <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8 sm:items-end">
          <div className="min-w-0">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-black/35 sm:text-xs">
              Finance
            </p>

            <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Expenses
            </h1>

            <p className="mt-2 max-w-md text-sm leading-5 text-black/45">
              Understand where your money is going.
            </p>
          </div>

          <button className="shrink-0 rounded-full bg-black px-4 py-2.5 text-xs font-medium text-white transition hover:bg-black/80 sm:px-5">
            <span className="sm:hidden">+</span>
            <span className="hidden sm:inline">Add expense</span>
          </button>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-black/[0.06] bg-white p-5 sm:p-6">
            <p className="text-xs text-black/40">
              This month
            </p>

            <p className="mt-3 text-2xl font-semibold tracking-tight">
              $748,000
            </p>

            <p className="mt-1 text-[11px] text-black/30">
              total expenses
            </p>
          </div>

          <div className="rounded-2xl border border-black/[0.06] bg-white p-5 sm:p-6">
            <p className="text-xs text-black/40">
              Average daily
            </p>

            <p className="mt-3 text-2xl font-semibold tracking-tight">
              $49,867
            </p>

            <p className="mt-1 text-[11px] text-black/30">
              based on current month
            </p>
          </div>

          <div className="rounded-2xl border border-black/[0.06] bg-white p-5 sm:p-6">
            <p className="text-xs text-black/40">
              Transactions
            </p>

            <p className="mt-3 text-2xl font-semibold tracking-tight">
              4
            </p>

            <p className="mt-1 text-[11px] text-black/30">
              this month
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
          <div className="flex items-center justify-between border-b border-black/[0.05] px-4 py-4 sm:px-6">
            <div>
              <h2 className="text-sm font-semibold">
                Recent expenses
              </h2>

              <p className="mt-1 text-xs text-black/35">
                September 2026
              </p>
            </div>

            <button className="text-xs text-black/40 transition hover:text-black">
              View all
            </button>
          </div>

          <div className="divide-y divide-black/[0.05]">
            {expenses.map((expense) => (
              <div
                key={`${expense.name}-${expense.date}`}
                className="flex items-center gap-3 px-4 py-4 transition hover:bg-black/[0.015] sm:gap-4 sm:px-6 sm:py-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/[0.05] text-xs font-medium text-black/50">
                  {expense.name.charAt(0)}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {expense.name}
                  </p>

                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-black/35 sm:text-xs">
                    <span>{expense.category}</span>
                    <span>·</span>
                    <span>{expense.date}</span>
                  </div>
                </div>

                <p className="shrink-0 text-sm font-medium">
                  {expense.amount}
                </p>

                <button
                  aria-label={`More options for ${expense.name}`}
                  className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg leading-none text-black/25 transition hover:bg-black/[0.05] hover:text-black sm:flex"
                >
                  ···
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}