"use client";

import { useMemo, useState } from "react";
import { useHms, movementTypeLabels, movementTypeColors } from "@/components/HmsProvider";
import type { MovementType } from "@/lib/types";

const fieldClass =
  "w-full rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 text-sm text-white outline-none focus:border-[#c9a227]/50";

const movementTypes: MovementType[] = ["received", "sold", "adjusted", "returned", "damaged"];

export default function MovementsPage() {
  const { state, addMovement } = useHms();
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [filterProduct, setFilterProduct] = useState("");
  const [form, setForm] = useState({ productId: "", type: "received" as MovementType, quantity: "", note: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const qty = Math.max(1, parseInt(form.quantity, 10) || 0);
    addMovement({ productId: form.productId, type: form.type, quantity: qty, note: form.note.trim() });
    setForm({ productId: "", type: "received", quantity: "", note: "" });
    setShowForm(false);
  }

  const sorted = useMemo(() => {
    return [...state.movements]
      .filter((mv) => {
        if (filterType && mv.type !== filterType) return false;
        if (filterProduct && mv.productId !== filterProduct) return false;
        return true;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [state.movements, filterType, filterProduct]);

  function productName(id: string): string {
    return state.products.find((p) => p.id === id)?.name ?? "Unknown";
  }

  function productSku(id: string): string {
    return state.products.find((p) => p.id === id)?.sku ?? "—";
  }

  function formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) +
      " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 text-sm text-white outline-none focus:border-[#c9a227]/50"
        >
          <option value="">All types</option>
          {movementTypes.map((t) => <option key={t} value={t}>{movementTypeLabels[t]}</option>)}
        </select>
        <select
          value={filterProduct}
          onChange={(e) => setFilterProduct(e.target.value)}
          className="max-w-xs rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 text-sm text-white outline-none focus:border-[#c9a227]/50"
        >
          <option value="">All products</option>
          {[...state.products].sort((a, b) => a.sku.localeCompare(b.sku)).map((p) => (
            <option key={p.id} value={p.id}>{p.sku} — {p.name}</option>
          ))}
        </select>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-[#c9a227] px-4 py-2 text-sm font-semibold text-[#0c0f14] hover:bg-[#ddb92e]"
        >
          + Record movement
        </button>
      </div>

      <p className="text-xs text-[#6b7280]">{sorted.length} movement{sorted.length === 1 ? "" : "s"}</p>

      {/* Form */}
      {showForm ? (
        <div className="rounded-xl border border-[#1e2632] bg-[#11161d] p-5">
          <h2 className="text-sm font-semibold text-white">Record stock movement</h2>
          <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block text-xs text-[#6b7280]">
              Product *
              <select required value={form.productId} onChange={(e) => setForm((f) => ({ ...f, productId: e.target.value }))} className={`mt-1 ${fieldClass}`}>
                <option value="">Select product…</option>
                {[...state.products].sort((a, b) => a.sku.localeCompare(b.sku)).map((p) => (
                  <option key={p.id} value={p.id}>{p.sku} — {p.name} (qty: {p.quantity})</option>
                ))}
              </select>
            </label>
            <label className="block text-xs text-[#6b7280]">
              Type *
              <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as MovementType }))} className={`mt-1 ${fieldClass}`}>
                {movementTypes.map((t) => <option key={t} value={t}>{movementTypeLabels[t]}</option>)}
              </select>
            </label>
            <label className="block text-xs text-[#6b7280]">
              Quantity *
              <input required type="number" min={1} value={form.quantity} onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))} className={`mt-1 font-mono ${fieldClass}`} />
            </label>
            <label className="block text-xs text-[#6b7280]">
              Note
              <input value={form.note} onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))} className={`mt-1 ${fieldClass}`} placeholder="PO #, order #, reason…" />
            </label>
            <div className="flex flex-wrap gap-2 lg:col-span-4">
              <button type="submit" className="rounded-lg bg-[#c9a227] px-4 py-2 text-sm font-semibold text-[#0c0f14] hover:bg-[#ddb92e]">Record</button>
              <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-[#1e2632] px-4 py-2 text-sm text-[#9aa3ad] hover:bg-[#161c24]">Cancel</button>
            </div>
          </form>
        </div>
      ) : null}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[#1e2632] bg-[#11161d]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#1e2632] text-[11px] uppercase tracking-wide text-[#6b7280]">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Qty</th>
                <th className="px-4 py-3 font-medium">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2632]">
              {sorted.map((mv) => (
                <tr key={mv.id} className="text-[#e8eaed] hover:bg-[#161c24]">
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-[#9aa3ad]">{formatDate(mv.createdAt)}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{productName(mv.productId)}</p>
                    <p className="font-mono text-xs text-[#6b7280]">{productSku(mv.productId)}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span className={`text-xs font-semibold uppercase ${movementTypeColors[mv.type]}`}>{movementTypeLabels[mv.type]}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-mono font-semibold tabular-nums ${movementTypeColors[mv.type]}`}>
                      {mv.type === "received" || mv.type === "returned" ? "+" : "−"}{mv.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-[#9aa3ad]">{mv.note || "—"}</td>
                </tr>
              ))}
              {sorted.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-[#6b7280]">No movements match your filters.</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
