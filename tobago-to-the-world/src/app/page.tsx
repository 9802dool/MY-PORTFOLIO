import Link from "next/link";
import { categoryLabels, categoryPaths, listings } from "@/lib/data";
import type { ServiceCategory } from "@/lib/types";
import { ListingCard } from "@/components/ListingCard";

const categories: ServiceCategory[] = [
  "hotel",
  "attraction",
  "taxi",
  "boat",
  "dining",
  "nightlife",
];

export default function HomePage() {
  const featured = listings.slice(0, 6);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-tt-ocean to-tt-ocean/90 text-tt-cream">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-tt-coral via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-tt-cream/80">
            TTW
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Tobago To The World
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-tt-cream/90 sm:text-xl">
            Discover hotels, reef trips, island taxis, boat charters, local food, and
            nightlife — then{" "}
            <strong className="font-semibold text-white">
              book everything in one checkout
            </strong>{" "}
            or build a trip that fits you.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-tt-coral px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-tt-coral/90"
            >
              Start your booking
            </Link>
            <Link
              href="/hotels"
              className="inline-flex items-center justify-center rounded-full border border-tt-cream/40 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Browse services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-tt-ink sm:text-3xl">
          Explore by category
        </h2>
        <p className="mt-2 max-w-2xl text-tt-ink-muted">
          Every part of your Tobago stay, linked to one cart and one request.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <li key={cat}>
              <Link
                href={categoryPaths[cat]}
                className="flex h-full flex-col rounded-2xl border border-tt-sand-dark/25 bg-white p-6 shadow-sm transition hover:border-tt-ocean/30 hover:shadow-md"
              >
                <span className="font-display text-lg font-semibold text-tt-ocean">
                  {categoryLabels[cat]}
                </span>
                <span className="mt-2 text-sm text-tt-ink-muted">
                  View options and add to your booking.
                </span>
                <span className="mt-4 text-sm font-semibold text-tt-coral">
                  Open →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-tt-sand-dark/20 bg-white/60 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-tt-ink sm:text-3xl">
                Featured picks
              </h2>
              <p className="mt-2 text-tt-ink-muted">
                A taste of what you can combine on TTW.
              </p>
            </div>
            <Link
              href="/book"
              className="text-sm font-semibold text-tt-ocean hover:underline"
            >
              Go to book →
            </Link>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
