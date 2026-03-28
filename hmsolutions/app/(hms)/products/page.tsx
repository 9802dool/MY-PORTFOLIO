"use client";

import { useMemo, useState } from "react";
import { useHms } from "@/components/HmsProvider";

const fieldClass =
  "w-full rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 text-sm text-white outline-none focus:border-[#c9a227]/50";

const emptyForm = {
  sku: "",
  name: "",
  description: "",
  categoryId: "",
  supplierId: "",
  costPrice: "",
  sellPrice: "",
  quantity: "0",
  unit: "ea",
  location: "",
  reorderPoint: "0",
};

export default function ProductsPage() {
  const { state, upsertProduct, deleteProduct } = useHms();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [showForm, setShowForm] = useState(false);

  function startEdit(id: string) {
    const p = state.products.find((x) => x.id === id);
    if (!p) return;
    setEditingId(id);
    setForm({
      sku: p.sku,
      name: p.name,
      description: p.description,
      categoryId: p.categoryId,
      supplierId: p.supplierId,
      costPrice: String(p.costPrice),
      sellPrice: String(p.sellPrice),
      quantity: String(p.quantity),
      unit: p.unit,
      location: p.location,
      reorderPoint: String(p.reorderPoint),
    });
    setShowForm(true);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(false);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    upsertProduct({
      id: editingId ?? undefined,
      sku: form.sku.trim(),
      name: form.name.trim(),
      description: form.description.trim(),
      categoryId: form.categoryId,
      supplierId: form.supplierId,
      costPrice: Math.max(0, parseFloat(form.costPrice) || 0),
      sellPrice: Math.max(0, parseFloat(form.sellPrice) || 0),
      quantity: Math.max(0, parseInt(form.quantity, 10) || 0),
      unit: form.unit.trim() || "ea",
      location: form.location.trim(),
      reorderPoint: Math.max(0, parseInt(form.reorderPoint, 10) || 0),
    });
    cancelEdit();
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return [...state.products]
      .filter((p) => {
        if (filterCat && p.categoryId !== filterCat) return false;
        if (q && !`${p.sku} ${p.name} ${p.location}`.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => a.sku.localeCompare(b.sku));
  }, [state.products, search, filterCat]);

  function categoryName(id: string): string {
    return state.categories.find((c) => c.id === id)?.name ?? "—";
  }

  function categoryColor(id: string): string {
    return state.categories.find((c) => c.id === id)?.color ?? "#6b7280";
  }

  function supplierName(id: string): string {
    return state.suppliers.find((s) => s.id === id)?.name ?? "—";
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          placeholder="Search SKU, name, location…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 text-sm text-white outline-none placeholder:text-[#5c6570] focus:border-[#c9a227]/50"
        />
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 text-sm text-white outline-none focus:border-[#c9a227]/50"
        >
          <option value="">All categories</option>
          {state.categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
          className="rounded-lg bg-[#c9a227] px-4 py-2 text-sm font-semibold text-[#0c0f14] hover:bg-[#ddb92e]"
        >
          + Add product
        </button>
      </div>

      <p className="text-xs text-[#6b7280]">{filtered.length} product{filtered.length === 1 ? "" : "s"} shown</p>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-[#1e2632] bg-[#11161d]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#1e2632] text-[11px] uppercase tracking-wide text-[#6b7280]">
                <th className="px-4 py-3 font-medium">SKU</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Qty</th>
                <th className="px-4 py-3 font-medium">Cost</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Supplier</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2632]">
              {filtered.map((p) => (
                <tr key={p.id} className="text-[#e8eaed] hover:bg-[#161c24]">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-[#c9a227]">{p.sku}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{p.name}</p>
                    {p.description ? <p className="mt-0.5 text-xs text-[#6b7280]">{p.description}</p> : null}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: categoryColor(p.categoryId) }} />
                      {categoryName(p.categoryId)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-mono font-semibold tabular-nums ${p.quantity <= p.reorderPoint ? (p.quantity === 0 ? "text-red-400" : "text-amber-400") : "text-white"}`}>
                      {p.quantity}
                    </span>
                    <span className="ml-1 text-xs text-[#6b7280]">{p.unit}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs tabular-nums text-[#9aa3ad]">${p.costPrice.toFixed(2)}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs tabular-nums text-[#9aa3ad]">${p.sellPrice.toFixed(2)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-[#9aa3ad]">{p.location}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-[#9aa3ad]">{supplierName(p.supplierId)}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <button type="button" onClick={() => startEdit(p.id)} className="mr-2 text-xs text-[#c9a227] hover:underline">Edit</button>
                    <button type="button" onClick={() => { if (confirm(`Delete ${p.sku}?`)) deleteProduct(p.id); }} className="text-xs text-red-400/80 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / edit form */}
      {showForm ? (
        <div className="rounded-xl border border-[#1e2632] bg-[#11161d] p-5">
          <h2 className="text-sm font-semibold text-white">{editingId ? "Edit product" : "Add product"}</h2>
          <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label className="block text-xs text-[#6b7280]">
              SKU *
              <input required value={form.sku} onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))} className={`mt-1 font-mono ${fieldClass}`} />
            </label>
            <label className="block text-xs text-[#6b7280] sm:col-span-2">
              Name *
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={`mt-1 ${fieldClass}`} />
            </label>
            <label className="block text-xs text-[#6b7280] lg:col-span-3">
              Description
              <input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={`mt-1 ${fieldClass}`} />
            </label>
            <label className="block text-xs text-[#6b7280]">
              Category
              <select value={form.categoryId} onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))} className={`mt-1 ${fieldClass}`}>
                <option value="">— None —</option>
                {state.categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </label>
            <label className="block text-xs text-[#6b7280]">
              Supplier
              <select value={form.supplierId} onChange={(e) => setForm((f) => ({ ...f, supplierId: e.target.value }))} className={`mt-1 ${fieldClass}`}>
                <option value="">— None —</option>
                {state.suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </label>
            <label className="block text-xs text-[#6b7280]">
              Unit
              <input value={form.unit} onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))} className={`mt-1 ${fieldClass}`} placeholder="ea, boxes, kg…" />
            </label>
            <label className="block text-xs text-[#6b7280]">
              Cost price ($)
              <input type="number" min={0} step={0.01} value={form.costPrice} onChange={(e) => setForm((f) => ({ ...f, costPrice: e.target.value }))} className={`mt-1 font-mono ${fieldClass}`} />
            </label>
            <label className="block text-xs text-[#6b7280]">
              Sell price ($)
              <input type="number" min={0} step={0.01} value={form.sellPrice} onChange={(e) => setForm((f) => ({ ...f, sellPrice: e.target.value }))} className={`mt-1 font-mono ${fieldClass}`} />
            </label>
            <label className="block text-xs text-[#6b7280]">
              Quantity
              <input required type="number" min={0} value={form.quantity} onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))} className={`mt-1 font-mono ${fieldClass}`} />
            </label>
            <label className="block text-xs text-[#6b7280]">
              Reorder point
              <input required type="number" min={0} value={form.reorderPoint} onChange={(e) => setForm((f) => ({ ...f, reorderPoint: e.target.value }))} className={`mt-1 font-mono ${fieldClass}`} />
            </label>
            <label className="block text-xs text-[#6b7280] sm:col-span-2">
              Location *
              <input required value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} className={`mt-1 ${fieldClass}`} />
            </label>
            <div className="flex flex-wrap gap-2 sm:col-span-2 lg:col-span-3">
              <button type="submit" className="rounded-lg bg-[#c9a227] px-4 py-2 text-sm font-semibold text-[#0c0f14] hover:bg-[#ddb92e]">
                {editingId ? "Save changes" : "Add product"}
              </button>
              <button type="button" onClick={cancelEdit} className="rounded-lg border border-[#1e2632] px-4 py-2 text-sm text-[#9aa3ad] hover:bg-[#161c24]">Cancel</button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
