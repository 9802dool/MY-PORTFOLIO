import type {
  Category,
  CreateCategoryInput,
  CreateItemInput,
  DashboardStats,
  ItemWithCategory,
  ReportData,
  SearchItemsParams,
  UpdateCategoryInput,
  UpdateItemInput,
} from "./types";

export type HmsolutionsAPI = {
  categories: {
    list: () => Promise<Category[]>;
    create: (input: CreateCategoryInput) => Promise<Category>;
    update: (input: UpdateCategoryInput) => Promise<Category | null>;
    delete: (id: number) => Promise<boolean>;
  };
  items: {
    list: () => Promise<ItemWithCategory[]>;
    search: (params: SearchItemsParams) => Promise<ItemWithCategory[]>;
    create: (input: CreateItemInput) => Promise<ItemWithCategory>;
    update: (input: UpdateItemInput) => Promise<ItemWithCategory | null>;
    delete: (id: number) => Promise<boolean>;
  };
  dashboard: {
    stats: () => Promise<DashboardStats>;
    recent: () => Promise<ItemWithCategory[]>;
    lowStock: () => Promise<ItemWithCategory[]>;
  };
  reports: {
    data: (params: SearchItemsParams) => Promise<ReportData>;
  };
};
