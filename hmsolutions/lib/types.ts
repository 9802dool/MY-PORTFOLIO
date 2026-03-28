export type Category = {
  id: string;
  name: string;
  color: string;
};

export type Supplier = {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  description: string;
  categoryId: string;
  supplierId: string;
  costPrice: number;
  sellPrice: number;
  quantity: number;
  unit: string;
  location: string;
  reorderPoint: number;
  updatedAt: string;
};

export type MovementType =
  | "received"
  | "sold"
  | "adjusted"
  | "returned"
  | "damaged";

export type StockMovement = {
  id: string;
  productId: string;
  type: MovementType;
  quantity: number;
  note: string;
  createdAt: string;
};

export type HmsState = {
  products: Product[];
  categories: Category[];
  suppliers: Supplier[];
  movements: StockMovement[];
};
