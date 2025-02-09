import { ReactNode } from "react";

interface PlannerRowProps {
  children: ReactNode;
}

export function PlannerRow({ children }: PlannerRowProps) {
  return <div className="rounded-lg border shadow bg-background">{children}</div>;
}
