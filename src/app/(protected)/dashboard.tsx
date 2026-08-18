import { useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

import {
  DashboardCalendarCard,
  DashboardOverviewCard,
  DashboardPortfolioCard,
} from "@/components/dashboard";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import {
  DashboardSubscriptionsCard,
  DashboardTransactionsCard,
} from "@/components/dashboard/DashboardSections";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import { DASHBOARD_PORTFOLIO, DASHBOARD_SUBSCRIPTIONS_CARD } from "@/constants/dashboard";
import { useAuth } from "@/hooks/auth/useAuth";
import { useToast } from "@/hooks/toast/useToast";
import {
  getTransactionsByDateRange,
  type DashboardTransactionRecord,
} from "@/services/transactionService";
import { getWalletBalances, WalletBalance } from "@/services/walletService";
import { DASHBOARD_DAYS_TO_SHOW, dashboardData } from "@/utils/dashboard";
import { getErrorMessage } from "@/utils/error-message";

export default function Dashboard() {
  const { profile, user } = useAuth();
  const fullName = (user?.user_metadata?.full_name as string) || "User";
  const { error: showError } = useToast();
  const [transactions, setTransactions] = useState<DashboardTransactionRecord[]>([]);
  const [walletBalances, setWalletBalances] = useState<WalletBalance[]>([]);
  const endDate = useMemo(() => new Date(), []);
  const dashboard = useMemo(
    () => dashboardData(profile ? transactions : [], walletBalances, endDate),
    [endDate, profile, transactions, walletBalances],
  );

  useEffect(() => {
    if (!profile?.profile_id) return;

    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - (DASHBOARD_DAYS_TO_SHOW - 1));
    startDate.setHours(0, 0, 0, 0);
    const rangeEnd = new Date(endDate);
    rangeEnd.setHours(23, 59, 59, 999);
    let isMounted = true;

    void getTransactionsByDateRange(profile.profile_id, startDate, rangeEnd).then(
      ({ data, error }) => {
        if (!isMounted) return;
        if (error) {
          showError(
            "Unable to load dashboard transactions",
            getErrorMessage(error, "Please try again shortly."),
          );
        }
        setTransactions(data);
      },
    );

    void getWalletBalances([profile.profile_id]).then(({ data, error }) => {
      if (!isMounted) return;
      if (error) {
        showError(
          "Unable to load wallet balances",
          getErrorMessage(error, "Please try again shortly."),
        );
      }
      setWalletBalances(data);
    });

    return () => {
      isMounted = false;
    };
  }, [endDate, profile?.profile_id, showError]);

  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full max-w-[1600px] px-4 md:px-8 lg:px-10">
        <View className="relative overflow-hidden p-4 md:p-6 lg:p-8">
          <View className="absolute -left-14 top-20 h-36 w-36 rounded-full bg-app-primary/10" />
          <View className="absolute -right-12 top-10 h-48 w-48 rounded-full bg-app-brand/10" />

          <View className="gap-5">
            <DashboardHero dateRange={dashboard.dateRange} userName={fullName || "User"} />

            <View className="mx-[-8px] flex-row flex-wrap">
              {dashboard.stats.map((item) => (
                <View key={item.caption} className="flex-auto p-2">
                  <DashboardStatCard {...item} />
                </View>
              ))}
            </View>

            <View className="gap-4 lg:flex-row lg:items-stretch">
              <View className="min-w-0 lg:flex-1">
                <DashboardOverviewCard data={dashboard.overview} />
              </View>

              <View className="min-w-0 lg:flex-1">
                <DashboardCalendarCard
                  items={dashboard.calendarDays}
                  monthLabel={dashboard.monthLabel}
                />
              </View>
            </View>

            <View className="gap-4 lg:flex-row lg:items-stretch">
              <View className="min-w-0 lg:flex-1">
                <DashboardSubscriptionsCard data={DASHBOARD_SUBSCRIPTIONS_CARD} />
              </View>
              <View className="min-w-0 lg:flex-1">
                <DashboardPortfolioCard items={DASHBOARD_PORTFOLIO} />
              </View>
            </View>

            <DashboardTransactionsCard items={dashboard.recentTransactions} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
