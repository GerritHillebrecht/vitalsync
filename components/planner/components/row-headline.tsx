import { ReactNode } from "react";

export function PlannerRowHeadline({ children }: { children: ReactNode }) {
  return <div className="p-6 flex flex-col gap-2">{children}</div>;
}
