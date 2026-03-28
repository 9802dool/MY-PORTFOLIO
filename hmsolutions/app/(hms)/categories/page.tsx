"use client";

import { useState } from "react";
import { useHms } from "@/components/HmsProvider";

const fieldClass =
  "w-full rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 text-sm text-white outline-none focus:border-[#c9a227]/50";

const presetColors = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444", "#ec4899", "#06b6d4", "#84cc16"];

export default function CategoriesPage() {
  const { state, upsertCategory, deleteCategory } = useHms();
  const [form, setForm] = useState({ name: "", color: "#3b82f6" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  function startEdit(id: string) {
    const c = state.categories.find((x) => x.id === id);
    if (!c) return;
    setEditingId(id);
    setForm({ name: c.name, color: c.color });
    setShowForm(true);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ name: "", color: "#3b82f6" });
    setShowForm(false);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    upsertCategory({ id: editingId ?? undefined, name: form.name.trim(), color: form.color });
    cancelEdit();
  }

  function productCount(catId: string): number {
    return state.products.filter((p) => p.categoryId === catId).length;
  }

  function totalUnits(catId: string): number {
    return state.products.filter((p) => p.categoryId === catId).reduce((a, p) => a + p.quantity, 0);
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#8b939e]">{state.categories.length} categor{state.categories.length === 1 ? "y" : "ies"}</p>
        <button
          type="button"
          onClick={() => { setShowForm(true); setEditingId(null); setForm({ name: "", color: "#3b82f6" }); }}
          className="rounded-lg bg-[#c9a227] px-4 py-2 text-sm font-semibold text-[#0c0f14] hover:bg-[#ddb92e]"
        >
          + Add category
        </button>
      </div>

      {showForm ? (
        <div className="rounded-xl border border-[#1e2632] bg-[#11161d] p-5">
          <h2 className="text-sm font-semibold text-white">{editingId ? "Edit category" : "New category"}</h2>
          <form onSubmit={submit} className="mt-4 flex flex-wrap items-end gap-4">
            <label className="block flex-1 text-xs text-[#6b7280]">
              Name *
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={`mt-1 ${fieldClass}`} />
            </label>
            <div className="text-xs text-[#6b7280]">
              Color
              <div className="mt-1 flex gap-1.5">
                {presetColors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, color: c }))}
                    className={`h-7 w-7 rounded-full border-2 transition ${form.color === c ? "border-white scale-110" : "border-transparent"}`}
                    style={{ backgroundColor: c }}
                    aria-label={c}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="rounded-lg bg-[#c9a227] px-4 py-2 text-sm font-semibold text-[#0c0f14] hover:bg-[#ddb92e]">
                {editingId ? "Save" : "Add"}
              </button>
              <button type="button" onClick={cancelEdit} className="rounded-lg border border-[#1e2632] px-4 py-2 text-sm text-[#9aa3ad] hover:bg-[#161c24]">Cancel</button>
            </div>
          </form>
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {state.categories.map((cat) => (
          <div key={cat.id} className="rounded-xl border border-[#1e2632] bg-[#11161d] p-4">
            <div className="flex items-center gap-3">
              <span className="h-4 w-4 rounded-full" style={{ backgroundColor: cat.color }} />
              <p className="text-sm font-semibold text-white">{cat.name}</p>
            </div>
            <div className="mt-3 flex gap-4 text-xs text-[#6b7280]">
              <span>{productCount(cat.id)} product{productCount(cat.id) === 1 ? "" : "s"}</span>
              <span>{totalUnits(cat.id).toLocaleString()} units</span>
            </div>
            <div className="mt-3 flex gap-2 border-t border-[#1e2632] pt-3">
              <button type="button" onClick={() => startEdit(cat.id)} className="text-xs text-[#c9a227] hover:underline">Edit</button>
              <button
                type="button"
                onClick={() => {
                  const count = productCount(cat.id);
                  if (count > 0) { alert(`Cannot delete — ${count} product(s) use this category.`); return; }
                  if (confirm(`Delete "${cat.name}"?`)) deleteCategory(cat.id);
                }}
                className="text-xs text-red-400/80 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
