"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { BookingLine, Listing } from "@/lib/types";
import { ALL_IN_ONE_LISTING_IDS, getListingById } from "@/lib/data";

type BookingContextValue = {
  lines: BookingLine[];
  addListing: (listing: Listing) => void;
  removeLine: (key: string) => void;
  clear: () => void;
  loadAllInOnePackage: () => void;
  totalTtd: number;
  count: number;
};

const BookingContext = createContext<BookingContextValue | null>(null);

function lineKey(listingId: string) {
  return `${listingId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<BookingLine[]>([]);

  const addListing = useCallback((listing: Listing) => {
    setLines((prev) => [
      ...prev,
      {
        key: lineKey(listing.id),
        listingId: listing.id,
        category: listing.category,
        name: listing.name,
        priceFromTtd: listing.priceFromTtd,
      },
    ]);
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const loadAllInOnePackage = useCallback(() => {
    const next: BookingLine[] = [];
    for (const id of ALL_IN_ONE_LISTING_IDS) {
      const l = getListingById(id);
      if (l) {
        next.push({
          key: lineKey(l.id),
          listingId: l.id,
          category: l.category,
          name: l.name,
          priceFromTtd: l.priceFromTtd,
        });
      }
    }
    setLines(next);
  }, []);

  const totalTtd = useMemo(
    () => lines.reduce((s, l) => s + l.priceFromTtd, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      addListing,
      removeLine,
      clear,
      loadAllInOnePackage,
      totalTtd,
      count: lines.length,
    }),
    [lines, addListing, removeLine, clear, loadAllInOnePackage, totalTtd],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
