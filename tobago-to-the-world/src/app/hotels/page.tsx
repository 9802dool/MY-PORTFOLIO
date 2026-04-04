import type { Metadata } from "next";
import { CategoryBrowse } from "@/components/CategoryBrowse";

export const metadata: Metadata = {
  title: "Hotels & stays",
  description:
    "Compare Tobago hotels and guest stays — add your pick to a single TTW booking.",
};

export default function HotelsPage() {
  return (
    <CategoryBrowse
      category="hotel"
      intro="From Crown Point to Speyside and Castara, choose where you stay and merge it with tours and transport in one itinerary."
    />
  );
}
