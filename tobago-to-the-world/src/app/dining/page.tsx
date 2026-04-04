import type { Metadata } from "next";
import { CategoryBrowse } from "@/components/CategoryBrowse";

export const metadata: Metadata = {
  title: "Food & dining",
  description:
    "Restaurants and cafés across Tobago — reserve or plan meals inside your TTW booking.",
};

export default function DiningPage() {
  return (
    <CategoryBrowse
      category="dining"
      intro="From treetop creole to beach cafés — line up meals as part of a full-island itinerary."
    />
  );
}
