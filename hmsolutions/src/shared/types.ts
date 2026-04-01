export type Category = {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
};

export type Item = {
  id: number;
  name: string;
  sku: string | null;
  category_id: number | null;
  quantity: number;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type ItemWithCategory = Item & {
  category_name: string | null;
};

export type DashboardStats = {
  totalItems: number;
  lowStockCount: number;
  categoryCount: number;
};

export type CreateCategoryInput = {
  name: string;
  description?: string | null;
};

export type UpdateCategoryInput = {
  id: number;
  name: string;
  description?: string | null;
};

export type CreateItemInput = {
  name: string;
  sku?: string | null;
  category_id?: number | null;
  quantity: number;
  description?: string | null;
};

export type UpdateItemInput = CreateItemInput & { id: number };

export type SearchItemsParams = {
  query?: string;
  categoryId?: number | null;
};

/** Filtered rows plus aggregates for reports (same filters as search). */
export type ReportData = {
  items: ItemWithCategory[];
  totalQty: number;
};
