import type { HmsState } from "./types";

/** Demo seed data when local storage is empty. */
export function seedState(): HmsState {
  const now = new Date().toISOString();
  return {
    items: [
      {
        id: "it-1",
        sku: "PAL-001",
        name: "Euro pallet 1200×800",
        quantity: 240,
        unit: "ea",
        location: "Warehouse A · Bay 3",
        reorderPoint: 80,
        updatedAt: now,
      },
      {
        id: "it-2",
        sku: "CRG-22L",
        name: "Insulated crate 22L",
        quantity: 45,
        unit: "ea",
        location: "Cold store 1",
        reorderPoint: 60,
        updatedAt: now,
      },
      {
        id: "it-3",
        sku: "STR-9M",
        name: "Strapping roll 9mm",
        quantity: 18,
        unit: "rolls",
        location: "Warehouse B",
        reorderPoint: 24,
        updatedAt: now,
      },
    ],
    shipments: [
      {
        id: "sh-1",
        reference: "HMS-2026-0142",
        origin: "Port of Spain DC",
        destination: "San Fernando Hub",
        status: "in_transit",
        carrier: "Island Freight Co.",
        eta: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
        lines: [
          { sku: "PAL-001", quantity: 40 },
          { sku: "STR-9M", quantity: 6 },
        ],
        createdAt: now,
      },
      {
        id: "sh-2",
        reference: "HMS-2026-0143",
        origin: "Warehouse A",
        destination: "Tobago express",
        status: "scheduled",
        carrier: "Blue Line Logistics",
        eta: new Date(Date.now() + 86400000 * 5).toISOString().slice(0, 10),
        lines: [{ sku: "CRG-22L", quantity: 12 }],
        createdAt: now,
      },
    ],
  };
}
