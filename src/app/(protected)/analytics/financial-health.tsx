import { ScrollView, View } from "react-native";

import {
  AnalyticsFlowHero,
  FinancialHealthActivityImpactsCard,
  FinancialHealthAllocationCard,
  FinancialHealthScoreCard,
  FinancialHealthTrendCard,
} from "@/components/analytics";
import { FINANCIAL_HEALTH_PAGE } from "@/constants/analytics";

export default function FinancialHealthScreen() {
  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 md:px-8 lg:px-10">
        <View className="relative overflow-hidden p-4 md:p-6">
          <View className="absolute -left-10 top-16 h-40 w-40 rounded-full bg-app-primary/10" />
          <View className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-app-brand/10" />

          <View className="relative gap-5">
            <AnalyticsFlowHero
              subtitle={FINANCIAL_HEALTH_PAGE.subtitle}
              title={FINANCIAL_HEALTH_PAGE.title}
            />

            <View className="gap-4 xl:flex-row">
              <FinancialHealthScoreCard
                metrics={FINANCIAL_HEALTH_PAGE.score.metrics}
                statusLabel={FINANCIAL_HEALTH_PAGE.score.statusLabel}
                total={FINANCIAL_HEALTH_PAGE.score.total}
                value={FINANCIAL_HEALTH_PAGE.score.value}
              />

              <View className="flex-1 gap-4">
                <View className="gap-4">
                  <FinancialHealthTrendCard points={FINANCIAL_HEALTH_PAGE.netWorthTrend} />
                  <FinancialHealthAllocationCard items={FINANCIAL_HEALTH_PAGE.assetAllocation} />
                </View>

                <FinancialHealthActivityImpactsCard items={FINANCIAL_HEALTH_PAGE.activityImpacts} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
