import type { Tables, TablesUpdate } from "../../database.types";

import { supabase } from "@/lib/supabase";

export type UserRecord = Tables<"users">;
export type UserUpdate = Pick<TablesUpdate<"users">, "first_name" | "last_name">;

export async function getUser(userId: string) {
  return supabase.from("users").select("*").eq("user_id", userId).single();
}

export async function updateUser(userId: string, input: UserUpdate) {
  return supabase
    .from("users")
    .update(input)
    .eq("user_id", userId)
    .select("*")
    .single();
}
