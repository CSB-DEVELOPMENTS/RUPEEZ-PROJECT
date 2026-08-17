import { supabase } from "@/lib/supabase";
import type { Tables } from "../../database.types";

export type ContextTransaction = Pick<
  Tables<"transactions">,
  "amount" | "profile_id" | "transaction_date" | "transaction_type"
>;

export type DashboardTransactionRecord = Pick<
  Tables<"transactions">,
  | "amount"
  | "category"
  | "created_at"
  | "description"
  | "profile_id"
  | "transaction_date"
  | "transaction_id"
  | "transaction_type"
>;

export async function getTransactionsByDateRange(
  profileId: string,
  startDate: Date,
  endDate: Date,
) {
  const { data, error } = await supabase
    .from("transactions")
    .select(
      "amount, category, created_at, description, profile_id, transaction_date, transaction_id, transaction_type",
    )
    .eq("profile_id", profileId)
    .gte("transaction_date", startDate.toISOString())
    .lte("transaction_date", endDate.toISOString())
    .order("transaction_date", { ascending: false });

  return { data: (data ?? []) as DashboardTransactionRecord[], error };
}

export async function getCurrentMonthTransactions(profileIds: string[], monthStart: Date) {
  if (profileIds.length === 0) {
    return { data: [], error: null };
  }

  const { data, error } = await supabase
    .from("transactions")
    .select("amount, profile_id, transaction_date, transaction_type")
    .in("profile_id", profileIds)
    .gte("transaction_date", monthStart.toISOString());

  return { data: data ?? [], error };
}
