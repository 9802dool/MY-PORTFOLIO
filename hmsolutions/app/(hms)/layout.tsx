import { HmsShell } from "@/components/HmsShell";

export default function HmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HmsShell>{children}</HmsShell>;
}
