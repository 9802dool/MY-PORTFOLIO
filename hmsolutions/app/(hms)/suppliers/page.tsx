"use client";

import { useState } from "react";
import { useHms } from "@/components/HmsProvider";

const fieldClass =
  "w-full rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 text-sm text-white outline-none focus:border-[#c9a227]/50";

const emptyForm = { name: "", contact: "", email: "", phone: "" };

export default function SuppliersPage() {
  const { state, upsertSupplier, deleteSupplier } = useHms();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  function startEdit(id: string) {
    const s = state.suppliers.find((x) => x.id === id);
    if (!s) return;
    setEditingId(id);
    setForm({ name: s.name, contact: s.contact, email: s.email, phone: s.phone });
    setShowForm(true);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(false);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    upsertSupplier({
      id: editingId ?? undefined,
      name: form.name.trim(),
      contact: form.contact.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
    });
    cancelEdit();
  }

  function productCount(supId: string): number {
    return state.products.filter((p) => p.supplierId === supId).length;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#8b939e]">{state.suppliers.length} supplier{state.suppliers.length === 1 ? "" : "s"}</p>
        <button
          type="button"
          onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
          className="rounded-lg bg-[#c9a227] px-4 py-2 text-sm font-semibold text-[#0c0f14] hover:bg-[#ddb92e]"
        >
          + Add supplier
        </button>
      </div>

      {showForm ? (
        <div className="rounded-xl border border-[#1e2632] bg-[#11161d] p-5">
          <h2 className="text-sm font-semibold text-white">{editingId ? "Edit supplier" : "New supplier"}</h2>
          <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block text-xs text-[#6b7280]">
              Company name *
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={`mt-1 ${fieldClass}`} />
            </label>
            <label className="block text-xs text-[#6b7280]">
              Contact person
              <input value={form.contact} onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))} className={`mt-1 ${fieldClass}`} />
            </label>
            <label className="block text-xs text-[#6b7280]">
              Email
              <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} className={`mt-1 ${fieldClass}`} />
            </label>
            <label className="block text-xs text-[#6b7280]">
              Phone
              <input type="tel" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} className={`mt-1 ${fieldClass}`} />
            </label>
            <div className="flex flex-wrap gap-2 sm:col-span-2">
              <button type="submit" className="rounded-lg bg-[#c9a227] px-4 py-2 text-sm font-semibold text-[#0c0f14] hover:bg-[#ddb92e]">
                {editingId ? "Save changes" : "Add supplier"}
              </button>
              <button type="button" onClick={cancelEdit} className="rounded-lg border border-[#1e2632] px-4 py-2 text-sm text-[#9aa3ad] hover:bg-[#161c24]">Cancel</button>
            </div>
          </form>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-[#1e2632] bg-[#11161d]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#1e2632] text-[11px] uppercase tracking-wide text-[#6b7280]">
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Products</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2632]">
              {state.suppliers.map((s) => (
                <tr key={s.id} className="text-[#e8eaed] hover:bg-[#161c24]">
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-[#9aa3ad]">{s.contact || "—"}</td>
                  <td className="px-4 py-3">
                    {s.email ? <a href={`mailto:${s.email}`} className="text-[#c9a227] hover:underline">{s.email}</a> : <span className="text-[#6b7280]">—</span>}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-[#9aa3ad]">{s.phone || "—"}</td>
                  <td className="px-4 py-3 font-mono tabular-nums text-[#9aa3ad]">{productCount(s.id)}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <button type="button" onClick={() => startEdit(s.id)} className="mr-2 text-xs text-[#c9a227] hover:underline">Edit</button>
                    <button
                      type="button"
                      onClick={() => {
                        const count = productCount(s.id);
                        if (count > 0) { alert(`Cannot delete — ${count} product(s) use this supplier.`); return; }
                        if (confirm(`Delete "${s.name}"?`)) deleteSupplier(s.id);
                      }}
                      className="text-xs text-red-400/80 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {state.suppliers.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-[#6b7280]">No suppliers added yet.</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
