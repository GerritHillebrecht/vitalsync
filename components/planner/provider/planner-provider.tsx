"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import dayjs from "dayjs";
import { Workspace } from "@/models";
import { Company } from "@/models/company";
import { useAccount } from "@/provider/account-provider";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface PlannerContextType {
  company_id?: string;
  activeCompany?: Company;
  workspace_id?: string;
  activeWorkspace?: Workspace;
  startDate?: Date;
  endDate?: Date;
  updateSearchParams: (state: "prev" | "next" | "today") => void;
}
interface PlannerContextProviderProps {
  children: ReactNode;
}

const defaultContextValue: PlannerContextType = {
  updateSearchParams: () => {},
};
const PlannerContext = createContext<PlannerContextType>(defaultContextValue);

export function PlannerContextProvider({
  children,
}: PlannerContextProviderProps) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { company_id, workspace_id } = useParams();
  const { account } = useAccount();

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [activeCompany, setActiveCompany] = useState<Company | undefined>();
  const [activeWorkspace, setActiveWorkspace] = useState<
    Workspace | undefined
  >();

  useEffect(() => {
    if (company_id) {
      const activeC = account?.companies?.find((c) => c.id === company_id);
      setActiveCompany(activeC);

      if (workspace_id && activeC) {
        console.log("SETTING WORKSPACE", workspace_id);
        setActiveWorkspace(
          activeC.workspaces?.find((w) => w.id === workspace_id)
        );
      }
    }
  }, [company_id, workspace_id]);

  useEffect(() => {
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    setStartDate(start ? new Date(start) : dayjs().startOf("month").toDate());
    setEndDate(end ? new Date(end) : dayjs().endOf("month").toDate());
  }, [searchParams]);

  function updateSearchParams(state: "prev" | "next" | "today") {
    const params = new URLSearchParams(searchParams.toString());

    if (state === "today") {
      params.delete("start");
      params.delete("end");
    }

    if (state === "prev") {
      const start = dayjs(startDate ?? new Date())
        .subtract(1, "month")
        .startOf("month");
      params.set("start", start.toISOString());

      const end = dayjs(endDate ?? new Date())
        .subtract(1, "month")
        .endOf("month");
      params.set("end", end.toISOString());
    }

    if (state === "next") {
      const start = dayjs(startDate ?? new Date())
        .add(1, "month")
        .startOf("month");
      params.set("start", start.toISOString());

      const end = dayjs(endDate ?? new Date())
        .add(1, "month")
        .endOf("month");
      params.set("end", end.toISOString());
    }

    return router.push(`${pathName}?${params.toString()}`);
  }

  // exported value
  const plannerContextValue: PlannerContextType = {
    company_id: company_id as string | undefined,
    activeCompany,
    workspace_id: workspace_id as string | undefined,
    activeWorkspace,
    startDate,
    endDate,
    updateSearchParams,
  };

  return (
    <PlannerContext.Provider value={plannerContextValue}>
      {children}
    </PlannerContext.Provider>
  );
}

export function usePlanner() {
  const context = useContext(PlannerContext);

  if (context === defaultContextValue) {
    throw new Error(
      "usePlanner must be used within a PlannerContextProvider. " +
        "Make sure to wrap your component tree with PlannerContextProvider."
    );
  }

  return context;
}
