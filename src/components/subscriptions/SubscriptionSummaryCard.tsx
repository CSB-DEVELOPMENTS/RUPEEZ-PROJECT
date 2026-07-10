import { Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { subscriptionToneClass } from "@/components/dashboard/DashboardSections";
import type { SubscriptionSummaryCardData } from "@/types/dashboard";

function summaryToneClasses(tone: SubscriptionSummaryCardData["tone"]) {
  switch (tone) {
    case "positive":
      return { accent: "bg-app-primary/12", detail: "text-app-primary" };
    case "negative":
      return { accent: "bg-app-danger/10", detail: "text-app-danger" };
    case "brand":
      return { accent: "bg-app-brand/12", detail: "text-app-brand" };
    default:
      return { accent: "bg-app-panel/70", detail: "text-app-muted" };
  }
}

function summaryBadgeLabel(eyebrow: string) {
  return eyebrow
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function SubscriptionSummaryCard({ data }: { data: SubscriptionSummaryCardData }) {
  const tone = summaryToneClasses(data.tone);

  return (
    <DashboardCard className="overflow-hidden">
      <View className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${tone.accent}`} />

      <View className="gap-2">
        <View className="flex-row items-start justify-between gap-4">
          <Text className="font-display text-xs font-semibold uppercase tracking-[1.5px] text-app-muted">
            {data.eyebrow}
          </Text>
          <View
            className={`h-10 min-w-10 items-center justify-center rounded-2xl px-3 ${subscriptionToneClass(data.tone)}`}>
            <Text className="font-display text-sm font-semibold">
              {summaryBadgeLabel(data.eyebrow)}
            </Text>
          </View>
        </View>

        <View className="gap-2">
          <Text className="font-display text-3xl font-semibold tracking-tight text-app-text md:text-4xl">
            {data.value}
          </Text>
          <View className="flex-row flex-wrap items-center gap-2">
            <Text className={`font-display text-base ${tone.detail}`}>{data.detail}</Text>
            {data.meta ?
              <Text className="font-display text-base text-app-muted">{data.meta}</Text>
            : null}
          </View>
        </View>
      </View>
    </DashboardCard>
  );
}
