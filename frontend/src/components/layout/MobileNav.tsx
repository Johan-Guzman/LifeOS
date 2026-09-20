
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const primaryNavigation = [
  { name: "Home", href: "/" },
  { name: "Tasks", href: "/tasks" },
  { name: "Calendar", href: "/events" },
  { name: "Habits", href: "/habits" },
];

const moreNavigation = [
  { name: "Goals", href: "/goals" },
  { name: "Projects", href: "/projects" },
  { name: "Expenses", href: "/expenses" },
  { name: "Planning", href: "/planning" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const moreActive = moreNavigation.some(
    (item) => pathname === item.href
  );

  return (
    <>
      {open && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {open && (
        <div className="fixed inset-x-4 bottom-20 z-50 rounded-2xl border border-black/[0.06] bg-white/95 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-2xl md:hidden">
          <div className="grid grid-cols-2 gap-1">
            {moreNavigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-center text-xs transition ${
                    active
                      ? "bg-black/[0.07] font-medium text-black"
                      : "text-black/50 hover:bg-black/[0.04] hover:text-black"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-black/[0.06] bg-white/85 px-2 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur-2xl md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around">
          {primaryNavigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-w-16 flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[10px] transition ${
                  active
                    ? "font-medium text-black"
                    : "text-black/35"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    active ? "bg-black" : "bg-transparent"
                  }`}
                />

                <span>{item.name}</span>
              </Link>
            );
          })}

          <button
            onClick={() => setOpen((current) => !current)}
            aria-label="Open more navigation"
            aria-expanded={open}
            className={`flex min-w-16 flex-col items-center gap-1 rounded-xl px-3 py-1.5 text-[10px] transition ${
              moreActive || open
                ? "font-medium text-black"
                : "text-black/35"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                moreActive || open
                  ? "bg-black"
                  : "bg-transparent"
              }`}
            />

            <span>More</span>
          </button>
        </div>
      </nav>
    </>
  );
}

