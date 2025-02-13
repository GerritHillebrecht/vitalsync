"use client";

import { CalendarRange, ChevronRight } from "lucide-react";

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
import { useCurrentLocale } from "@/locales/client";

export function NavWorkspaces() {
  const { company, company_id, workspace_id } = usePlanner();
  const locale = useCurrentLocale();

  return company?.workspaces?.map((workspace, index) => (
    <SidebarGroup key={workspace.id}>
      <SidebarGroupLabel>{workspace.workspace_name}</SidebarGroupLabel>
      <SidebarMenu>
        {workspace.clients?.map((client, index) => {
          return (
            <Collapsible
              key={client.id}
              asChild
              defaultOpen={workspace.id === workspace_id}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={`Dienstplan ${client.firstname} ${client.lastname}`}>
                    <CalendarRange />
                    <span>
                      {client.firstname} {client.lastname}
                    </span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a
                          href={`/${locale}/app/${company_id}/${workspace.id}`}
                        >
                          <span>Dienstplan</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    {workspace.shiftServices
                      ?.filter((service) =>
                        service.clients?.map(({ id }) => id).includes(client.id)
                      )
                      .map((shiftService) => (
                        <SidebarMenuSubItem key={shiftService.id}>
                          <SidebarMenuSubButton asChild>
                            <a
                              href={`/${locale}/app/${company_id}/${workspace.id}/${shiftService.id}`}
                            >
                              <span>{shiftService.shiftServiceType?.type_name}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  ));
}
