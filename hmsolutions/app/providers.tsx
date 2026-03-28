"use client";

import { HmsProvider } from "@/components/HmsProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <HmsProvider>{children}</HmsProvider>;
}
