import Link from "next/link";
import type { Listing, ServiceCategory } from "@/lib/types";
import { categoryLabels, categoryPaths } from "@/lib/data";
import { AddToBookingButton } from "./AddToBookingButton";

const accent: Record<ServiceCategory, string> = {
  hotel: "from-tt-ocean/30 to-tt-palm/20",
  attraction: "from-tt-coral/25 to-amber-200/30",
  taxi: "from-slate-600/30 to-tt-ocean/25",
  boat: "from-sky-500/30 to-tt-ocean/35",
  dining: "from-orange-300/40 to-tt-coral/20",
  nightlife: "from-violet-600/35 to-fuchsia-500/25",
};

export function ListingCard({ listing }: { listing: Listing }) {
  const catLabel = categoryLabels[listing.category];
  const catPath = categoryPaths[listing.category];
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-tt-sand-dark/20 bg-white shadow-sm ring-1 ring-black/5">
      <div
        className={`relative h-40 bg-gradient-to-br ${accent[listing.category]} flex items-end p-4`}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h60v60H0z%22%20fill%3D%22none%22%2F%3E%3Cpath%20d%3D%22M30%205L5%2020l25%2015%2025-15L30%205z%22%20fill%3D%22%23fff%22%20fill-opacity%3D%22.08%22%2F%3E%3C%2Fsvg%3E')] opacity-60" />
        <Link
          href={catPath}
          className="relative z-10 text-xs font-semibold uppercase tracking-wide text-tt-ocean/90 hover:underline"
        >
          {catLabel}
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-lg font-semibold text-tt-ink">
            {listing.name}
          </h3>
          <p className="mt-1 text-sm text-tt-ink-muted">{listing.location}</p>
          <p className="mt-2 text-sm leading-relaxed text-tt-ink-muted">
            {listing.shortDescription}
          </p>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-tt-sand-dark/15 pt-4">
          <p className="text-sm font-medium text-tt-ocean">
            From <span className="font-semibold">TTD {listing.priceFromTtd}</span>
          </p>
          <AddToBookingButton listing={listing} />
        </div>
      </div>
    </article>
  );
}
