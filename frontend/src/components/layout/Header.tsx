"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    setDate(formatter.format(new Date()));
  }, []);

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-black/[0.06] bg-[#f5f5f7]/80 px-4 backdrop-blur-2xl sm:h-16 sm:px-5 md:px-8">
      <div className="min-w-0">
        <p className="truncate text-[11px] text-black/35 sm:text-xs">
          {date}
        </p>

        <h2 className="truncate text-[13px] font-medium text-black sm:text-sm">
          Good morning, Johan
        </h2>
      </div>

      <button
        aria-label="Open profile"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-[11px] font-semibold text-white shadow-sm transition hover:bg-black/80 sm:h-9 sm:w-9 sm:text-xs"
      >
        J
      </button>
    </header>
  );
}