import type { Metadata } from "next";
import { CategoryBrowse } from "@/components/CategoryBrowse";

export const metadata: Metadata = {
  title: "Taxi & transfers",
  description:
    "Airport transfers and island taxi tours in Tobago — book alongside hotels and activities.",
};

export default function TaxisPage() {
  return (
    <CategoryBrowse
      category="taxi"
      intro="Licensed transfers and full-day driver-guides. Pair with your stay and sea trips in one TTW request."
    />
  );
}
