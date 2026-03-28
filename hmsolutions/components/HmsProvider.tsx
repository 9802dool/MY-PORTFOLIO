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
  InventoryItem,
  Shipment,
  ShipmentStatus,
} from "@/lib/types";

const STORAGE_KEY = "hmsolutions-data-v1";

type Action =
  | { type: "UPSERT_ITEM"; item: InventoryItem }
  | { type: "DELETE_ITEM"; id: string }
  | { type: "UPSERT_SHIPMENT"; shipment: Shipment }
  | { type: "DELETE_SHIPMENT"; id: string }
  | { type: "HYDRATE"; state: HmsState };

function reducer(state: HmsState, action: Action): HmsState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;
    case "UPSERT_ITEM": {
      const rest = state.items.filter((i) => i.id !== action.item.id);
      return { ...state, items: [...rest, action.item] };
    }
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.id),
      };
    case "UPSERT_SHIPMENT": {
      const rest = state.shipments.filter((s) => s.id !== action.shipment.id);
      return { ...state, shipments: [...rest, action.shipment] };
    }
    case "DELETE_SHIPMENT":
      return {
        ...state,
        shipments: state.shipments.filter((s) => s.id !== action.id),
      };
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
    if (!parsed?.items || !parsed?.shipments) return seedState();
    return parsed;
  } catch {
    return seedState();
  }
}

type Ctx = {
  state: HmsState;
  upsertItem: (item: Omit<InventoryItem, "id" | "updatedAt"> & { id?: string }) => void;
  deleteItem: (id: string) => void;
  upsertShipment: (
    s: Omit<Shipment, "id" | "createdAt"> & { id?: string },
  ) => void;
  deleteShipment: (id: string) => void;
  resetDemo: () => void;
};

const HmsContext = createContext<Ctx | null>(null);

function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function HmsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, seedState());

  useEffect(() => {
    dispatch({ type: "HYDRATE", state: loadInitial() });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const upsertItem = useCallback(
    (
      item: Omit<InventoryItem, "id" | "updatedAt"> & { id?: string },
    ) => {
      const id = item.id ?? newId("it");
      const row: InventoryItem = {
        ...item,
        id,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: "UPSERT_ITEM", item: row });
    },
    [],
  );

  const deleteItem = useCallback((id: string) => {
    dispatch({ type: "DELETE_ITEM", id });
  }, []);

  const upsertShipment = useCallback(
    (s: Omit<Shipment, "id" | "createdAt"> & { id?: string }) => {
      const id = s.id ?? newId("sh");
      const existing = state.shipments.find((x) => x.id === id);
      const row: Shipment = {
        ...s,
        id,
        createdAt: existing?.createdAt ?? new Date().toISOString(),
      };
      dispatch({ type: "UPSERT_SHIPMENT", shipment: row });
    },
    [state.shipments],
  );

  const deleteShipment = useCallback((id: string) => {
    dispatch({ type: "DELETE_SHIPMENT", id });
  }, []);

  const resetDemo = useCallback(() => {
    const s = seedState();
    dispatch({ type: "HYDRATE", state: s });
  }, []);

  const value = useMemo(
    () => ({
      state,
      upsertItem,
      deleteItem,
      upsertShipment,
      deleteShipment,
      resetDemo,
    }),
    [
      state,
      upsertItem,
      deleteItem,
      upsertShipment,
      deleteShipment,
      resetDemo,
    ],
  );

  return <HmsContext.Provider value={value}>{children}</HmsContext.Provider>;
}

export function useHms(): Ctx {
  const c = useContext(HmsContext);
  if (!c) throw new Error("useHms must be used within HmsProvider");
  return c;
}

export const shipmentStatusLabels: Record<ShipmentStatus, string> = {
  draft: "Draft",
  scheduled: "Scheduled",
  in_transit: "In transit",
  delivered: "Delivered",
};
