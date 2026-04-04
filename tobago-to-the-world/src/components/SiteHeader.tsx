"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBooking } from "@/context/BookingProvider";

const nav = [
  { href: "/hotels", label: "Hotels" },
  { href: "/attractions", label: "Attractions" },
  { href: "/taxis", label: "Taxis" },
  { href: "/boats", label: "Boats" },
  { href: "/dining", label: "Food" },
  { href: "/nightlife", label: "Nightlife" },
  { href: "/book", label: "Book" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count } = useBooking();

  return (
    <header className="sticky top-0 z-50 border-b border-tt-sand-dark/20 bg-tt-cream/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-xl font-bold tracking-tight text-tt-ocean sm:text-2xl">
            Tobago To The World
          </span>
          <span className="rounded-md bg-tt-ocean/10 px-2 py-0.5 text-xs font-bold text-tt-ocean">
            TTW
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-1 gap-y-2 text-sm font-medium">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 transition ${
                  active
                    ? "bg-tt-ocean text-white"
                    : "text-tt-ink-muted hover:bg-tt-sand-dark/10 hover:text-tt-ink"
                }`}
              >
                {item.label}
                {item.href === "/book" && count > 0 ? (
                  <span className="ml-1.5 inline-flex min-w-[1.25rem] justify-center rounded-full bg-tt-coral px-1 text-xs text-white">
                    {count}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
