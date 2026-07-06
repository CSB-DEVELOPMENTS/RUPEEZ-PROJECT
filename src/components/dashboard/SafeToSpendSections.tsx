import { Text, View, useWindowDimensions } from "react-native";

import {
  DashboardSafeSpendFlowItem,
  DashboardSafeSpendObligation,
  DashboardSafeSpendStat,
  DashboardSafeSpendSummary,
} from "@/types/dashboard";
import { DashboardCard } from "./DashboardCard";

function SectionTitle({ action, title }: { action?: string; title: string }) {
  return (
    <View className="mb-5 flex-row items-center justify-between gap-4">
      <Text className="font-display text-2xl font-semibold tracking-tight text-app-text md:text-3xl">
        {title}
      </Text>
      {action ? (
        <Text className="font-display text-sm font-semibold uppercase tracking-[1.2px] text-app-primary-strong">
          {action}
        </Text>
      ) : null}
    </View>
  );
}

export function SafeSpendSummaryCard({ data }: { data: DashboardSafeSpendSummary }) {
  const { width } = useWindowDimensions();
  const isCompact = width < 480;
  const ringSize = isCompact ? 220 : width < 768 ? 248 : 256;

  return (
    <DashboardCard className="relative overflow-hidden">
      <View className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-app-primary/10" />
      <View className="absolute -bottom-20 left-10 h-44 w-44 rounded-full bg-app-brand/10" />

      <View className="relative gap-6">
        <View className={`gap-4 ${isCompact ? "" : "flex-row items-start justify-between"}`}>
          <Text className="font-display text-sm font-semibold uppercase tracking-[1.5px] text-app-muted">
            {data.title}
          </Text>
          <View
            className={`rounded-2xl bg-app-panel/80 px-4 py-2 ${isCompact ? "self-start" : ""}`}>
            <Text className="font-display text-sm text-app-muted">{data.resetIn}</Text>
          </View>
        </View>

        <View className="items-center py-2">
          <View
            className="items-center justify-center rounded-full border-[4px] border-app-primary"
            style={{ height: ringSize, width: ringSize }}>
            <Text className="px-6 text-center font-display text-3xl font-semibold tracking-tight text-app-primary md:text-5xl">
              {data.availableNow}
            </Text>
            <Text className="mt-3 font-display text-lg text-app-muted">Available now</Text>
          </View>
        </View>

        <View className="gap-3">
          <View className="gap-2 md:flex-row md:items-center md:justify-between md:gap-4">
            <Text className="font-display text-sm font-semibold uppercase tracking-[1.2px] text-app-muted">
              Daily target: {data.dailyTarget}
            </Text>
            <Text className="font-display text-sm font-semibold uppercase tracking-[1.2px] text-app-primary">
              {data.percentRemaining}% remaining
            </Text>
          </View>

          <View className="h-3 overflow-hidden rounded-full bg-app-panel">
            <View
              className="h-full rounded-full bg-app-primary"
              style={{ width: `${data.percentRemaining}%` }}
            />
          </View>
        </View>
      </View>
    </DashboardCard>
  );
}

export function SafeSpendStatCards({ data }: { data: DashboardSafeSpendStat[] }) {
  return (
    <View className="gap-4">
      {data.map((item) => (
        <DashboardCard key={item.title} className="min-h-[180px] justify-center">
          <Text className="font-display text-sm font-semibold uppercase tracking-[1.5px] text-app-muted">
            {item.title}
          </Text>
          <Text className="mt-5 font-display text-3xl font-semibold tracking-tight text-app-text">
            {item.value}
          </Text>
          <Text className="mt-3 font-display text-lg text-app-muted">{item.detail}</Text>
        </DashboardCard>
      ))}
    </View>
  );
}

export function ObligationsCard({ data }: { data: DashboardSafeSpendObligation[] }) {
  const { width } = useWindowDimensions();
  const isCompact = width < 480;

  return (
    <DashboardCard>
      <SectionTitle action="View all" title="Next 7 Days Obligations" />

      <View className="gap-4">
        {data.map((item) => (
          <View
            key={item.name}
            className={`rounded-[24px] bg-app-panel/35 px-4 py-4 ${
              isCompact ? "gap-2" : "flex-row items-center justify-between gap-4"
            }`}>
            <View className="flex-1 gap-1">
              <Text className="font-display text-lg font-semibold text-app-text">{item.name}</Text>
              <Text className="font-display text-sm font-semibold uppercase tracking-[1.2px] text-app-muted">
                {item.dueLabel}
              </Text>
            </View>
            <Text
              className={`font-display text-2xl font-semibold tracking-tight text-app-text ${
                isCompact ? "pl-0" : "text-right"
              }`}>
              {item.amount}
            </Text>
          </View>
        ))}
      </View>
    </DashboardCard>
  );
}

function flowAmountClassName(tone: "expense" | "income") {
  return tone === "income" ? "text-app-primary" : "text-app-danger";
}

export function RecentFlowCard({ data }: { data: DashboardSafeSpendFlowItem[] }) {
  const { width } = useWindowDimensions();
  const isCompact = width < 480;

  return (
    <DashboardCard>
      <SectionTitle title="Recent Flow Context" />

      <View className="gap-4">
        {data.map((item) => (
          <View
            key={`${item.label}-${item.note}`}
            className={`rounded-[24px] bg-app-panel/40 px-4 py-5 flex-row ${
              isCompact ? "gap-3" : "items-center gap-4"
            }`}>
            <View
              className={`h-9 w-2 rounded-full ${item.tone === "income" ? "bg-app-primary" : "bg-app-danger"}`}
            />
            <View className="min-w-0 flex-1 gap-1">
              <Text className="font-display text-lg font-semibold text-app-text">{item.label}</Text>
              <Text className="font-display text-sm font-semibold uppercase tracking-[1.2px] text-app-muted">
                {item.note}
              </Text>
            </View>
            <Text
              className={`font-display text-2xl font-semibold tracking-tight ${isCompact ? "pl-6 text-left" : "text-right"} ${flowAmountClassName(item.tone)}`}>
              {item.amount}
            </Text>
          </View>
        ))}
      </View>
    </DashboardCard>
  );
}
