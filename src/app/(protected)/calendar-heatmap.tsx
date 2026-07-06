import { useMemo, useState } from "react";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";

import {
  CalendarDayDetailCard,
  CalendarHeatmapGrid,
} from "@/components/calendar/CalendarHeatmapSections";
import { SummaryCard } from "@/components/calendar/SummaryCard";
import {
  CALENDAR_HEATMAP_FILTER_PLACEHOLDER,
  CALENDAR_HEATMAP_TITLE,
  DASHBOARD_CALENDAR_DAYS,
  DASHBOARD_CALENDAR_DEFAULT_DETAIL_DATE,
  DASHBOARD_CALENDAR_MONTH_LABEL,
} from "@/constants/dashboard";

export default function CalendarHeatmapScreen() {
  const { width } = useWindowDimensions();
  const [selectedDate, setSelectedDate] = useState(DASHBOARD_CALENDAR_DEFAULT_DETAIL_DATE);
  const selectedDay =
    DASHBOARD_CALENDAR_DAYS.find((day) => day.date === selectedDate) ?? DASHBOARD_CALENDAR_DAYS[0];
  const showTwoColumnLayout = width >= 1040;

  const monthSummary = useMemo(() => {
    return DASHBOARD_CALENDAR_DAYS.reduce(
      (totals, day) => {
        day.activities.forEach((activity) => {
          if (activity.tone === "income") {
            totals.inflow += activity.amount;
          } else if (activity.tone === "expense") {
            totals.outflow += activity.amount;
          }
        });

        return totals;
      },
      { inflow: 0, outflow: 0 },
    );
  }, []);

  const netFlow = monthSummary.inflow - monthSummary.outflow;
  const netFlowClassName = netFlow >= 0 ? "text-app-primary" : "text-app-danger";

  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 py-8 md:px-8 lg:px-10">
        <View className="relative overflow-hidden p-4 md:p-6">
          <View className="absolute -left-14 top-20 h-36 w-36 rounded-full bg-app-primary/10" />
          <View className="absolute -right-16 top-8 h-56 w-56 rounded-full bg-app-primary/10" />
          <View className="absolute bottom-10 right-8 h-44 w-44 rounded-full bg-app-danger/10" />

          <View className="relative gap-6">
            <View className="gap-4 lg:flex-row lg:items-center lg:justify-between">
              <View className="flex-row flex-wrap items-center gap-3">
                <Text className="font-display text-3xl font-semibold tracking-tight text-app-text md:text-5xl">
                  {CALENDAR_HEATMAP_TITLE}
                </Text>
                <View className="rounded-full border border-app-border bg-app-surface px-4 py-2">
                  <Text className="font-display text-sm font-semibold uppercase tracking-[1.4px] text-app-muted">
                    {DASHBOARD_CALENDAR_MONTH_LABEL}
                  </Text>
                </View>
              </View>

              <View className="w-full rounded-[24px] border border-app-border bg-app-surface px-5 py-4 lg:min-w-[18rem] lg:w-auto">
                <Text className="font-display text-base text-app-soft">
                  {CALENDAR_HEATMAP_FILTER_PLACEHOLDER}
                </Text>
              </View>
            </View>

            <View className="relative overflow-hidden rounded-[30px] border border-app-border bg-app-surface p-5 shadow-showcase-soft dark:shadow-showcase-soft-dark md:p-6">
              <View className="absolute -right-24 top-0 h-40 w-40 rounded-full bg-app-primary/10" />
              <View className="gap-4 md:flex-row md:flex-wrap">
                <SummaryCard
                  accentClassName={netFlowClassName}
                  label="Net flow (month)"
                  value={`${netFlow >= 0 ? "+" : "-"}LKR ${Math.abs(netFlow).toLocaleString(
                    "en-US",
                    {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    },
                  )}`}
                />
                <SummaryCard
                  accentClassName="text-app-primary"
                  label="Total inflow"
                  value={`LKR ${monthSummary.inflow.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}`}
                />
                <SummaryCard
                  accentClassName="text-app-danger"
                  label="Total outflow"
                  value={`LKR ${monthSummary.outflow.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}`}
                />
              </View>
            </View>

            <View className={`gap-4 ${showTwoColumnLayout ? "xl:flex-row" : ""}`}>
              <View className={showTwoColumnLayout ? "xl:flex-1" : ""}>
                <CalendarHeatmapGrid
                  monthLabel={DASHBOARD_CALENDAR_MONTH_LABEL}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </View>

              <View className={showTwoColumnLayout ? "xl:w-[32%]" : ""}>
                <CalendarDayDetailCard selectedDay={selectedDay} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
