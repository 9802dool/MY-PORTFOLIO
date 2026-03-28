import type { HmsState } from "./types";

export function seedState(): HmsState {
  const now = new Date().toISOString();
  return {
    categories: [
      { id: "cat-1", name: "Electronics", color: "#3b82f6" },
      { id: "cat-2", name: "Office Supplies", color: "#10b981" },
      { id: "cat-3", name: "Packaging", color: "#f59e0b" },
      { id: "cat-4", name: "Furniture", color: "#8b5cf6" },
      { id: "cat-5", name: "Cleaning", color: "#ef4444" },
    ],
    suppliers: [
      { id: "sup-1", name: "TechWorld Distributors", contact: "Maria Chen", email: "maria@techworld.com", phone: "+1 868-555-0101" },
      { id: "sup-2", name: "Caribbean Office Supply", contact: "James Rampersad", email: "james@cariboffice.tt", phone: "+1 868-555-0202" },
      { id: "sup-3", name: "Island Pack Co.", contact: "David Mohammed", email: "david@islandpack.com", phone: "+1 868-555-0303" },
    ],
    products: [
      { id: "p-1", sku: "ELC-001", name: "Wireless Mouse", description: "Ergonomic 2.4GHz wireless mouse", categoryId: "cat-1", supplierId: "sup-1", costPrice: 12.50, sellPrice: 24.99, quantity: 145, unit: "ea", location: "Shelf A-1", reorderPoint: 30, updatedAt: now },
      { id: "p-2", sku: "ELC-002", name: "USB-C Hub 7-port", description: "Multi-port USB-C docking hub", categoryId: "cat-1", supplierId: "sup-1", costPrice: 28.00, sellPrice: 54.99, quantity: 62, unit: "ea", location: "Shelf A-2", reorderPoint: 15, updatedAt: now },
      { id: "p-3", sku: "OFF-010", name: "A4 Copy Paper (ream)", description: "500 sheets 80gsm white A4", categoryId: "cat-2", supplierId: "sup-2", costPrice: 3.50, sellPrice: 7.99, quantity: 320, unit: "reams", location: "Bay B-3", reorderPoint: 100, updatedAt: now },
      { id: "p-4", sku: "OFF-011", name: "Ballpoint Pen Box (50)", description: "Black medium-point ballpoint pens", categoryId: "cat-2", supplierId: "sup-2", costPrice: 8.00, sellPrice: 15.99, quantity: 18, unit: "boxes", location: "Bay B-1", reorderPoint: 25, updatedAt: now },
      { id: "p-5", sku: "PKG-020", name: "Bubble Mailer Large", description: "14x19 inch self-seal bubble mailer", categoryId: "cat-3", supplierId: "sup-3", costPrice: 0.45, sellPrice: 1.29, quantity: 800, unit: "ea", location: "Bay C-2", reorderPoint: 200, updatedAt: now },
      { id: "p-6", sku: "PKG-021", name: "Shipping Box 12x12x12", description: "Corrugated cardboard box", categoryId: "cat-3", supplierId: "sup-3", costPrice: 1.20, sellPrice: 2.99, quantity: 150, unit: "ea", location: "Bay C-3", reorderPoint: 50, updatedAt: now },
      { id: "p-7", sku: "FRN-030", name: "Ergonomic Desk Chair", description: "Adjustable mesh-back office chair", categoryId: "cat-4", supplierId: "sup-1", costPrice: 145.00, sellPrice: 289.99, quantity: 8, unit: "ea", location: "Showroom", reorderPoint: 3, updatedAt: now },
      { id: "p-8", sku: "CLN-040", name: "Disinfectant Spray (500ml)", description: "All-surface antibacterial spray", categoryId: "cat-5", supplierId: "sup-2", costPrice: 2.80, sellPrice: 5.99, quantity: 95, unit: "bottles", location: "Bay D-1", reorderPoint: 40, updatedAt: now },
    ],
    movements: [
      { id: "mv-1", productId: "p-1", type: "received", quantity: 50, note: "PO-2026-001 from TechWorld", createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
      { id: "mv-2", productId: "p-3", type: "sold", quantity: 25, note: "Order #1042", createdAt: new Date(Date.now() - 86400000).toISOString() },
      { id: "mv-3", productId: "p-5", type: "received", quantity: 200, note: "Restock shipment", createdAt: new Date(Date.now() - 86400000 * 3).toISOString() },
      { id: "mv-4", productId: "p-4", type: "damaged", quantity: 2, note: "Water damage in storage", createdAt: new Date(Date.now() - 3600000 * 5).toISOString() },
      { id: "mv-5", productId: "p-7", type: "sold", quantity: 1, note: "Walk-in customer", createdAt: now },
    ],
  };
}
