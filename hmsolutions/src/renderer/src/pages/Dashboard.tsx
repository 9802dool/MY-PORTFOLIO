import { useCallback, useEffect, useState } from "react";
import { getApi } from "../lib/api";
import type { DashboardStats, ItemWithCategory } from "../../../shared/types";

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recent, setRecent] = useState<ItemWithCategory[]>([]);
  const [lowStock, setLowStock] = useState<ItemWithCategory[]>([]);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      const api = getApi();
      const [s, r, l] = await Promise.all([
        api.dashboard.stats(),
        api.dashboard.recent(),
        api.dashboard.lowStock(),
      ]);
      setStats(s);
      setRecent(r);
      setLowStock(l);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load dashboard");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Overview of donated inventory and recent activity.
        </p>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      {stats ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Total items
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stats.totalItems}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Categories
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stats.categoryCount}</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
              Low stock (≤5)
            </p>
            <p className="mt-2 text-3xl font-bold text-amber-900">{stats.lowStockCount}</p>
          </div>
        </div>
      ) : (
        !error && <p className="text-sm text-slate-500">Loading…</p>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-900">Recent updates</h2>
            <p className="text-sm text-slate-500">Last changed items</p>
          </div>
          <ul className="divide-y divide-slate-100">
            {recent.length === 0 ? (
              <li className="px-5 py-8 text-center text-sm text-slate-500">No items yet.</li>
            ) : (
              recent.map((item) => (
                <li key={item.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3">
                  <div>
                    <p className="font-medium text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">
                      {item.category_name ?? "Uncategorized"} · Qty {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs text-slate-400">{formatDate(item.updated_at)}</span>
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-900">Low stock</h2>
            <p className="text-sm text-slate-500">Items at or below quantity 5</p>
          </div>
          <ul className="divide-y divide-slate-100">
            {lowStock.length === 0 ? (
              <li className="px-5 py-8 text-center text-sm text-slate-500">
                No low-stock items.
              </li>
            ) : (
              lowStock.map((item) => (
                <li key={item.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3">
                  <div>
                    <p className="font-medium text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.category_name ?? "Uncategorized"}</p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-sm font-medium text-amber-900">
                    {item.quantity}
                  </span>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
