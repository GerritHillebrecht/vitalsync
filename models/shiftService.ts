import { Client } from "./clients";
import { Tables } from "./supabase.types";

export interface ShiftService extends Tables<"shiftServices"> {
  clients?: Client[];
}
