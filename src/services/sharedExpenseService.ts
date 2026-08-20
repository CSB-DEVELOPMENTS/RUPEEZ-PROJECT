import { supabase } from "@/lib/supabase";
import type { Tables } from "../../database.types";

type SummarySharedExpenseRecord = Pick<
  Tables<"shared_expeneses">,
  "shared_expense_id" | "name" | "amount"
>;

type SharedExpenseRecord = Pick<
  Tables<"shared_expeneses">,
  "shared_expense_id" | "name" | "amount" | "frequency" | "next_billing_date"
>;

export type SummarySubscriptionRecord = { shared_expeneses: SummarySharedExpenseRecord };

export type SubscriptionRecord = Pick<
  Tables<"shared_expenes_participants">,
  "participant_id" | "profile_id" | "role"
> & { shared_expeneses: SharedExpenseRecord };

export async function getSummarySubscriptionsForProfile(
  profileId: string,
): Promise<{ data: SummarySubscriptionRecord[]; error: unknown }> {
  const { data, error } = await supabase
    .from("shared_expenes_participants")
    .select(`shared_expeneses!inner ( shared_expense_id, name, amount )`)
    .not("shared_expeneses.frequency", "is", null)
    .eq("profile_id", profileId);

  if (error) {
    return { data: [], error };
  }

  return { data, error: null };
}

export async function getSubscriptionsForProfile(
  profileId: string,
): Promise<{ data: SubscriptionRecord[]; error: unknown }> {
  const { data, error } = await supabase
    .from("shared_expenes_participants")
    .select(
      `participant_id, profile_id, role, shared_expeneses!inner ( shared_expense_id, name, amount, frequency, next_billing_date )`,
    )
    .not("shared_expeneses.frequency", "is", null)
    .eq("profile_id", profileId);

  if (error) {
    return { data: [], error };
  }

  return { data, error: null };
}
