"use client";

import {
  usePlanner,
  Planner,
  PlannerRow,
  PlannerRowHeadline,
  PlannerRowHeadlineTitle,
  PlannerRowHeadlineSubtitle,
} from "@/components/planner";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Page() {
  const { activeWorkspace } = usePlanner();

  return (
    <Planner>
      {activeWorkspace?.shiftServices?.map((shiftService) => (
        <PlannerRow key={shiftService.id}>
          <PlannerRowHeadline>
            <PlannerRowHeadlineTitle>
              {shiftService.service_name}
            </PlannerRowHeadlineTitle>
            <PlannerRowHeadlineSubtitle>
              <div className="flex items-center pl-3">
                {shiftService?.clients?.map((client) => (
                  <TooltipProvider key={client.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Avatar className="h-10 w-10 -ml-3">
                          <AvatarImage />
                          <AvatarFallback className="border text-xs border-white">
                            {client.firstname.charAt(0)}{" "}
                            {client.lastname.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{client.firstname}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </PlannerRowHeadlineSubtitle>
          </PlannerRowHeadline>
        </PlannerRow>
      ))}
    </Planner>
  );
}
