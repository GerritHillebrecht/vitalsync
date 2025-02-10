import {
  AppSidebarInset,
  AppSiderbar,
  SidebarProvider,
} from "@/components/navigation";
import { PlannerContextProvider } from "@/components/planner";

import { getAccountByAuthID, getUser } from "@/lib/data-access";
import { AccountContextProvider } from "@/provider";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  console.log("Rendering Layout /app/[locale]/app/layout.tsx");

  const {
    data: { user },
  } = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: account, error } = await getAccountByAuthID(user.id);

  if (error || !account) {
    console.error(error);
    redirect("/account/create");
  }

  if (!account.companies?.length) {
    redirect("/company/create");
  }

  return (
    <AccountContextProvider account={account} user={user}>
      <PlannerContextProvider>
        <SidebarProvider>
          <AppSiderbar />
          <AppSidebarInset>{children}</AppSidebarInset>
        </SidebarProvider>
      </PlannerContextProvider>
    </AccountContextProvider>
  );
}
