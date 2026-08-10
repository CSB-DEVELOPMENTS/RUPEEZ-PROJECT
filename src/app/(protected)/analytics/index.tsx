import { ScrollView, Text, View } from "react-native";

import {
  AnalyticsInsightsCard,
  AnalyticsShortcutCard,
  AnalyticsTopCategoriesCard,
} from "@/components/analytics";
import {
  ANALYTICS_HOME_CATEGORIES_TOTAL,
  ANALYTICS_HOME_TOP_CATEGORIES,
} from "@/constants/analytics";

export default function Analytics() {
  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 md:px-8 lg:px-10">
        <View className="relative overflow-hidden p-4 md:p-6">
          <View className="absolute -left-10 top-16 h-40 w-40 rounded-full bg-app-primary/10" />
          <View className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-app-brand/10" />

          <View className="relative gap-5">
            <View className="gap-2">
              <Text className="font-display text-3xl font-semibold tracking-tight text-app-text md:text-5xl">
                Analytics
              </Text>
              <Text className="font-display text-lg leading-7 text-app-muted md:text-xl">
                Explore your spending patterns and the insights behind them.
              </Text>
            </View>

            <View className="gap-4 lg:flex-row">
              <View className="lg:flex-1">
                <AnalyticsTopCategoriesCard
                  items={ANALYTICS_HOME_TOP_CATEGORIES}
                  total={ANALYTICS_HOME_CATEGORIES_TOTAL}
                />
              </View>
              <View className="lg:w-[30%]">
                <AnalyticsInsightsCard />
              </View>
            </View>

            <View className="gap-4">
              <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
                Explore more
              </Text>
              <View className="gap-4 md:flex-row">
                <AnalyticsShortcutCard
                  description="Review your wealth and stability overview."
                  href="/analytics/financial-health"
                  title="Financial Health"
                />
                <AnalyticsShortcutCard
                  description="Visualize how your money moves this month."
                  href="/analytics/sankey-flow"
                  title="Sankey Flow"
                />
                <AnalyticsShortcutCard
                  description="Create a report to save or share."
                  href="/analytics/report-export"
                  title="Reports & Export"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
