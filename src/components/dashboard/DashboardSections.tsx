import { useState } from "react";
import { Modal, Platform, Pressable, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit/v2";

import { DASHBOARD_WEEK_DAYS } from "@/constants/dashboard";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type {
  DashboardCalendarDay,
  DashboardCategory,
  DashboardLegendTone,
  DashboardOverviewData,
  DashboardPortfolioAsset,
  DashboardSubscriptionAvatar,
  DashboardTransaction,
} from "@/types/dashboard";

import { formatTransactionAmount, transactionToneClass } from "../cash-flow/TransactionCard";
import { DashboardCard } from "./DashboardCard";
import SectionHeader from "./SectionHeader";

function dotToneClass(tone: DashboardLegendTone) {
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

function calendarToneClass(day: DashboardCalendarDay) {
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

function subscriptionToneClass(tone: DashboardSubscriptionAvatar["tone"]) {
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

function portfolioChipToneClass(tone: DashboardPortfolioAsset["chipTone"]) {
  return tone === "brand" ? "bg-app-brand" : "bg-app-primary";
}

function formatCalendarDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    weekday: "long",
  });
}

function OverviewMetric({
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

export function DashboardOverviewCard({ data }: { data: DashboardOverviewData }) {
  const { theme } = useAppTheme();
  const [chartWidth, setChartWidth] = useState(0);

  return (
    <DashboardCard>
      <SectionHeader
        action={data.detailHref ? "See more" : undefined}
        actionHref={data.detailHref}
        title="Cash Flow Overview"
        eyebrow={data.periodLabel}
        filterRanges={data.fileterRanges}
      />

      <View className="mb-8 gap-4 md:flex-row">
        {data.incomeTotal && (
          <OverviewMetric
            label="Income"
            value={data.incomeTotal}
            valueClassName="text-app-primary"
          />
        )}
        {data.expenseTotal && (
          <OverviewMetric
            label="Expenses"
            value={data.expenseTotal}
            valueClassName="text-app-danger"
          />
        )}
      </View>

      <View
        className="overflow-hidden rounded-[28px] border border-app-border bg-app-panel/30 px-3 py-4 md:px-4"
        onLayout={(event) => setChartWidth(Math.floor(event.nativeEvent.layout.width))}>
        {chartWidth > 0 ?
          <LineChart
            area
            axisLabelAnimation={false}
            crosshair={false}
            curve="monotone"
            data={data.points}
            defaultSelectedIndex={data.points.length - 1}
            formatXLabel={(value) => `${value}`}
            formatYLabel={(value) => `${value}k`}
            height={240}
            interaction="tap"
            labelStrategy="show"
            legend={false}
            showDots={false}
            showHorizontalGridLines
            showVerticalGridLines={false}
            theme={theme}
            tooltip
            width={Math.max(chartWidth - 24, 220)}
            xKey="label"
            yAxisLabelWidth={28}
            yDomain={[0, 70]}
            series={[
              {
                area: true,
                color: "#12B886",
                curve: "monotone",
                label: "Income",
                strokeWidth: 4,
                yKey: "income",
              },
              {
                color: "#E03131",
                curve: "monotone",
                label: "Expenses",
                strokeDasharray: [8, 6],
                strokeWidth: 3,
                yKey: "expense",
              },
            ]}
          />
        : null}
      </View>
    </DashboardCard>
  );
}

export function DashboardCalendarCard({
  items,
  monthLabel,
}: {
  items: DashboardCalendarDay[];
  monthLabel: string;
}) {
  const [selectedDay, setSelectedDay] = useState<DashboardCalendarDay | null>(null);
  const showMobilePopup = Platform.OS !== "web" && selectedDay !== null;

  return (
    <>
      <DashboardCard className="relative overflow-visible z-10">
        <SectionHeader
          title="Calendar Heatmap"
          action={monthLabel}
          actionHref="/calendar-heatmap"
        />

        <View className="mb-5 flex-row justify-between px-1">
          {DASHBOARD_WEEK_DAYS.map((day, index) => (
            <Text key={index} className="w-10 text-center font-display text-sm text-app-soft">
              {day}
            </Text>
          ))}
        </View>

        <View className="flex-row flex-wrap gap-y-3">
          {items.map((day) => {
            const dayStyles = calendarToneClass(day);
            const isSelected = selectedDay?.date === day.date;
            const popupText =
              day.totalLabel ?? (day.activityCount === 0 ? "No activities recorded" : undefined);

            return (
              <View key={day.date} className="items-center" style={{ width: "14.2857%" }}>
                <Pressable
                  className={`h-9 w-9 items-center justify-center rounded-2xl border sm:h-10 sm:w-10 ${dayStyles.bg} ${
                    isSelected ? "border-app-primary" : ""
                  }`}
                  disabled={!day.isCurrentMonth}
                  onHoverIn={Platform.OS === "web" ? () => setSelectedDay(day) : undefined}
                  onHoverOut={Platform.OS === "web" ? () => setSelectedDay(null) : undefined}
                  onPress={Platform.OS === "web" ? undefined : () => setSelectedDay(day)}>
                  <Text className={`font-display text-base md:text-lg ${dayStyles.text}`}>
                    {day.dayLabel}
                  </Text>
                </Pressable>

                {Platform.OS === "web" && isSelected ?
                  <View className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-52 -translate-x-1/2 rounded-[20px] border border-app-border bg-app-surface px-4 py-3 shadow-showcase-soft">
                    <Text className="font-display text-sm font-semibold text-app-text">
                      {formatCalendarDate(day.date)}
                    </Text>
                    <Text className="mt-1 font-display text-xs text-app-muted">{popupText}</Text>
                    {day.activities.length > 0 ?
                      <View className="mt-3 gap-2">
                        {day.activities.slice(0, 3).map((activity) => (
                          <View key={activity.id} className="gap-1">
                            <Text className="font-display text-sm font-semibold text-app-text">
                              {activity.title}
                            </Text>
                            <Text className="font-display text-xs text-app-muted">
                              {[
                                activity.category,
                                activity.time,
                                `LKR ${activity.amount.toFixed(2)}`,
                              ]
                                .filter(Boolean)
                                .join(" - ")}
                            </Text>
                          </View>
                        ))}
                      </View>
                    : null}
                  </View>
                : null}
              </View>
            );
          })}
        </View>
      </DashboardCard>

      <Modal
        animationType="fade"
        transparent
        visible={showMobilePopup}
        onRequestClose={() => setSelectedDay(null)}>
        <Pressable className="flex-1 bg-black/40 px-5 py-10" onPress={() => setSelectedDay(null)}>
          <View className="flex-1 justify-center">
            <Pressable
              className="rounded-[28px] border border-app-border bg-app-surface p-5 shadow-showcase-soft"
              onPress={() => {}}>
              {selectedDay ?
                <View className="gap-4">
                  <View className="flex-row items-start justify-between gap-4">
                    <View className="flex-1 gap-1">
                      <Text className="font-display text-lg font-semibold text-app-text">
                        {formatCalendarDate(selectedDay.date)}
                      </Text>
                      <Text className="font-display text-sm text-app-muted">
                        {selectedDay.totalLabel ?? "No activities recorded for this day"}
                      </Text>
                    </View>
                    <Pressable onPress={() => setSelectedDay(null)}>
                      <Text className="font-display text-sm font-semibold text-app-primary">
                        Close
                      </Text>
                    </Pressable>
                  </View>

                  {selectedDay.activities.length > 0 ?
                    <View className="gap-3">
                      {selectedDay.activities.map((activity) => (
                        <View
                          key={activity.id}
                          className="rounded-[20px] border border-app-border bg-app-panel/35 px-4 py-3">
                          <Text className="font-display text-base font-semibold text-app-text">
                            {activity.title}
                          </Text>
                          <Text className="mt-1 font-display text-sm text-app-muted">
                            {[activity.category, activity.time, activity.amount]
                              .filter(Boolean)
                              .join(" - ")}
                          </Text>
                        </View>
                      ))}
                    </View>
                  : null}
                </View>
              : null}
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

export function DashboardCategoriesCard({
  total,
  items,
}: {
  total: string;
  items: DashboardCategory[];
}) {
  return (
    <DashboardCard>
      <SectionHeader title="Top Categories" action="See all" actionHref="/top-categories" />

      <View className="items-center pb-6 pt-2">
        <View className="h-36 w-36 items-center justify-center rounded-full border-[12px] border-app-danger">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-app-surface">
            <Text className="font-display text-xs uppercase tracking-[1.2px] text-app-muted">
              Total
            </Text>
            <Text className="mt-1 font-display text-2xl font-semibold text-app-text">{total}</Text>
          </View>
        </View>
      </View>

      <View className="gap-4">
        {items.map((item) => (
          <View key={item.label} className="flex-row items-center justify-between gap-4">
            <View className="flex-row items-center gap-3">
              <View className={`h-3 w-3 rounded-full ${dotToneClass(item.tone)}`} />
              <Text className="font-display text-base text-app-text">{item.label}</Text>
            </View>
            <Text className="font-display text-base font-semibold text-app-text">{item.value}</Text>
          </View>
        ))}
      </View>
    </DashboardCard>
  );
}

export function DashboardSubscriptionsCard({ items }: { items: DashboardSubscriptionAvatar[] }) {
  return (
    <DashboardCard className="min-h-[280px]">
      <SectionHeader title="Subscriptions" />
      <Text className="font-display text-4xl font-semibold tracking-tight text-app-text">
        LKR 18,750.00
      </Text>
      <Text className="mt-2 font-display text-base text-app-muted">6 active subscriptions</Text>

      <View className="mt-8 flex-row flex-wrap gap-3">
        {items.map((item) => (
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

export function DashboardPortfolioCard({ items }: { items: DashboardPortfolioAsset[] }) {
  return (
    <DashboardCard className="min-h-[280px]">
      <SectionHeader title="Crypto Portfolio" action="See all" actionHref="/crypto-assets" />

      <View className="gap-5">
        {items.map((asset) => (
          <View
            key={asset.symbol}
            className="flex-row items-center justify-between gap-4 rounded-[22px] border border-app-border bg-app-panel/30 p-4">
            <View className="flex-row items-center gap-4">
              <View
                className={`h-12 w-12 items-center justify-center rounded-full ${portfolioChipToneClass(asset.chipTone)}`}>
                <Text className="font-display text-base font-semibold text-app-primary-contrast">
                  {asset.symbol[0]}
                </Text>
              </View>
              <View>
                <Text className="font-display text-lg md:text-xl font-semibold text-app-text">
                  {asset.symbol}
                </Text>
                <Text className="font-display text-sm text-app-muted">{asset.subtitle}</Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="font-display text-lg md:text-xl font-semibold text-app-text">
                {asset.value}
              </Text>
              <Text className="mt-1 font-display text-sm font-semibold text-app-primary">
                {asset.change}
              </Text>
            </View>
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
              {formatTransactionAmount(item.tone, item.amount)}
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
