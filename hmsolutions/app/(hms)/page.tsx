"use client";

import Link from "next/link";
import { useHms } from "@/components/HmsProvider";

export default function DashboardPage() {
  const { state } = useHms();
  const { items, shipments } = state;

  const lowStock = items.filter((i) => i.quantity <= i.reorderPoint);
  const inTransit = shipments.filter((s) => s.status === "in_transit").length;
  const totalQty = items.reduce((a, i) => a + i.quantity, 0);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <p className="text-sm text-[#8b939e]">
        Overview of stock levels and active freight. HMSolutions keeps inventory
        and shipments in sync for your operation.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#1e2632] bg-[#11161d] p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[#6b7280]">
            SKUs tracked
          </p>
          <p className="mt-2 font-mono text-3xl font-semibold text-white tabular-nums">
            {items.length}
          </p>
        </div>
        <div className="rounded-xl border border-[#1e2632] bg-[#11161d] p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[#6b7280]">
            Units on hand
          </p>
          <p className="mt-2 font-mono text-3xl font-semibold text-[#c9a227] tabular-nums">
            {totalQty}
          </p>
        </div>
        <div className="rounded-xl border border-[#1e2632] bg-[#11161d] p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[#6b7280]">
            In transit
          </p>
          <p className="mt-2 font-mono text-3xl font-semibold text-white tabular-nums">
            {inTransit}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[#1e2632] bg-[#11161d]">
          <div className="border-b border-[#1e2632] px-4 py-3">
            <h2 className="text-sm font-semibold text-white">
              Reorder attention
            </h2>
            <p className="text-xs text-[#6b7280]">At or below reorder point</p>
          </div>
          <ul className="divide-y divide-[#1e2632]">
            {lowStock.length === 0 ? (
              <li className="px-4 py-6 text-sm text-[#6b7280]">
                No SKUs need attention.
              </li>
            ) : (
              lowStock.map((i) => (
                <li
                  key={i.id}
                  className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 text-sm"
                >
                  <span className="font-mono text-[#c9a227]">{i.sku}</span>
                  <span className="min-w-0 flex-1 text-[#e8eaed]">{i.name}</span>
                  <span className="font-mono tabular-nums text-[#f59e0b]">
                    {i.quantity} / {i.reorderPoint}
                  </span>
                </li>
              ))
            )}
          </ul>
          <div className="border-t border-[#1e2632] px-4 py-3">
            <Link
              href="/inventory"
              className="text-sm font-medium text-[#c9a227] hover:underline"
            >
              Open inventory →
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-[#1e2632] bg-[#11161d]">
          <div className="border-b border-[#1e2632] px-4 py-3">
            <h2 className="text-sm font-semibold text-white">
              Recent shipments
            </h2>
          </div>
          <ul className="divide-y divide-[#1e2632]">
            {[...shipments]
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .slice(0, 5)
              .map((s) => (
                <li key={s.id} className="px-4 py-3 text-sm">
                  <div className="flex justify-between gap-2">
                    <span className="font-mono text-[#9aa3ad]">
                      {s.reference}
                    </span>
                    <span className="rounded bg-[#1c2430] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#c9a227]">
                      {s.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#6b7280]">
                    {s.origin} → {s.destination}
                  </p>
                </li>
              ))}
          </ul>
          <div className="border-t border-[#1e2632] px-4 py-3">
            <Link
              href="/logistics"
              className="text-sm font-medium text-[#c9a227] hover:underline"
            >
              Open logistics →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
