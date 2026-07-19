import { useState } from "react";
import { Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit/v2";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { ContextPerformancePoint } from "@/types/contexts-switching";

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <View className="flex-row items-center gap-2">
      <View className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
      <Text className="font-display text-xs font-semibold uppercase tracking-[1.2px] text-app-muted">
        {label}
      </Text>
    </View>
  );
}

export function ContextPerformanceCard({ data }: { data: ContextPerformancePoint[] }) {
  const { theme } = useAppTheme();
  const [chartWidth, setChartWidth] = useState(0);
  const colors = Colors[theme];

  return (
    <DashboardCard className="min-h-[440px] flex-1">
      <View className="gap-4 sm:flex-row sm:items-start sm:justify-between">
        <View className="gap-1">
          <Text className="font-display text-2xl font-semibold tracking-tight text-app-text md:text-3xl">
            Performance This Month
          </Text>
          <Text className="font-display text-base leading-6 text-app-muted">
            Aggregated view across 5 contexts
          </Text>
        </View>

        <View className="flex-row flex-wrap items-center gap-4">
          <LegendDot color={colors.primary} label="Income" />
          <LegendDot color={colors.chartPink} label="Expenses" />
          <LegendDot color={colors.chartPurple} label="Net" />
        </View>
      </View>

      <View
        className="mt-7 flex-1 overflow-hidden rounded-[24px] bg-app-panel/15 px-2 py-4"
        onLayout={(event) => setChartWidth(Math.floor(event.nativeEvent.layout.width))}>
        {chartWidth > 0 ?
          <LineChart
            axisLabelAnimation={false}
            crosshair={false}
            curve="monotone"
            data={data}
            defaultSelectedIndex={data.length - 1}
            formatXLabel={(value) => `${value}`}
            formatYLabel={(value) => `${value}K`}
            height={300}
            interaction="tap"
            labelStrategy="show"
            legend={false}
            showDots={false}
            showHorizontalGridLines
            showVerticalGridLines={false}
            theme={theme}
            tooltip
            width={Math.max(chartWidth - 16, 260)}
            xKey="label"
            yAxisLabelWidth={42}
            yDomain={[0, 400]}
            series={[
              {
                color: colors.primary,
                curve: "monotone",
                label: "Income",
                strokeWidth: 4,
                yKey: "income",
              },
              {
                color: colors.chartPink,
                curve: "monotone",
                label: "Expenses",
                strokeWidth: 4,
                yKey: "expenses",
              },
              {
                color: colors.chartPurple,
                curve: "monotone",
                label: "Net",
                strokeWidth: 4,
                yKey: "net",
              },
            ]}
          />
        : null}
      </View>
    </DashboardCard>
  );
}
