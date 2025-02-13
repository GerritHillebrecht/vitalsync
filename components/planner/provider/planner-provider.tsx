"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  getCompany,
  getShiftService,
  getWorkspace,
} from "@/lib/data-access/client";
import { Shift, Workspace } from "@/models";
import { Company } from "@/models/company";
import dayjs from "@/lib/dayjs";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ShiftService } from "@/models/shiftService";

interface PlannerContextType {
  company_id?: Company["id"];
  company: Company | null;

  workspace_id?: Workspace["id"];
  workspace: Workspace | null;

  shiftService_id?: ShiftService["id"];
  shiftService: ShiftService | null;

  shifts: Shift[];
  setShifts: (shifts: Shift[]) => void;

  startDate: Date;
  endDate: Date;
  daysInMonth: number;

  updateSearchParams: (state: "prev" | "next" | "today") => void;
}
interface PlannerContextProviderProps {
  children: ReactNode;
}

const defaultContextValue: PlannerContextType = {
  updateSearchParams: () => {},
  startDate: dayjs().startOf("month").toDate(),
  endDate: dayjs().endOf("month").toDate(),
  company: null,
  workspace: null,
  shiftService: null,
  shifts: [],
  setShifts: () => {},
  daysInMonth: 0,
};
const PlannerContext = createContext<PlannerContextType>(defaultContextValue);

export function PlannerContextProvider({
  children,
}: PlannerContextProviderProps) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const { company_id, workspace_id, shiftService_id } = useParams();

  const [startDate, setStartDate] = useState<Date>(dayjs().startOf("month").toDate());
  const [endDate, setEndDate] = useState<Date>(dayjs().endOf("month").toDate());
  const [daysInMonth, setDaysInMonth] = useState<number>(0);

  const [company, setCompany] = useState<Company | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [shiftService, setShiftService] = useState<ShiftService | null>(null);
  const [shifts, setShifts] = useState<Shift[]>([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchCompany(company_id: Company["id"]) {
      const { data: company, error } = await getCompany(
        company_id,
        abortController
      );

      setCompany(company);

      return company;
    }

    if (company_id) {
      fetchCompany(company_id as Company["id"]);
    }

    return () => abortController.abort();
  }, [company_id]);

  useEffect(() => {
    setWorkspace(null);
    const abortController = new AbortController();

    async function fetchWorkspace(workspace_id: Workspace["id"]) {
      const { data: workspace, error } = await getWorkspace(
        workspace_id,
        abortController
      );

      setWorkspace(workspace);

      return workspace;
    }

    if (workspace_id) {
      fetchWorkspace(workspace_id as Workspace["id"]);
    }

    return () => abortController.abort();
  }, [workspace_id]);

  useEffect(() => {
    setShiftService(null);
    const abortController = new AbortController();

    async function fetchShiftService(shiftService_id: ShiftService["id"]) {
      const { data: shiftService, error } = await getShiftService(
        shiftService_id,
        abortController
      );

      setShiftService(shiftService);

      return shiftService;
    }

    if (shiftService_id) {
      fetchShiftService(shiftService_id as ShiftService["id"]);
    }

    return () => abortController.abort();
  }, [shiftService_id]);

  useEffect(() => {
    const start = searchParams.get("start");
    const end = searchParams.get("end");

    const startDate = start
      ? new Date(start)
      : dayjs().startOf("month").toDate();
    const endDate = end ? new Date(end) : dayjs().endOf("month").toDate();

    setStartDate(startDate);
    setEndDate(endDate);

    setDaysInMonth(dayjs(endDate).diff(dayjs(startDate), "day") + 1);
  }, [searchParams]);

  function updateSearchParams(state: "prev" | "next" | "today") {
    const params = new URLSearchParams(searchParams.toString());

    if (state === "today") {
      params.delete("start");
      params.delete("end");
    }

    if (state === "prev") {
      params.set(
        "start",
        dayjs(startDate ?? new Date())
          .subtract(1, "month")
          .startOf("month")
          .toISOString()
      );

      params.set(
        "end",
        dayjs(endDate ?? new Date())
          .subtract(1, "month")
          .endOf("month")
          .toISOString()
      );
    }

    if (state === "next") {
      params.set(
        "start",
        dayjs(startDate ?? new Date())
          .add(1, "month")
          .startOf("month")
          .toISOString()
      );

      params.set(
        "end",
        dayjs(endDate ?? new Date())
          .add(1, "month")
          .endOf("month")
          .toISOString()
      );
    }

    return router.push(`${pathName}?${params.toString()}`);
  }

  const plannerContextValue: PlannerContextType = {
    company_id: company_id as Company["id"] | undefined,
    company,

    workspace_id: workspace_id as Workspace["id"] | undefined,
    workspace,

    shiftService_id: shiftService_id as ShiftService["id"] | undefined,
    shiftService,

    shifts,
    setShifts,

    startDate,
    endDate,
    daysInMonth,

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
