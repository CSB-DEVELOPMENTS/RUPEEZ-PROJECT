import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import { DashboardOverviewData } from "@/types/dashboard";
import { useState } from "react";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit/v2";
import { DashboardCard } from "./DashboardCard";
import { OverviewMetric } from "./DashboardSections";
import SectionHeader from "./SectionHeader";

export function DashboardOverviewCard({ data }: { data: DashboardOverviewData }) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const [chartWidth, setChartWidth] = useState(0);

  return (
    <DashboardCard className="h-full">
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
            width={Math.max(chartWidth - 24, 1)}
            xKey="label"
            yAxisLabelWidth={28}
            yDomain={[0, 70]}
            series={[
              {
                area: true,
                color: colors.chartGreen,
                curve: "monotone",
                label: "Income",
                strokeWidth: 4,
                yKey: "income",
              },
              {
                color: colors.chartRed,
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
