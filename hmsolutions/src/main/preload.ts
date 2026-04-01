import { contextBridge, ipcRenderer } from "electron";
import type { HmsolutionsAPI } from "../shared/hmsolutions-api";
import type {
  CreateCategoryInput,
  CreateItemInput,
  SearchItemsParams,
  UpdateCategoryInput,
  UpdateItemInput,
} from "../shared/types";

const api: HmsolutionsAPI = {
  categories: {
    list: () => ipcRenderer.invoke("categories:list"),
    create: (input: CreateCategoryInput) => ipcRenderer.invoke("categories:create", input),
    update: (input: UpdateCategoryInput) => ipcRenderer.invoke("categories:update", input),
    delete: (id: number) => ipcRenderer.invoke("categories:delete", id),
  },
  items: {
    list: () => ipcRenderer.invoke("items:list"),
    search: (params: SearchItemsParams) => ipcRenderer.invoke("items:search", params),
    create: (input: CreateItemInput) => ipcRenderer.invoke("items:create", input),
    update: (input: UpdateItemInput) => ipcRenderer.invoke("items:update", input),
    delete: (id: number) => ipcRenderer.invoke("items:delete", id),
  },
  dashboard: {
    stats: () => ipcRenderer.invoke("dashboard:stats"),
    recent: () => ipcRenderer.invoke("dashboard:recent"),
    lowStock: () => ipcRenderer.invoke("dashboard:lowStock"),
  },
  reports: {
    data: (params: SearchItemsParams) => ipcRenderer.invoke("reports:data", params),
  },
};

contextBridge.exposeInMainWorld("hmsolutions", api);
