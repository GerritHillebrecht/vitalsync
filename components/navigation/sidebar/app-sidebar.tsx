"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { CompanySwitcher } from "./app-sidebar-company-switcher";
import { AppSidebarFooter } from "./app-sidebar-footer";
import { NavWorkspaces } from "./app-sidebar-nav-clients";
import { usePlanner } from "@/components/planner";

export function AppSiderbar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { activeCompany, company_id } = usePlanner();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher /> */}
        <CompanySwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavWorkspaces />
        <pre>
          <code>
            {JSON.stringify(company_id, null, 2)}
            {JSON.stringify(activeCompany, null, 2)}
          </code>
        </pre>
        {/* <NavWorkspace />
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarFooter />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
