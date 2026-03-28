import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "HMSolutions — Inventory Management",
  description:
    "HMSolutions: product inventory, stock movements, categories, suppliers, and reorder alerts in one workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${jetbrains.variable} min-h-screen bg-[#0c0f14] font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
