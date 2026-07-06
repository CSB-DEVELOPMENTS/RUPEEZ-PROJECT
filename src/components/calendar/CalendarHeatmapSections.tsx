import { Pressable, Text, View, useWindowDimensions } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DASHBOARD_CALENDAR_DAYS, DASHBOARD_WEEK_DAYS } from "@/constants/dashboard";
import type { DashboardCalendarDay } from "@/types/dashboard";
import TransactionCard from "../cash-flow/TransactionCard";

function calendarToneClass(day: DashboardCalendarDay) {
  if (!day.isCurrentMonth) {
    return {
      container: "border-transparent bg-transparent",
      selectedContainer: "border-transparent bg-transparent",
      text: "text-app-soft",
    };
  }

  switch (day.tone) {
    case "positive":
      return {
        container: "border-app-primary/25 bg-app-primary/15",
        selectedContainer: "border-app-primary bg-app-primary/20",
        text: "text-app-primary",
      };
    case "negative":
      return {
        container: "border-app-danger/25 bg-app-danger/15",
        selectedContainer: "border-app-primary bg-app-danger/20",
        text: "text-app-danger",
      };
    case "neutral":
      return {
        container: "border-app-brand/25 bg-app-brand/15",
        selectedContainer: "border-app-primary bg-app-brand/20",
        text: "text-app-text",
      };
    default:
      return {
        container: "border-app-border bg-app-panel/20",
        selectedContainer: "border-app-primary bg-app-panel/35",
        text: "text-app-text",
      };
  }
}

function formatLongDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  });
}

function formatWeekdaySummary(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    weekday: "long",
  });
}

function formatCurrency(value: number) {
  return `LKR ${value.toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })}`;
}

export function buildDaySummary(day: DashboardCalendarDay) {
  const inflow = day.activities.reduce((total, activity) => {
    return activity.tone === "income" ? total + activity.amount : total;
  }, 0);
  const outflow = day.activities.reduce((total, activity) => {
    return activity.tone === "expense" ? total + activity.amount : total;
  }, 0);

  return {
    inflow,
    net: inflow - outflow,
    outflow,
  };
}

function SectionTitle({ title }: { title: string }) {
  return (
    <View className="mb-5 flex-row items-center justify-between gap-4">
      <Text className="font-display text-2xl font-semibold tracking-tight text-app-text md:text-3xl">
        {title}
      </Text>
    </View>
  );
}

export function CalendarHeatmapGrid({
  monthLabel,
  selectedDate,
  setSelectedDate,
}: {
  monthLabel: string;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}) {
  const { width } = useWindowDimensions();
  const isCompact = width < 480;
  const dayCellSize = isCompact ? 40 : width < 768 ? 46 : 56;

  return (
    <DashboardCard>
      <View className="mb-6 gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
        <View className="flex-row flex-wrap items-center gap-3">
          <View className="h-11 w-11 items-center justify-center rounded-2xl border border-app-border bg-app-surface">
            <Text className="font-display text-xl text-app-muted">{"<"}</Text>
          </View>
          <Text className="font-display text-2xl font-semibold tracking-tight text-app-text md:text-3xl">
            {monthLabel}
          </Text>
          <View className="h-11 w-11 items-center justify-center rounded-2xl border border-app-border bg-app-surface">
            <Text className="font-display text-xl text-app-muted">{">"}</Text>
          </View>
        </View>

        <View className="flex-row flex-wrap items-center gap-3">
          <Text className="font-display text-sm font-semibold uppercase tracking-[1.2px] text-app-muted">
            Out
          </Text>
          <View className="flex-row gap-2">
            <View className="h-3 w-3 rounded-full bg-app-danger/40" />
            <View className="h-3 w-3 rounded-full bg-app-danger/70" />
            <View className="h-3 w-3 rounded-full bg-app-danger" />
          </View>
          <View className="mx-2 h-4 w-px bg-app-border" />
          <View className="flex-row gap-2">
            <View className="h-3 w-3 rounded-full bg-app-primary/40" />
            <View className="h-3 w-3 rounded-full bg-app-primary/70" />
            <View className="h-3 w-3 rounded-full bg-app-primary" />
          </View>
          <Text className="font-display text-sm font-semibold uppercase tracking-[1.2px] text-app-muted">
            In
          </Text>
        </View>
      </View>

      <View className="mb-5 flex-row justify-between px-1">
        {DASHBOARD_WEEK_DAYS.map((day, index) => (
          <Text
            key={index}
            className="text-center font-display text-xs text-app-soft md:text-sm"
            style={{ width: `${100 / 7}%` }}>
            {day}
          </Text>
        ))}
      </View>

      <View className="flex-row flex-wrap gap-y-4">
        {DASHBOARD_CALENDAR_DAYS.map((day) => {
          const styles = calendarToneClass(day);
          const isSelected = selectedDate === day.date;

          return (
            <View key={day.date} className="items-center" style={{ width: `${100 / 7}%` }}>
              <Pressable
                accessibilityRole="button"
                className={`relative items-center justify-center rounded-3xl border ${
                  isSelected ? styles.selectedContainer : styles.container
                }`}
                disabled={!day.isCurrentMonth}
                onPress={() => setSelectedDate(day.date)}
                style={{ height: dayCellSize, width: dayCellSize }}>
                <Text className={`font-display text-base font-semibold md:text-lg ${styles.text}`}>
                  {day.dayLabel}
                </Text>
                {isSelected ? (
                  <View className="absolute -bottom-1 h-2 w-2 rounded-full bg-app-primary" />
                ) : null}
              </Pressable>
            </View>
          );
        })}
      </View>
    </DashboardCard>
  );
}

export function CalendarDayDetailCard({ selectedDay }: { selectedDay: DashboardCalendarDay }) {
  const { width } = useWindowDimensions();
  const selectedSummary = buildDaySummary(selectedDay);
  const selectedNetClassName = selectedSummary.net >= 0 ? "text-app-primary" : "text-app-danger";
  const selectedActivities = selectedDay.activities;
  const hasActivities = selectedActivities.length > 0;
  const isCompact = width < 480;

  return (
    <DashboardCard className="h-full">
      <SectionTitle title={formatLongDate(selectedDay.date)} />

      <View
        className={`mb-6 rounded-[24px] bg-app-panel/30 px-4 py-4 ${
          isCompact ? "gap-4" : "flex-row items-start justify-between gap-4"
        }`}>
        <View className="gap-1">
          <Text className="font-display text-sm font-semibold uppercase tracking-[1.2px] text-app-muted">
            {formatWeekdaySummary(selectedDay.date)} summary
          </Text>
          <Text
            className={`font-display text-2xl font-semibold tracking-tight md:text-3xl ${selectedNetClassName}`}>
            {`${selectedSummary.net >= 0 ? "+" : "-"}${formatCurrency(Math.abs(selectedSummary.net)).replace("LKR ", "")}`}
          </Text>
        </View>

        <View className={`gap-3 ${isCompact ? "" : "items-end"}`}>
          <Text className="font-display text-sm font-semibold uppercase tracking-[1.2px] text-app-muted">
            Net flow
          </Text>
          <View className={`${isCompact ? "w-full" : "w-24"} gap-2`}>
            <View className="h-2 rounded-full bg-app-border">
              <View
                className="h-2 rounded-full bg-app-primary"
                style={{
                  width: `${
                    selectedSummary.inflow + selectedSummary.outflow === 0
                      ? 0
                      : (selectedSummary.inflow /
                          (selectedSummary.inflow + selectedSummary.outflow)) *
                        100
                  }%`,
                }}
              />
            </View>
            <View className="h-2 rounded-full bg-app-border">
              <View
                className="h-2 rounded-full bg-app-danger"
                style={{
                  width: `${
                    selectedSummary.inflow + selectedSummary.outflow === 0
                      ? 0
                      : (selectedSummary.outflow /
                          (selectedSummary.inflow + selectedSummary.outflow)) *
                        100
                  }%`,
                }}
              />
            </View>
          </View>
        </View>
      </View>

      <View className="mb-5 gap-3">
        <View className="flex-row flex-wrap items-center justify-between gap-2 rounded-[20px] bg-app-primary/10 px-4 py-3">
          <Text className="font-display text-sm font-semibold uppercase tracking-[1.2px] text-app-primary-strong">
            Inflow
          </Text>
          <Text className="font-display text-lg font-semibold text-app-primary">
            {formatCurrency(selectedSummary.inflow)}
          </Text>
        </View>
        <View className="flex-row flex-wrap items-center justify-between gap-2 rounded-[20px] bg-app-danger/10 px-4 py-3">
          <Text className="font-display text-sm font-semibold uppercase tracking-[1.2px] text-app-danger">
            Outflow
          </Text>
          <Text className="font-display text-lg font-semibold text-app-danger">
            {formatCurrency(selectedSummary.outflow)}
          </Text>
        </View>
      </View>

      <View className="gap-3">
        {hasActivities ? (
          selectedActivities.map((activity) => (
            <TransactionCard key={activity.id} item={activity} />
          ))
        ) : (
          <View className="rounded-[22px] bg-app-panel/30 px-4 py-6">
            <Text className="font-display text-lg font-semibold text-app-text">
              No activity recorded
            </Text>
            <Text className="mt-2 font-display text-base text-app-muted">
              This day has no inflow or outflow items yet.
            </Text>
          </View>
        )}
      </View>

      <View className="mt-6 rounded-[22px] border border-app-border bg-app-surface px-5 py-4">
        <Text className="text-center font-display text-base font-semibold text-app-text">
          View Full Day Log
        </Text>
      </View>
    </DashboardCard>
  );
}
