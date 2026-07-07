import { ScrollView, Text, View, useWindowDimensions } from "react-native";

import {
  ObligationsCard,
  RecentFlowCard,
  SafeSpendStatCards,
  SafeSpendSummaryCard,
} from "@/components/dashboard/SafeToSpendSections";
import {
  SAFE_TO_SPEND_FLOW_ITEMS,
  SAFE_TO_SPEND_OBLIGATIONS,
  SAFE_TO_SPEND_STATS,
  SAFE_TO_SPEND_SUBTITLE,
  SAFE_TO_SPEND_SUMMARY,
  SAFE_TO_SPEND_TITLE,
} from "@/constants/dashboard";

export default function SafeToSpendScreen() {
  const { width } = useWindowDimensions();
  const showTwoColumnHero = width >= 960;

  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 py-8 md:px-8 lg:px-10">
        <View className="relative overflow-hidden p-4 md:p-6">
          <View className="absolute -left-14 top-20 h-36 w-36 rounded-full bg-app-primary/10" />
          <View className="absolute -right-12 top-10 h-48 w-48 rounded-full bg-app-brand/10" />

          <View className="relative gap-6">
            <View className="max-w-3xl gap-2">
              <Text className="font-display text-3xl font-semibold tracking-tight text-app-text md:text-5xl">
                {SAFE_TO_SPEND_TITLE}
              </Text>
              <Text className="font-display text-lg leading-7 text-app-muted md:text-xl">
                {SAFE_TO_SPEND_SUBTITLE}
              </Text>
            </View>

            <View className={`gap-4 ${showTwoColumnHero ? "lg:flex-row" : ""}`}>
              <View className={showTwoColumnHero ? "lg:flex-1" : ""}>
                <SafeSpendSummaryCard data={SAFE_TO_SPEND_SUMMARY} />
              </View>
              <View className={showTwoColumnHero ? "lg:w-[32%]" : ""}>
                <SafeSpendStatCards data={SAFE_TO_SPEND_STATS} />
              </View>
            </View>

            <View className={`gap-4 ${showTwoColumnHero ? "lg:flex-row" : ""}`}>
              <View className={showTwoColumnHero ? "lg:flex-1" : ""}>
                <ObligationsCard data={SAFE_TO_SPEND_OBLIGATIONS} />
              </View>
              <View className={showTwoColumnHero ? "lg:flex-1" : ""}>
                <RecentFlowCard data={SAFE_TO_SPEND_FLOW_ITEMS} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
