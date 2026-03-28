"use client";

import Link from "next/link";
import { useHms, movementTypeLabels, movementTypeColors } from "@/components/HmsProvider";

export default function DashboardPage() {
  const { state } = useHms();
  const { products, categories, suppliers, movements } = state;

  const totalProducts = products.length;
  const totalUnits = products.reduce((a, p) => a + p.quantity, 0);
  const stockValue = products.reduce((a, p) => a + p.quantity * p.costPrice, 0);
  const retailValue = products.reduce((a, p) => a + p.quantity * p.sellPrice, 0);
  const lowStock = products.filter((p) => p.quantity <= p.reorderPoint);
  const outOfStock = products.filter((p) => p.quantity === 0);

  const recentMovements = [...movements]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  const categoryBreakdown = categories.map((cat) => {
    const catProducts = products.filter((p) => p.categoryId === cat.id);
    const qty = catProducts.reduce((a, p) => a + p.quantity, 0);
    return { ...cat, count: catProducts.length, qty };
  }).filter((c) => c.count > 0);

  function productName(id: string): string {
    return products.find((p) => p.id === id)?.name ?? "Unknown";
  }

  function productSku(id: string): string {
    return products.find((p) => p.id === id)?.sku ?? "—";
  }

  function timeAgo(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-[#1e2632] bg-[#11161d] p-5">
          <p className="text-[11px] font-medium uppercase tracking-wide text-[#6b7280]">Total products</p>
          <p className="mt-2 font-mono text-3xl font-bold text-white tabular-nums">{totalProducts}</p>
          <p className="mt-1 text-xs text-[#6b7280]">{categories.length} categories · {suppliers.length} suppliers</p>
        </div>
        <div className="rounded-xl border border-[#1e2632] bg-[#11161d] p-5">
          <p className="text-[11px] font-medium uppercase tracking-wide text-[#6b7280]">Units in stock</p>
          <p className="mt-2 font-mono text-3xl font-bold text-[#c9a227] tabular-nums">{totalUnits.toLocaleString()}</p>
          <p className="mt-1 text-xs text-[#6b7280]">{outOfStock.length} out of stock</p>
        </div>
        <div className="rounded-xl border border-[#1e2632] bg-[#11161d] p-5">
          <p className="text-[11px] font-medium uppercase tracking-wide text-[#6b7280]">Stock value (cost)</p>
          <p className="mt-2 font-mono text-3xl font-bold text-emerald-400 tabular-nums">${stockValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p className="mt-1 text-xs text-[#6b7280]">Retail: ${retailValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        <div className="rounded-xl border border-[#1e2632] bg-[#11161d] p-5">
          <p className="text-[11px] font-medium uppercase tracking-wide text-[#6b7280]">Low stock alerts</p>
          <p className={`mt-2 font-mono text-3xl font-bold tabular-nums ${lowStock.length > 0 ? "text-red-400" : "text-emerald-400"}`}>{lowStock.length}</p>
          <p className="mt-1 text-xs text-[#6b7280]">At or below reorder point</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Low stock */}
        <div className="rounded-xl border border-[#1e2632] bg-[#11161d]">
          <div className="flex items-center justify-between border-b border-[#1e2632] px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-white">Low stock items</h2>
              <p className="text-[11px] text-[#6b7280]">Quantity at or below reorder point</p>
            </div>
            <Link href="/products" className="text-xs font-medium text-[#c9a227] hover:underline">View all →</Link>
          </div>
          <ul className="divide-y divide-[#1e2632]">
            {lowStock.length === 0 ? (
              <li className="px-4 py-6 text-center text-sm text-[#6b7280]">All products are well stocked.</li>
            ) : (
              lowStock.slice(0, 6).map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-[#e8eaed]">{p.name}</p>
                    <p className="font-mono text-xs text-[#6b7280]">{p.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-mono font-semibold tabular-nums ${p.quantity === 0 ? "text-red-400" : "text-amber-400"}`}>{p.quantity}</p>
                    <p className="text-[11px] text-[#6b7280]">min {p.reorderPoint}</p>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Recent movements */}
        <div className="rounded-xl border border-[#1e2632] bg-[#11161d]">
          <div className="flex items-center justify-between border-b border-[#1e2632] px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-white">Recent movements</h2>
              <p className="text-[11px] text-[#6b7280]">Latest stock changes</p>
            </div>
            <Link href="/movements" className="text-xs font-medium text-[#c9a227] hover:underline">View all →</Link>
          </div>
          <ul className="divide-y divide-[#1e2632]">
            {recentMovements.length === 0 ? (
              <li className="px-4 py-6 text-center text-sm text-[#6b7280]">No movements recorded yet.</li>
            ) : (
              recentMovements.map((mv) => (
                <li key={mv.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[#e8eaed]">{productName(mv.productId)}</p>
                    <p className="text-[11px] text-[#6b7280]">{productSku(mv.productId)} · {mv.note || "—"}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-mono font-semibold tabular-nums ${movementTypeColors[mv.type]}`}>
                      {mv.type === "received" || mv.type === "returned" ? "+" : "−"}{mv.quantity}
                    </p>
                    <p className={`text-[11px] ${movementTypeColors[mv.type]}`}>{movementTypeLabels[mv.type]}</p>
                  </div>
                  <span className="whitespace-nowrap text-[11px] text-[#5c6570]">{timeAgo(mv.createdAt)}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="rounded-xl border border-[#1e2632] bg-[#11161d]">
        <div className="border-b border-[#1e2632] px-4 py-3">
          <h2 className="text-sm font-semibold text-white">Inventory by category</h2>
        </div>
        <div className="grid gap-px bg-[#1e2632] sm:grid-cols-2 lg:grid-cols-3">
          {categoryBreakdown.map((cat) => (
            <div key={cat.id} className="flex items-center gap-3 bg-[#11161d] px-4 py-4">
              <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: cat.color }} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[#e8eaed]">{cat.name}</p>
                <p className="text-[11px] text-[#6b7280]">{cat.count} product{cat.count === 1 ? "" : "s"} · {cat.qty.toLocaleString()} units</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
