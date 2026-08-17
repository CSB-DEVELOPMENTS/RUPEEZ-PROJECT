import { supabase } from "@/lib/supabase";
import { Tables } from "../../database.types";

export type WalletBalance = Pick<Tables<"wallets">, "profile_id" | "wallet_id" | "current_balance">;

export async function getWalletBalances(
  profileIds: string[],
): Promise<{ data: WalletBalance[]; error: unknown }> {
  if (profileIds.length === 0) {
    return { data: [], error: null };
  }

  const { data: wallets, error } = await supabase
    .from("wallets")
    .select("profile_id, wallet_id, current_balance")
    .in("profile_id", profileIds);

  if (error) {
    return { data: [], error };
  }

  return { data: wallets, error: null };
}
