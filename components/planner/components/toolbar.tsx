"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePlanner } from "../provider/planner-provider";
import dayjs from "dayjs";
import { useCurrentLocale } from "@/locales/client";
import "dayjs/locale/de";

export function PlannerToolbar({ className }: { className?: string }) {
  const { updateSearchParams, endDate } = usePlanner();
  const locale = useCurrentLocale();

  return (
    <header className={className}>
      <nav className="flex items-center justify-between gap-x-2 max-w-7xl mx-auto">
        <h1>{dayjs(endDate).locale(locale).format("MMMM")}</h1>
        <div className="flex items-center gap-x-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateSearchParams("prev")}
          >
            <ChevronLeft />
            <span className="sr-only">Back</span>
          </Button>
          <Button variant="outline" onClick={() => updateSearchParams("today")}>
            <span>Today</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateSearchParams("next")}
          >
            <ChevronRight />
            <span className="sr-only">Forward</span>
          </Button>
        </div>
      </nav>
    </header>
  );
}
