"use client";

import { ChevronRight, User2 } from "lucide-react";

import { usePlanner } from "@/components/planner";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavWorkspaces() {
  const { activeCompany } = usePlanner();

  return activeCompany?.workspaces?.map((workspace, index) => (
    <SidebarGroup key={workspace.id}>
      <SidebarGroupLabel>{workspace.workspace_name}</SidebarGroupLabel>
      <SidebarMenu>
        {workspace.shiftServices?.map((shiftService) => (
          <Collapsible
            key={shiftService.id}
            asChild
            defaultOpen={index === 0}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={shiftService.service_name}>
                  <User2 />

                  <span>
                    {shiftService.clients
                      ?.map((client) => client.firstname)
                      .join(", ")}{" "}
                    {shiftService.service_name}
                  </span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <a href={shiftService.id}>
                        <span>Dienstplan</span>
                      </a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  {/* {shiftService.employees?.map((employee) => (
                    <SidebarMenuSubItem key={employee.id}>
                      <SidebarMenuSubButton asChild>
                        <a href={employee.id}>
                          <span>
                            {employee.firstname} {employee.lastname}
                          </span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))} */}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  ));
}
