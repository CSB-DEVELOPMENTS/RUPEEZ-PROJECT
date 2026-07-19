import { View } from "react-native";

import type { AllContextsPageData } from "@/types/contexts-switching";

import { ContextInsightBanner } from "./ContextInsightBanner";
import { ContextListPanel } from "./ContextListPanel";
import { ContextPerformanceCard } from "./ContextPerformanceCard";
import { ContextSafeSpendCard } from "./ContextSafeSpendCard";
import { ContextsHeader } from "./ContextsHeader";

export function AllContextsSections({ data }: { data: AllContextsPageData }) {
  return (
    <View className="gap-5">
      <ContextsHeader />

      <View className="gap-5 xl:flex-row">
        <ContextListPanel data={data.contexts} />
        <ContextPerformanceCard data={data.performancePoints} />
      </View>

      <View className="gap-4 md:flex-row md:flex-wrap">
        {data.safeSpendCards.map((card) => (
          <View key={card.contextId} className="md:min-w-[12rem] md:flex-1">
            <ContextSafeSpendCard data={card} />
          </View>
        ))}
      </View>

      <ContextInsightBanner data={data.insight} />
    </View>
  );
}
