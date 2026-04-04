"use client";

import { useBooking } from "@/context/BookingProvider";
import type { Listing } from "@/lib/types";

export function AddToBookingButton({ listing }: { listing: Listing }) {
  const { addListing } = useBooking();
  return (
    <button
      type="button"
      onClick={() => addListing(listing)}
      className="rounded-full bg-tt-coral px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-tt-coral/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tt-ocean"
    >
      Add to booking
    </button>
  );
}
