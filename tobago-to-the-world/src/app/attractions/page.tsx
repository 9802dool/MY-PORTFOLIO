import type { Metadata } from "next";
import { CategoryBrowse } from "@/components/CategoryBrowse";

export const metadata: Metadata = {
  title: "Attractions",
  description:
    "Reefs, waterfalls, and heritage sites in Tobago — add to your TTW booking.",
};

export default function AttractionsPage() {
  return (
    <CategoryBrowse
      category="attraction"
      intro="Classic Tobago experiences: Buccoo Reef, Argyle Waterfall, Fort King George, and more — stack them with hotels and rides."
    />
  );
}
