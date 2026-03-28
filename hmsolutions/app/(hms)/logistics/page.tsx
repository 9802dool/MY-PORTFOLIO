"use client";

import { useState } from "react";
import {
  shipmentStatusLabels,
  useHms,
} from "@/components/HmsProvider";
import type { ShipmentStatus } from "@/lib/types";

const statuses: ShipmentStatus[] = [
  "draft",
  "scheduled",
  "in_transit",
  "delivered",
];

const emptyForm = {
  reference: "",
  origin: "",
  destination: "",
  status: "scheduled" as ShipmentStatus,
  carrier: "",
  eta: "",
  linesText: "SKU qty per line, e.g.\nPAL-001 40\nSTR-9M 6",
};

function parseLines(text: string): { sku: string; quantity: number }[] {
  const lines: { sku: string; quantity: number }[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const parts = line.split(/\s+/);
    if (parts.length < 2) continue;
    const qty = parseInt(parts[parts.length - 1]!, 10);
    if (!Number.isFinite(qty) || qty < 1) continue;
    const sku = parts.slice(0, -1).join(" ");
    if (sku) lines.push({ sku, quantity: qty });
  }
  return lines;
}

export default function LogisticsPage() {
  const { state, upsertShipment, deleteShipment } = useHms();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  function startEdit(id: string) {
    const s = state.shipments.find((x) => x.id === id);
    if (!s) return;
    setEditingId(id);
    setForm({
      reference: s.reference,
      origin: s.origin,
      destination: s.destination,
      status: s.status,
      carrier: s.carrier,
      eta: s.eta ?? "",
      linesText: s.lines
        .map((l) => `${l.sku} ${l.quantity}`)
        .join("\n"),
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const lines = parseLines(form.linesText);
    if (lines.length === 0) {
      alert("Add at least one line with SKU and quantity.");
      return;
    }
    upsertShipment({
      id: editingId ?? undefined,
      reference: form.reference.trim(),
      origin: form.origin.trim(),
      destination: form.destination.trim(),
      status: form.status,
      carrier: form.carrier.trim(),
      eta: form.eta.trim() || null,
      lines,
    });
    cancelEdit();
  }

  const sorted = [...state.shipments].sort((a, b) =>
    b.reference.localeCompare(a.reference),
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <p className="text-sm text-[#8b939e]">
        Shipments, carriers, and line items. Tie freight to SKUs defined in
        inventory.
      </p>

      <div className="space-y-4">
        {sorted.map((s) => (
          <div
            key={s.id}
            className="rounded-xl border border-[#1e2632] bg-[#11161d] p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-lg font-semibold text-[#c9a227]">
                  {s.reference}
                </p>
                <p className="mt-1 text-sm text-[#9aa3ad]">
                  {s.origin} → {s.destination}
                </p>
                <p className="mt-1 text-xs text-[#6b7280]">
                  {s.carrier}
                  {s.eta ? ` · ETA ${s.eta}` : ""}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-[#1c2430] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#e8eaed]">
                  {shipmentStatusLabels[s.status]}
                </span>
                <button
                  type="button"
                  onClick={() => startEdit(s.id)}
                  className="text-sm text-[#c9a227] hover:underline"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      confirm(`Delete shipment ${s.reference}?`)
                    )
                      deleteShipment(s.id);
                  }}
                  className="text-sm text-red-400/90 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
            <ul className="mt-3 border-t border-[#1e2632] pt-3 font-mono text-sm text-[#9aa3ad]">
              {s.lines.map((l) => (
                <li key={`${s.id}-${l.sku}`}>
                  {l.sku} × {l.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[#1e2632] bg-[#11161d] p-5">
        <h2 className="text-sm font-semibold text-white">
          {editingId ? "Edit shipment" : "New shipment"}
        </h2>
        <form onSubmit={submit} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-xs text-[#6b7280]">
            Reference
            <input
              required
              value={form.reference}
              onChange={(e) =>
                setForm((f) => ({ ...f, reference: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 font-mono text-sm text-white outline-none focus:border-[#c9a227]/50"
              placeholder="HMS-2026-0150"
            />
          </label>
          <label className="block text-xs text-[#6b7280]">
            Status
            <select
              value={form.status}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  status: e.target.value as ShipmentStatus,
                }))
              }
              className="mt-1 w-full rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 text-sm text-white outline-none focus:border-[#c9a227]/50"
            >
              {statuses.map((st) => (
                <option key={st} value={st}>
                  {shipmentStatusLabels[st]}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-[#6b7280]">
            Origin
            <input
              required
              value={form.origin}
              onChange={(e) =>
                setForm((f) => ({ ...f, origin: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 text-sm text-white outline-none focus:border-[#c9a227]/50"
            />
          </label>
          <label className="block text-xs text-[#6b7280]">
            Destination
            <input
              required
              value={form.destination}
              onChange={(e) =>
                setForm((f) => ({ ...f, destination: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 text-sm text-white outline-none focus:border-[#c9a227]/50"
            />
          </label>
          <label className="block text-xs text-[#6b7280]">
            Carrier
            <input
              required
              value={form.carrier}
              onChange={(e) =>
                setForm((f) => ({ ...f, carrier: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 text-sm text-white outline-none focus:border-[#c9a227]/50"
            />
          </label>
          <label className="block text-xs text-[#6b7280]">
            ETA (date)
            <input
              type="date"
              value={form.eta}
              onChange={(e) => setForm((f) => ({ ...f, eta: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 text-sm text-white outline-none focus:border-[#c9a227]/50"
            />
          </label>
          <label className="block text-xs text-[#6b7280] sm:col-span-2">
            Lines (SKU + quantity)
            <textarea
              required
              rows={4}
              value={form.linesText}
              onChange={(e) =>
                setForm((f) => ({ ...f, linesText: e.target.value }))
              }
              className="mt-1 w-full rounded-lg border border-[#1e2632] bg-[#0c0f14] px-3 py-2 font-mono text-sm text-white outline-none focus:border-[#c9a227]/50"
            />
          </label>
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-[#c9a227] px-4 py-2 text-sm font-semibold text-[#0c0f14] hover:bg-[#ddb92e]"
            >
              {editingId ? "Save shipment" : "Create shipment"}
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
