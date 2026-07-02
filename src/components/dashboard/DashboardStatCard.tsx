import { Text, View } from "react-native";

import type { DashboardStat, DashboardStatTone } from "@/types/dashboard";

import { DashboardCard } from "./DashboardCard";

function cardToneClass(tone: DashboardStatTone) {
  switch (tone) {
    case "positive":
      return "text-app-primary";
    case "negative":
      return "text-app-danger";
    default:
      return "text-app-text";
  }
}

function trendToneClass(tone: DashboardStatTone) {
  switch (tone) {
    case "positive":
      return "text-app-primary-strong";
    case "negative":
      return "text-app-danger";
    default:
      return "text-app-muted";
  }
}

function MiniTrend({ tone }: { tone: DashboardStatTone }) {
  const barTone =
    tone === "negative" ? "bg-app-danger" : tone === "positive" ? "bg-app-primary" : "bg-app-brand";

  return (
    <View className="w-28 gap-2">
      <View
        className={`h-1 rounded-full ${barTone} opacity-60`}
        style={{ marginLeft: 10, width: 42 }}
      />
      <View
        className={`h-1 rounded-full ${barTone} opacity-80`}
        style={{ marginLeft: 22, width: 54 }}
      />
      <View className={`h-1 rounded-full ${barTone}`} style={{ marginLeft: 32, width: 68 }} />
    </View>
  );
}

export function DashboardStatCard({ caption, detail, title, tone, trend, variant }: DashboardStat) {
  return (
    <DashboardCard>
      <View className="gap-4">
        <View className="flex-row items-start justify-between gap-3">
          <Text className="font-display text-sm font-semibold uppercase tracking-[1.4px] text-app-muted">
            {caption}
          </Text>
          {trend ? (
            <Text className={`font-display text-sm font-semibold ${trendToneClass(tone)}`}>
              {trend}
            </Text>
          ) : null}
        </View>

        <Text
          className={`font-display text-2xl font-semibold tracking-tight md:text-3xl ${cardToneClass(tone)}`}>
          {title}
        </Text>

        <View className="flex-row items-end justify-between gap-4">
          <Text className="max-w-[72%] flex-1 font-display text-base leading-6 text-app-muted">
            {detail}
          </Text>
          {/* {variant === "progress" ? (
            <View className="h-16 w-16 items-center justify-center rounded-full border-4 border-app-primary">
              <Text className="font-display text-base font-semibold text-app-text">{trend}</Text>
            </View>
          ) : (
            <MiniTrend tone={tone} />
          )} */}
        </View>
      </View>
    </DashboardCard>
  );
}
