import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

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

export function DashboardStatCard({ caption, detail, href, title, tone, trend }: DashboardStat) {
  const router = useRouter();

  const content = (
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
      </View>
    </View>
  );

  return (
    <DashboardCard>
      {href ? (
        <Pressable
          accessibilityHint="Opens this dashboard detail page"
          accessibilityRole="button"
          className="rounded-[24px]"
          onPress={() => router.push(href)}>
          {content}
        </Pressable>
      ) : (
        content
      )}
    </DashboardCard>
  );
}
