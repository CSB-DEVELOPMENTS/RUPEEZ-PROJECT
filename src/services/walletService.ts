import { supabase } from "@/lib/supabase";
import { Tables } from "../../database.types";

export type WalletBalance = Pick<
  Tables<"wallets">,
  "profile_id" | "wallet_id" | "current_balance" | "wallet_name" | "wallet_type"
>;

export type CryptoWallet = Pick<
  Tables<"wallets">,
  "wallet_id" | "wallet_name" | "wallet_type" | "current_balance" | "profile_id"
>;

export async function getWalletBalances(
  profileIds: string[],
  walletType?: string,
): Promise<{ data: WalletBalance[]; error: unknown }> {
  if (profileIds.length === 0) {
    return { data: [], error: null };
  }

  let query = supabase
    .from("wallets")
    .select("profile_id, wallet_id, current_balance, wallet_name, wallet_type")
    .in("profile_id", profileIds);

  if (walletType) {
    query.eq("wallet_type", walletType);
  }

  const { data: wallets, error } = await query;

  if (error) {
    return { data: [], error };
  }

  return { data: wallets, error: null };
}
