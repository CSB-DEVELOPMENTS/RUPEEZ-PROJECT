import { supabase } from "@/lib/supabase";
import type { Tables } from "../../database.types";

export type ContextTransaction = Pick<
  Tables<"transactions">,
  "amount" | "profile_id" | "transaction_date" | "transaction_type"
>;

export async function getCurrentMonthTransactions(
  profileIds: string[],
  monthStart: Date,
) {
  if (profileIds.length === 0) {
    return { data: [] as ContextTransaction[], error: null };
  }

  const { data, error } = await supabase
    .from("transactions")
    .select("amount, profile_id, transaction_date, transaction_type")
    .in("profile_id", profileIds)
    .gte("transaction_date", monthStart.toISOString());

  return { data: data ?? [], error };
}
