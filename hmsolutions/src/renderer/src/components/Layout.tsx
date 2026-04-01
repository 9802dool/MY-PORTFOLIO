import { NavLink, Outlet } from "react-router-dom";

const nav = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/inventory", label: "Inventory" },
  { to: "/categories", label: "Categories" },
  { to: "/reports", label: "Reports" },
];

export default function Layout() {
  return (
    <div className="flex h-full min-h-screen">
      <aside className="flex w-60 shrink-0 flex-col border-r border-slate-800 bg-brand text-white">
        <div className="border-b border-slate-700 px-5 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Inventory
          </p>
          <h1 className="mt-1 text-xl font-bold tracking-tight">HM SOLUTIONS</h1>
          <p className="mt-2 text-sm text-slate-400">Local inventory management</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                [
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "bg-brand-accent text-white shadow-sm"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-slate-700 px-5 py-4 text-xs text-slate-500">
          v1.0 · Data stored on this computer
        </div>
      </aside>
      <main className="min-w-0 flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
