import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/context/BookingProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tobago To The World (TTW)",
    template: "%s | Tobago To The World",
  },
  description:
    "Hotels, attractions, taxis, boats, dining, and nightlife in Tobago — one combined booking or tailor your own itinerary.",
  openGraph: {
    title: "Tobago To The World — TTW",
    description:
      "Plan and book Tobago stays, tours, transport, and experiences in one place.",
    siteName: "Tobago To The World",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="font-sans">
        <BookingProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </BookingProvider>
      </body>
    </html>
  );
}
