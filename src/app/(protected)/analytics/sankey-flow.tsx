import { ScrollView, View } from "react-native";

import { AnalyticsFlowHero, SankeyFlowCard, SankeySummaryCard } from "@/components/analytics";
import { SANKEY_FLOW_PAGE } from "@/constants/analytics";

export default function AnalyticsScreen() {
  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <View className="relative overflow-hidden p-4 md:p-6">
          <View className="absolute -left-10 top-16 h-40 w-40 rounded-full bg-app-primary/10" />
          <View className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-app-brand/10" />

          <View className="relative gap-5">
            <AnalyticsFlowHero
              subtitle={SANKEY_FLOW_PAGE.subtitle}
              title={SANKEY_FLOW_PAGE.title}
            />

            <SankeyFlowCard
              groups={SANKEY_FLOW_PAGE.groups}
              totalIncomeLabel={SANKEY_FLOW_PAGE.totalIncomeLabel}
            />

            <View className="gap-4 xl:flex-row">
              {SANKEY_FLOW_PAGE.summaryCards.map((item) => (
                <View key={item.id} className="xl:flex-1">
                  <SankeySummaryCard data={item} />
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
