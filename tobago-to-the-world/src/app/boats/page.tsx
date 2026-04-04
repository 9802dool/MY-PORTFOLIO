import type { Metadata } from "next";
import { CategoryBrowse } from "@/components/CategoryBrowse";

export const metadata: Metadata = {
  title: "Boats & sea",
  description:
    "Charters, sunset cruises, and reef trips — add Tobago boat services to your TTW booking.",
};

export default function BoatsPage() {
  return (
    <CategoryBrowse
      category="boat"
      intro="Private charters and shared experiences along Tobago’s coast. Mix with dining and nightlife in your cart."
    />
  );
}
