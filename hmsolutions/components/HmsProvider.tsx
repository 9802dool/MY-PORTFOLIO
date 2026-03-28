"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { seedState } from "@/lib/defaults";
import type {
  HmsState,
  Product,
  Category,
  Supplier,
  StockMovement,
  MovementType,
} from "@/lib/types";

const STORAGE_KEY = "hmsolutions-inv-v2";

type Action =
  | { type: "HYDRATE"; state: HmsState }
  | { type: "UPSERT_PRODUCT"; product: Product }
  | { type: "DELETE_PRODUCT"; id: string }
  | { type: "UPSERT_CATEGORY"; category: Category }
  | { type: "DELETE_CATEGORY"; id: string }
  | { type: "UPSERT_SUPPLIER"; supplier: Supplier }
  | { type: "DELETE_SUPPLIER"; id: string }
  | { type: "ADD_MOVEMENT"; movement: StockMovement };

function reducer(state: HmsState, action: Action): HmsState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;
    case "UPSERT_PRODUCT": {
      const rest = state.products.filter((p) => p.id !== action.product.id);
      return { ...state, products: [...rest, action.product] };
    }
    case "DELETE_PRODUCT":
      return { ...state, products: state.products.filter((p) => p.id !== action.id) };
    case "UPSERT_CATEGORY": {
      const rest = state.categories.filter((c) => c.id !== action.category.id);
      return { ...state, categories: [...rest, action.category] };
    }
    case "DELETE_CATEGORY":
      return { ...state, categories: state.categories.filter((c) => c.id !== action.id) };
    case "UPSERT_SUPPLIER": {
      const rest = state.suppliers.filter((s) => s.id !== action.supplier.id);
      return { ...state, suppliers: [...rest, action.supplier] };
    }
    case "DELETE_SUPPLIER":
      return { ...state, suppliers: state.suppliers.filter((s) => s.id !== action.id) };
    case "ADD_MOVEMENT": {
      const mv = action.movement;
      const products = state.products.map((p) => {
        if (p.id !== mv.productId) return p;
        const delta = mv.type === "received" || mv.type === "returned" ? mv.quantity : -mv.quantity;
        return { ...p, quantity: Math.max(0, p.quantity + delta), updatedAt: mv.createdAt };
      });
      return { ...state, products, movements: [...state.movements, mv] };
    }
    default:
      return state;
  }
}

function loadInitial(): HmsState {
  if (typeof window === "undefined") return seedState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedState();
    const parsed = JSON.parse(raw) as HmsState;
    if (!parsed?.products || !parsed?.categories || !parsed?.suppliers || !parsed?.movements) return seedState();
    return parsed;
  } catch {
    return seedState();
  }
}

function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export type HmsCtx = {
  state: HmsState;
  upsertProduct: (p: Omit<Product, "id" | "updatedAt"> & { id?: string }) => void;
  deleteProduct: (id: string) => void;
  upsertCategory: (c: Omit<Category, "id"> & { id?: string }) => void;
  deleteCategory: (id: string) => void;
  upsertSupplier: (s: Omit<Supplier, "id"> & { id?: string }) => void;
  deleteSupplier: (id: string) => void;
  addMovement: (m: { productId: string; type: MovementType; quantity: number; note: string }) => void;
  resetDemo: () => void;
};

const HmsContext = createContext<HmsCtx | null>(null);

export function HmsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, seedState());

  useEffect(() => {
    dispatch({ type: "HYDRATE", state: loadInitial() });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const upsertProduct = useCallback(
    (p: Omit<Product, "id" | "updatedAt"> & { id?: string }) => {
      dispatch({ type: "UPSERT_PRODUCT", product: { ...p, id: p.id ?? newId("p"), updatedAt: new Date().toISOString() } });
    }, [],
  );

  const deleteProduct = useCallback((id: string) => dispatch({ type: "DELETE_PRODUCT", id }), []);

  const upsertCategory = useCallback(
    (c: Omit<Category, "id"> & { id?: string }) => {
      dispatch({ type: "UPSERT_CATEGORY", category: { ...c, id: c.id ?? newId("cat") } });
    }, [],
  );

  const deleteCategory = useCallback((id: string) => dispatch({ type: "DELETE_CATEGORY", id }), []);

  const upsertSupplier = useCallback(
    (s: Omit<Supplier, "id"> & { id?: string }) => {
      dispatch({ type: "UPSERT_SUPPLIER", supplier: { ...s, id: s.id ?? newId("sup") } });
    }, [],
  );

  const deleteSupplier = useCallback((id: string) => dispatch({ type: "DELETE_SUPPLIER", id }), []);

  const addMovement = useCallback(
    (m: { productId: string; type: MovementType; quantity: number; note: string }) => {
      dispatch({
        type: "ADD_MOVEMENT",
        movement: { ...m, id: newId("mv"), createdAt: new Date().toISOString() },
      });
    }, [],
  );

  const resetDemo = useCallback(() => dispatch({ type: "HYDRATE", state: seedState() }), []);

  const value = useMemo<HmsCtx>(
    () => ({ state, upsertProduct, deleteProduct, upsertCategory, deleteCategory, upsertSupplier, deleteSupplier, addMovement, resetDemo }),
    [state, upsertProduct, deleteProduct, upsertCategory, deleteCategory, upsertSupplier, deleteSupplier, addMovement, resetDemo],
  );

  return <HmsContext.Provider value={value}>{children}</HmsContext.Provider>;
}

export function useHms(): HmsCtx {
  const c = useContext(HmsContext);
  if (!c) throw new Error("useHms must be used within HmsProvider");
  return c;
}

export const movementTypeLabels: Record<MovementType, string> = {
  received: "Received",
  sold: "Sold",
  adjusted: "Adjusted",
  returned: "Returned",
  damaged: "Damaged",
};

export const movementTypeColors: Record<MovementType, string> = {
  received: "text-emerald-400",
  sold: "text-blue-400",
  adjusted: "text-amber-400",
  returned: "text-purple-400",
  damaged: "text-red-400",
};
