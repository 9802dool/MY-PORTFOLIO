"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/products", label: "Products", icon: "📦" },
  { href: "/movements", label: "Stock Movements", icon: "🔄" },
  { href: "/categories", label: "Categories", icon: "🏷️" },
  { href: "/suppliers", label: "Suppliers", icon: "🤝" },
];

export function HmsShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebar = (
    <>
      <div className="border-b border-[#1e2632] px-5 py-5">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#c9a227]">
          HMSolutions
        </p>
        <p className="mt-1 text-[11px] leading-snug text-[#6b7280]">
          Inventory Management
        </p>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {nav.map((n) => {
          const active = path === n.href;
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-[#c9a227]/10 text-[#c9a227]"
                  : "text-[#9aa3ad] hover:bg-[#161c24] hover:text-[#e8eaed]"
              }`}
            >
              <span className="text-base">{n.icon}</span>
              {n.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-[#1e2632] p-3 text-[10px] text-[#5c6570]">
        Data stored in browser localStorage.
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#0c0f14] text-[#e8eaed]">
      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-[#1e2632] bg-[#11161d] lg:flex">
        {sidebar}
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen ? (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="relative z-10 flex w-64 flex-col bg-[#11161d]">
            {sidebar}
          </aside>
        </div>
      ) : null}

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-[#1e2632] bg-[#0f1419]/90 px-4 py-3 backdrop-blur lg:px-6 lg:py-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-1.5 text-[#9aa3ad] hover:bg-[#1e2632] lg:hidden"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" /></svg>
          </button>
          <h1 className="text-lg font-semibold tracking-tight text-white">
            {nav.find((n) => n.href === path)?.label ?? "HMSolutions"}
          </h1>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
