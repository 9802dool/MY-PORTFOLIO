"use client";

import { useState } from "react";
import { useHms } from "@/components/HmsProvider";

const emptyForm = {
  sku: "",
  name: "",
  quantity: "0",
  unit: "ea",
  location: "",
  reorderPoint: "0",
};

export default function InventoryPage() {
  const { state, upsertItem, deleteItem } = useHms();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  function startEdit(id: string) {
    const i = state.items.find((x) => x.id === id);
    if (!i) return;
    setEditingId(id);
    setForm({
      sku: i.sku,
      name: i.name,
      quantity: String(i.quantity),
      unit: i.unit,
      location: i.location,
      reorderPoint: String(i.reorderPoint),
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const qty = Math.max(0, parseInt(form.quantity, 10) || 0);
    const rp = Math.max(0, parseInt(form.reorderPoint, 10) || 0);
    upsertItem({
      id: editingId ?? undefined,
      sku: form.sku.trim(),
      name: form.name.trim(),
      quantity: qty,
      unit: form.unit.trim() || "ea",
      location: form.location.trim(),
      reorderPoint: rp,
    });
    cancelEdit();
  }

  const sorted = [...state.items].sort((a, b) =>
    a.sku.localeCompare(b.sku),
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <p className="text-sm text-[#8b939e]">
        SKUs, locations, and reorder points. Changes save automatically in this
        browser.
      </p>

      <div className="overflow-hidden rounded-xl border border-[#1e2632] bg-[#11161d]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#1e2632] text-xs uppercase tracking-wide text-[#6b7280]">
                <th className="px-4 py-3 font-medium">SKU</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Qty</th>
                <th className="px-4 py-3 font-medium">Unit</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Reorder</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2632]">
              {sorted.map((i) => (
                <tr key={i.id} className="text-[#e8eaed]">
                  <td className="px-4 py-3 font-mono text-[#c9a227]">{i.sku}</td>
                  <td className="px-4 py-3">{i.name}</td>
                  <td className="px-4 py-3 font-mono tabular-nums">
                    {i.quantity}
                  </td>
                  <td className="px-4 py-3 text-[#9aa3ad]">{i.unit}</td>
                  <td className="px-4 py-3 text-[#9aa3ad]">{i.location}</td>
                  <td className="px-4 py-3 font-mono tabular-nums text-[#9aa3ad]">
                    {i.reorderPoint}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => startEdit(i.id)}
                      className="mr-2 text-[#c9a227] hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          confirm(`Delete ${i.sku}? This cannot be undone.`)
                        )
                          deleteItem(i.id);
                      }}
                      className="text-red-400/90 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-[#1e2632] bg-[#11161d] p-5">
        <h2 className="text-sm font-semibold text-white">
          {editingId ? "Edit SKU" : "Add SKU"}
        </h2>
        <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="block text-xs text-[#6b7280]">
            SKU
            <input
              required
              value={form.sku}
              onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 font-mono text-sm text-white outline-none focus:border-[#c9a227]/50"
            />
          </label>
          <label className="block text-xs text-[#6b7280] sm:col-span-2">
            Name
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 text-sm text-white outline-none focus:border-[#c9a227]/50"
            />
          </label>
          <label className="block text-xs text-[#6b7280]">
            Quantity
            <input
              required
              type="number"
              min={0}
              value={form.quantity}
              onChange={(e) =>
                setForm((f) => ({ ...f, quantity: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 font-mono text-sm text-white outline-none focus:border-[#c9a227]/50"
            />
          </label>
          <label className="block text-xs text-[#6b7280]">
            Unit
            <input
              value={form.unit}
              onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 text-sm text-white outline-none focus:border-[#c9a227]/50"
            />
          </label>
          <label className="block text-xs text-[#6b7280]">
            Reorder point
            <input
              required
              type="number"
              min={0}
              value={form.reorderPoint}
              onChange={(e) =>
                setForm((f) => ({ ...f, reorderPoint: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 font-mono text-sm text-white outline-none focus:border-[#c9a227]/50"
            />
          </label>
          <label className="block text-xs text-[#6b7280] sm:col-span-2 lg:col-span-3">
            Location
            <input
              required
              value={form.location}
              onChange={(e) =>
                setForm((f) => ({ ...f, location: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 text-sm text-white outline-none focus:border-[#c9a227]/50"
            />
          </label>
          <div className="flex flex-wrap gap-2 sm:col-span-2 lg:col-span-3">
            <button
              type="submit"
              className="rounded-lg bg-[#c9a227] px-4 py-2 text-sm font-semibold text-[#0c0f14] hover:bg-[#ddb92e]"
            >
              {editingId ? "Save changes" : "Add SKU"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-lg border border-[#1e2632] px-4 py-2 text-sm text-[#9aa3ad] hover:bg-[#161c24]"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
