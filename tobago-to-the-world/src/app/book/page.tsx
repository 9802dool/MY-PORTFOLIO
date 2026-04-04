import type { Metadata } from "next";
import { BookPageClient } from "./BookPageClient";

export const metadata: Metadata = {
  title: "Book",
  description:
    "Combine hotels, tours, transport, boats, dining, and nightlife in one Tobago booking — or customize your cart.",
};

export default function BookPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-tt-coral">
        TTW
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-tt-ink sm:text-4xl">
        One booking, your way
      </h1>
      <p className="mt-4 max-w-2xl text-tt-ink-muted">
        Load our all-in-one package across every service type, or browse the site and add
        only what you want. Everything stays in this cart until you submit your request.
      </p>
      <div className="mt-12">
        <BookPageClient />
      </div>
    </div>
  );
}
