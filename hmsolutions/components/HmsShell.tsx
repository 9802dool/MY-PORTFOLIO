"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Dashboard" },
  { href: "/inventory", label: "Inventory" },
  { href: "/logistics", label: "Logistics" },
];

export function HmsShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <div className="flex min-h-screen bg-[#0c0f14] text-[#e8eaed]">
      <aside className="flex w-56 shrink-0 flex-col border-r border-[#1e2632] bg-[#11161d]">
        <div className="border-b border-[#1e2632] px-4 py-5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c9a227]">
            HMSolutions
          </p>
          <p className="mt-1 text-xs leading-snug text-[#8b939e]">
            Logistics &amp; inventory
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-2">
          {nav.map((n) => {
            const active = path === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-[#1c2430] text-white"
                    : "text-[#9aa3ad] hover:bg-[#161c24] hover:text-[#e8eaed]"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-[#1e2632] p-3 text-[10px] text-[#5c6570]">
          Data stored in this browser (local). Export via copy or add an API
          later.
        </div>
      </aside>
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="border-b border-[#1e2632] bg-[#0f1419]/90 px-6 py-4 backdrop-blur">
          <h1 className="text-lg font-semibold tracking-tight text-white">
            {nav.find((n) => n.href === path)?.label ?? "HMSolutions"}
          </h1>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
