import { Tables } from "./supabase.types";
import { Workspace } from "./workspace";

export interface Company extends Tables<"companies"> {
  workspaces?: Workspace[];
}
