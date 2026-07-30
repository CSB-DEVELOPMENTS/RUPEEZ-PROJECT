import { supabase } from "@/lib/supabase";

export async function getWalletBalances(profileIds: string[]) {
  if (profileIds.length === 0) {
    return { data: {}, error: null };
  }

  const { data: wallets, error } = await supabase
    .from("wallets")
    .select("profile_id, current_balance")
    .in("profile_id", profileIds);

  if (error) {
    return { data: {}, error };
  }

  const balances = (wallets ?? []).reduce<Record<string, number>>((result, wallet) => {
    if (wallet.profile_id) {
      result[wallet.profile_id] = (result[wallet.profile_id] ?? 0) + (wallet.current_balance ?? 0);
    }
    return result;
  }, {});

  return { data: balances, error: null };
}
