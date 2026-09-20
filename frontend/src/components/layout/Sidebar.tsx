"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Overview", href: "/" },
  { name: "Tasks", href: "/tasks" },
  { name: "Calendar", href: "/events" },
  { name: "Habits", href: "/habits" },
  { name: "Goals", href: "/goals" },
  { name: "Projects", href: "/projects" },
  { name: "Expenses", href: "/expenses" },
  { name: "Planning", href: "/planning" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-black/[0.06] bg-white/70 backdrop-blur-xl md:flex md:flex-col">
      <div className="px-6 pb-6 pt-7">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-black text-sm font-semibold text-white">
            L
          </div>

          <div>
            <h1 className="text-[15px] font-semibold tracking-tight text-black">
              LifeOS
            </h1>
            <p className="text-[11px] text-black/40">
              Personal operating system
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-black/30">
          Workspace
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-[10px] px-3 py-2.5 text-[13px] transition-all ${
                  active
                    ? "bg-black/[0.06] font-medium text-black"
                    : "text-black/50 hover:bg-black/[0.04] hover:text-black"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-black/[0.06] p-4">
        <button className="w-full rounded-[10px] px-3 py-2.5 text-left text-[13px] text-black/50 transition hover:bg-black/[0.04] hover:text-black">
          Sign out
        </button>
      </div>
    </aside>
  );
}