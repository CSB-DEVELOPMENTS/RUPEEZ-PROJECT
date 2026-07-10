import { ScrollView, View } from "react-native";

import { ThemeToggle } from "@/components/common/ThemeToggle";
import {
  DashboardCalendarCard,
  DashboardCategoriesCard,
  DashboardOverviewCard,
  DashboardPortfolioCard,
} from "@/components/dashboard";
import { DashboardHero } from "@/components/dashboard/DashboardHero";
import {
  DashboardInsightsCard,
  DashboardSubscriptionsCard,
  DashboardTransactionsCard,
} from "@/components/dashboard/DashboardSections";
import { DashboardStatCard } from "@/components/dashboard/DashboardStatCard";
import {
  DASHBOARD_CALENDAR_DAYS,
  DASHBOARD_CALENDAR_MONTH_LABEL,
  DASHBOARD_CATEGORIES,
  DASHBOARD_DATE_RANGE,
  DASHBOARD_GREETING,
  DASHBOARD_OVERVIEW,
  DASHBOARD_OVERVIEW_COPY,
  DASHBOARD_PORTFOLIO,
  DASHBOARD_STATS,
  DASHBOARD_SUBSCRIPTIONS_CARD,
  DASHBOARD_TRANSACTIONS,
} from "@/constants/dashboard";

export default function Dashboard() {
  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="items-end">
        <ThemeToggle />
      </View>
      <View className="mx-auto w-full px-4 py-5 md:px-8 md:py-8 lg:px-10">
        <View className="relative overflow-hiddena p-4 md:p-6">
          <View className="absolute -left-14 top-20 h-36 w-36 rounded-full bg-app-primary/10" />
          <View className="absolute -right-12 top-10 h-48 w-48 rounded-full bg-app-brand/10" />

          <View className="gap-5">
            <DashboardHero
              dateRange={DASHBOARD_DATE_RANGE}
              greeting={DASHBOARD_GREETING}
              overview={DASHBOARD_OVERVIEW_COPY}
            />

            <View className="mx-[-8px] flex-row flex-wrap">
              {DASHBOARD_STATS.map((item) => (
                <View
                  key={item.caption}
                  className="flex-auto p-2"
                  // style={{ width: `${100 / statColumns}%` }}
                >
                  <DashboardStatCard key={item.caption} {...item} />
                </View>
              ))}
            </View>

            <View className="gap-4 xl:flex-row">
              <View className="gap-4 xl:flex-1">
                <DashboardOverviewCard data={DASHBOARD_OVERVIEW} />

                <View className="gap-4 md:flex-row">
                  <View className="md:flex-1">
                    <DashboardSubscriptionsCard data={DASHBOARD_SUBSCRIPTIONS_CARD} />
                  </View>
                  <View className="md:flex-1">
                    <DashboardPortfolioCard items={DASHBOARD_PORTFOLIO} />
                  </View>
                </View>
              </View>

              <View className="gap-4 xl:w-[32%]">
                <DashboardCalendarCard
                  items={DASHBOARD_CALENDAR_DAYS}
                  monthLabel={DASHBOARD_CALENDAR_MONTH_LABEL}
                />
                <DashboardCategoriesCard total="23,459" items={DASHBOARD_CATEGORIES} />
              </View>
            </View>

            <View className="gap-4 lg:flex-row">
              <View className="lg:flex-1">
                <DashboardTransactionsCard items={DASHBOARD_TRANSACTIONS} />
              </View>
              <View className="lg:w-[30%]">
                <DashboardInsightsCard />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
