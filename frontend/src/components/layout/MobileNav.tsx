"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Tasks", href: "/tasks" },
  { name: "Calendar", href: "/events" },
  { name: "Habits", href: "/habits" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-black/[0.06] bg-white/85 px-2 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur-2xl md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {navigation.map((item) => {
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
      </div>
    </nav>
  );
}