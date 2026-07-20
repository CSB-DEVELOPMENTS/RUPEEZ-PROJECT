import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import { useState } from "react";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit/v2";

const wealthLineData = [
  { date: "APR-21", netWorth: 850 },
  { date: "APR-28", netWorth: 920 },
  { date: "MAY-05", netWorth: 980 },
  { date: "MAY-12", netWorth: 1100 },
  { date: "MAY-19", netWorth: 1250 },
];

export function WealthLineChart() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const [chartWidth, setChartWidth] = useState(0);

  return (
    <View
      className="mt-6 overflow-hidden rounded-[16px] border border-app-border bg-app-panel/30 px-3 py-4 md:px-4"
      onLayout={(event) => setChartWidth(Math.floor(event.nativeEvent.layout.width))}>
      {chartWidth > 0 ?
        <LineChart
          area
          axisLabelAnimation={false}
          crosshair={false}
          curve="monotone"
          data={wealthLineData}
          defaultSelectedIndex={wealthLineData.length - 1}
          formatXLabel={(value) => `${value}`}
          formatYLabel={(value) => `${value}K`}
          height={220}
          interaction="tap"
          labelStrategy="show"
          legend={false}
          showDots={false}
          showHorizontalGridLines
          showVerticalGridLines={false}
          theme={theme}
          tooltip
          width={Math.max(chartWidth - 24, 220)}
          xKey="date"
          yAxisLabelWidth={36}
          series={[
            {
              area: true,
              curve: "monotone",
              label: "Net Worth",
              strokeWidth: 4,
              yKey: "netWorth",
              color: colors.chartGreen,
            },
          ]}
        />
      : null}
    </View>
  );
}
