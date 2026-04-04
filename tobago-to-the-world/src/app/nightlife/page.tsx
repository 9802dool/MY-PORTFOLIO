import type { Metadata } from "next";
import { CategoryBrowse } from "@/components/CategoryBrowse";

export const metadata: Metadata = {
  title: "Nightlife",
  description:
    "Bars, clubs, and evening events in Tobago — add nightlife to your TTW package or custom booking.",
};

export default function NightlifePage() {
  return (
    <CategoryBrowse
      category="nightlife"
      intro="Soca nights, DJs, and late bars near Crown Point — combine with your stay and daytime plans."
    />
  );
}
