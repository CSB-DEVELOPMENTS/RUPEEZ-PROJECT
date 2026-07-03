import { Text, View, useWindowDimensions } from "react-native";

import type { CashFlowHeroData, CashFlowMetricTone } from "@/types/dashboard";

function metricValueClassName(tone: CashFlowMetricTone) {
  switch (tone) {
    case "positive":
      return "text-app-primary";
    case "negative":
      return "text-app-danger";
    default:
      return "text-app-text";
  }
}

export function CashFlowHero({ data }: { data: CashFlowHeroData }) {
  const { width } = useWindowDimensions();
  const isCompact = width < 480;

  return (
    <View className="gap-6 lg:flex-row lg:items-start lg:justify-between">
      <View className="max-w-3xl gap-2">
        <Text className="font-display text-base text-app-muted md:text-lg">{data.periodLabel}</Text>
        <Text className="font-display text-3xl font-semibold tracking-tight text-app-text md:text-5xl">
          {data.title}
        </Text>
        <Text className="font-display text-4xl font-semibold tracking-tight text-app-text md:text-6xl">
          {data.totalValue}
        </Text>
      </View>

      <View className="gap-3 sm:flex-row">
        {data.totals.map((item) => (
          <View
            key={item.label}
            className={`rounded-[24px] border border-app-border bg-app-surface/90 px-5 py-4 ${
              isCompact ? "w-full" : "min-w-[11rem]"
            }`}>
            <Text className="font-display text-xs font-semibold uppercase tracking-[1.5px] text-app-muted">
              {item.label}
            </Text>
            <Text
              className={`mt-2 font-display text-xl font-semibold tracking-tight md:text-2xl ${metricValueClassName(item.tone)}`}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
