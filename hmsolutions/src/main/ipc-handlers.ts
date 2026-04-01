import { ipcMain } from "electron";
import type {
  CreateCategoryInput,
  CreateItemInput,
  SearchItemsParams,
  UpdateCategoryInput,
  UpdateItemInput,
} from "../shared/types";
import {
  createCategory,
  createItem,
  deleteCategory,
  deleteItem,
  getDashboardStats,
  getLowStockItems,
  getRecentItems,
  getReportData,
  listCategories,
  listItems,
  searchItems,
  updateCategory,
  updateItem,
} from "./database";

export function registerIpcHandlers(): void {
  ipcMain.handle("categories:list", () => listCategories());
  ipcMain.handle("categories:create", (_e, input: CreateCategoryInput) =>
    createCategory(input),
  );
  ipcMain.handle("categories:update", (_e, input: UpdateCategoryInput) =>
    updateCategory(input),
  );
  ipcMain.handle("categories:delete", (_e, id: number) => deleteCategory(id));

  ipcMain.handle("items:list", () => listItems());
  ipcMain.handle("items:search", (_e, params: SearchItemsParams) =>
    searchItems(params),
  );
  ipcMain.handle("items:create", (_e, input: CreateItemInput) => createItem(input));
  ipcMain.handle("items:update", (_e, input: UpdateItemInput) => updateItem(input));
  ipcMain.handle("items:delete", (_e, id: number) => deleteItem(id));

  ipcMain.handle("dashboard:stats", () => getDashboardStats());
  ipcMain.handle("dashboard:recent", () => getRecentItems(12));
  ipcMain.handle("dashboard:lowStock", () => getLowStockItems());

  ipcMain.handle("reports:data", (_e, params: SearchItemsParams) => getReportData(params));
}
