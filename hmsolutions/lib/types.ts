export type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  unit: string;
  location: string;
  reorderPoint: number;
  updatedAt: string;
};

export type ShipmentStatus =
  | "draft"
  | "scheduled"
  | "in_transit"
  | "delivered";

export type ShipmentLine = { sku: string; quantity: number };

export type Shipment = {
  id: string;
  reference: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  carrier: string;
  eta: string | null;
  lines: ShipmentLine[];
  createdAt: string;
};

export type HmsState = {
  items: InventoryItem[];
  shipments: Shipment[];
};
