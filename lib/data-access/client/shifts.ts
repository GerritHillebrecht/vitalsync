import { createClient } from "@/lib/supabase/client";
import { Company } from "@/models";
import { toast } from "sonner";

const supabase = createClient();

export async function getShiftsInRangeForService(
  start: Date,
  end: Date,
  company_id: Company["id"]
  //   shiftService_id: ShiftService["id"]
) {
  const { data: company, error } = await supabase
    .from("companies")
    .select("*, employees(*)")
    .eq("id", company_id)
    .single();

  if (error || !company.employees) {
    toast.error(error?.message);
    return { data: null, error };
  }

  return await supabase
    .from("shifts")
    .select("*, employee:employees(*)")
    .gte("date", start.toISOString())
    .lte("date", end.toISOString())
    .in(
      "employee_id",
      company.employees.map(({ id }) => id)
    );
}
