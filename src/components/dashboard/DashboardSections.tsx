import { Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import type {
  DashboardCalendarDay,
  DashboardLegendTone,
  DashboardPortfolioAsset,
  DashboardSubscriptionAvatar,
  DashboardSubscriptionsOverviewData,
  DashboardTransaction,
} from "@/types/dashboard";

import { formatTransactionAmount, transactionToneClass } from "../cash-flow/TransactionCard";
import { DashboardCard } from "./DashboardCard";
import SectionHeader from "./SectionHeader";

export function dotToneClass(tone: DashboardLegendTone) {
  switch (tone) {
    case "positive":
      return "bg-app-primary";
    case "neutral":
      return "bg-app-danger";
    case "negative":
      return "bg-app-danger";
    default:
      return "bg-app-text-muted";
  }
}

export function calendarToneClass(day: DashboardCalendarDay) {
  if (!day.isCurrentMonth) {
    return { bg: "border-transparent bg-transparent", text: "text-app-soft" };
  }

  switch (day.tone) {
    case "positive":
      return { bg: "border-app-primary bg-app-primary/15", text: "text-app-primary" };
    case "negative":
      return { bg: "border-app-danger/20 bg-app-danger/15", text: "text-app-danger" };
    case "neutral":
      return { bg: "border-app-brand/20 bg-app-brand/15", text: "text-app-text" };
    default:
      return { bg: "border-app-border bg-app-panel/30", text: "text-app-text" };
  }
}

export function subscriptionToneClass(tone: DashboardSubscriptionAvatar["tone"]) {
  switch (tone) {
    case "positive":
      return "bg-app-primary text-app-primary-contrast";
    case "negative":
      return "bg-app-danger text-app-primary-contrast";
    case "brand":
      return "bg-app-brand text-app-primary-contrast";
    default:
      return "bg-app-panel text-app-text";
  }
}

export function portfolioChipToneClass(tone: DashboardPortfolioAsset["chipTone"]) {
  return tone === "brand" ? "bg-app-brand" : "bg-app-primary";
}

export function formatCalendarDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });
}

export function OverviewMetric({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName: string;
}) {
  return (
    <View className="w-full flex-1 gap-1 md:min-w-[10rem]">
      <Text className="font-display text-sm uppercase tracking-[1.2px] text-app-muted">
        {label}
      </Text>
      <Text className={`font-display text-2xl font-semibold ${valueClassName}`}>{value}</Text>
    </View>
  );
}

export function parseChartValue(valueLabel: string) {
  const parsedValue = Number.parseFloat(valueLabel.replace(/[^0-9.]/g, ""));

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

export function chartPaletteColor(theme: "light" | "dark", index: number) {
  const palette = Colors[theme].chartPalette;

  return palette[index % palette.length];
}

export function DashboardSubscriptionsCard({ data }: { data: DashboardSubscriptionsOverviewData }) {
  return (
    <DashboardCard className="min-h-[280px]">
      <SectionHeader
        title="Subscriptions"
        action={data.detailHref ? "See all" : undefined}
        actionHref={data.detailHref}
      />
      <Text className="font-display text-4xl font-semibold tracking-tight text-app-text">
        {data.summaryValue}
      </Text>
      <Text className="mt-2 font-display text-base text-app-muted">{data.activeCountLabel}</Text>

      <View className="mt-8 flex-row flex-wrap gap-3">
        {data.items.map((item) => (
          <View
            key={item.label}
            className={`h-10 min-w-10 items-center justify-center rounded-xl px-3 ${subscriptionToneClass(item.tone)}`}>
            <Text className="font-display text-sm font-semibold">{item.label}</Text>
          </View>
        ))}
      </View>
    </DashboardCard>
  );
}

export function DashboardTransactionsCard({ items }: { items: DashboardTransaction[] }) {
  return (
    <DashboardCard>
      <SectionHeader
        title="Recent Transactions"
        action="See all"
        actionHref="/recent-transactions"
      />

      <View className="gap-5">
        {items.map((item) => (
          <View
            key={item.id}
            className="gap-2 flex-row sm:items-center sm:justify-between sm:gap-4">
            <View className="min-w-0 flex-1 flex-row items-center gap-4">
              <View className="flex-1">
                <Text className="font-display text-lg md:text-xl font-semibold text-app-text">
                  {item.title}
                </Text>
                <Text className="font-display text-sm text-app-muted">
                  {item.note} - {item.category}
                </Text>
              </View>
            </View>
            <Text
              className={`shrink text-right font-display text-lg md:text-xl font-semibold sm:text-2xl ${transactionToneClass(item.tone)}`}>
              {formatTransactionAmount(item.amount, item.tone)}
            </Text>
          </View>
        ))}
      </View>
    </DashboardCard>
  );
}

export function DashboardInsightsCard() {
  return (
    <View className="relative min-h-[285px] overflow-hidden rounded-[30px] border border-app-border bg-app-surface p-6 shadow-showcase-soft dark:shadow-showcase-soft-dark">
      <SectionHeader title="Insights" />
      <Text className="max-w-[18rem] font-display text-lg lg:text-xl leading-8 text-app-text">
        You spent <Text className="font-semibold text-app-primary">25% more</Text> on Food & Dining
        compared to last month.
      </Text>

      <View className="mt-5 self-start rounded-2xl bg-app-panel px-5 py-3">
        <Text className="font-display text-base font-semibold text-app-text">View Analysis</Text>
      </View>

      <View className="absolute -bottom-12 -right-10 h-40 w-56 rounded-[80px] bg-app-primary/55" />
      <View className="absolute -bottom-14 left-0 h-24 w-40 rounded-[60px] bg-app-primary/35" />
    </View>
  );
}
