import { useState } from "react";
import { Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit/v2";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { FinancialHealthTrendPoint } from "@/types/analytics";

export function FinancialHealthTrendCard({ points }: { points: FinancialHealthTrendPoint[] }) {
  const { theme } = useAppTheme();
  const [chartWidth, setChartWidth] = useState(0);
  const minValue = Math.min(...points.map((point) => point.value));
  const maxValue = Math.max(...points.map((point) => point.value));
  const padding = Math.max(10, Math.ceil((maxValue - minValue) * 0.18));

  return (
    <DashboardCard className="min-h-[260px] flex-1">
      <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
        Net Worth Trend
      </Text>

      <View
        className="mt-6 overflow-hidden rounded-[24px] border border-app-border bg-app-panel/20 px-3 py-4 md:px-4"
        onLayout={(event) => setChartWidth(Math.floor(event.nativeEvent.layout.width))}>
        {chartWidth > 0 ?
          <LineChart
            area
            axisLabelAnimation={false}
            crosshair={false}
            curve="monotone"
            data={points}
            defaultSelectedIndex={points.length - 1}
            formatXLabel={(value) => `${value}`}
            formatYLabel={(value) => `${value}k`}
            height={180}
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
            yAxisLabelWidth={30}
            yDomain={[Math.max(0, minValue - padding), maxValue + padding]}
            series={[
              {
                area: true,
                color: "#12B886",
                curve: "monotone",
                label: "Net Worth",
                strokeWidth: 4,
                yKey: "value",
              },
            ]}
          />
        : null}
      </View>
    </DashboardCard>
  );
}
