"use client";

import { usePlanner } from "@/components/planner";
import { Skeleton } from "@/components/ui/skeleton";
import { PlannerRowShiftService } from "./_components/planner-row-shift-service";

export default function Page() {
  const { workspace, groupedShifts } = usePlanner();

  return (
    <>
      {!workspace && (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      )}
      {workspace?.shiftServices?.map((shiftService) => (
        <PlannerRowShiftService
          key={shiftService.id}
          shiftService={shiftService}
          shifts={groupedShifts ? groupedShifts[shiftService.id] : {}}
        />
      ))}
    </>
  );
}
