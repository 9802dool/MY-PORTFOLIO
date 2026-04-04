import { listingsByCategory, categoryLabels } from "@/lib/data";
import type { ServiceCategory } from "@/lib/types";
import { ListingCard } from "./ListingCard";

type Props = {
  category: ServiceCategory;
  intro: string;
};

export function CategoryBrowse({ category, intro }: Props) {
  const items = listingsByCategory(category);
  const title = categoryLabels[category];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-tt-coral">
        TTW
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-tt-ink sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-tt-ink-muted">{intro}</p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </div>
  );
}
