"use client";

import { usePlanner } from "@/components/planner";
import { PlannerRowShiftService } from "../_components/planner-row-shift-service";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useCurrentLocale } from "@/locales/client";
import { getShiftsInRangeForService } from "@/lib/data-access/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { groupShifts } from "@/lib/utils";
import { Shift, ShiftService } from "@/models";

export default function Page() {
  const locale = useCurrentLocale();
  const [groupedShifts, setGroupedShifts] = useState<Record<
    ShiftService["id"],
    Record<string, Shift[]>
  > | null>(null);

  const {
    shiftService,
    workspace,
    company_id,
    workspace_id,
    shiftService_id,
    startDate,
    endDate,
    shifts,
    setShifts,
  } = usePlanner();

  useEffect(() => {
    getShiftsInRangeForService(startDate, endDate, company_id!).then(
      ({ data: shifts, error }) => {
        if (error) {
          toast.error(error.message);
        }
        if (shifts) {
          setShifts(shifts);

          const grouped = groupShifts(shifts);

          setGroupedShifts(grouped);
        }
      }
    );
  }, []);

  return (
    <div className="grid gap-4">
      <div>
        <Link
          className="inline"
          href={`/${locale}/app/${company_id}/${workspace_id}`}
        >
          <span className="flex items-center gap-x-1">
            <ChevronLeft /> {workspace?.workspace_name}
          </span>
        </Link>
      </div>
      {!shiftService && (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      )}
      {shiftService && (
        <PlannerRowShiftService
          shifts={groupedShifts ? groupedShifts[shiftService.id] : {}}
          shiftService={shiftService}
        />
      )}
    </div>
  );
}
