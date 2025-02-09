import { ReactNode } from "react";

export function PlannerRowHeadlineTitle({ children }: { children: ReactNode }) {
  return <h5 className="text-2xl font-bold">{children}</h5>;
}
