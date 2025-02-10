"use server";

import { createClient } from "../supabase/server";

export async function getWorkspaces() {
  const supabase = await createClient();

  return supabase.from("workspaces").select("*");
}
