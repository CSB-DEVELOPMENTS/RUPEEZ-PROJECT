import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import { DashboardCategory } from "@/types/dashboard";
import { Text, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import { DashboardCard } from "./DashboardCard";
import { chartPaletteColor, parseChartValue } from "./DashboardSections";
import SectionHeader from "./SectionHeader";

const DASHBOARD_CATEGORY_CHART_SIZE = 144;
const DASHBOARD_CATEGORY_STROKE_WIDTH = 18;
const DASHBOARD_CATEGORY_RADIUS =
  (DASHBOARD_CATEGORY_CHART_SIZE - DASHBOARD_CATEGORY_STROKE_WIDTH) / 2;
const DASHBOARD_CATEGORY_CIRCUMFERENCE = 2 * Math.PI * DASHBOARD_CATEGORY_RADIUS;
const CHART_ROTATION = -90;

export function DashboardCategoriesCard({
  total,
  items,
}: {
  total: string;
  items: DashboardCategory[];
}) {
  const { theme } = useAppTheme();
  const chartSegments = items.map((item, index) => ({
    color: chartPaletteColor(theme, index),
    label: item.label,
    value: parseChartValue(item.value),
    valueLabel: item.value,
  }));
  const totalValue = chartSegments.reduce((sum, item) => sum + item.value, 0);
  const chartSlices = chartSegments.reduce<
    ((typeof chartSegments)[number] & { length: number; offset: number })[]
  >((slices, segment) => {
    const previousSlice = slices[slices.length - 1];
    const offset = previousSlice ? previousSlice.offset + previousSlice.length : 0;
    const length =
      totalValue > 0 ? (segment.value / totalValue) * DASHBOARD_CATEGORY_CIRCUMFERENCE : 0;

    slices.push({ ...segment, length, offset });
    return slices;
  }, []);

  return (
    <DashboardCard>
      <SectionHeader title="Top Categories" action="See all" actionHref="/top-categories" />

      <View className="items-center pb-6 pt-2">
        <View className="relative h-36 w-36 items-center justify-center">
          <Svg height={DASHBOARD_CATEGORY_CHART_SIZE} width={DASHBOARD_CATEGORY_CHART_SIZE}>
            <G
              transform={`rotate(${CHART_ROTATION} ${DASHBOARD_CATEGORY_CHART_SIZE / 2} ${
                DASHBOARD_CATEGORY_CHART_SIZE / 2
              })`}>
              <Circle
                cx={DASHBOARD_CATEGORY_CHART_SIZE / 2}
                cy={DASHBOARD_CATEGORY_CHART_SIZE / 2}
                fill="none"
                r={DASHBOARD_CATEGORY_RADIUS}
                stroke={Colors[theme].chartTrack}
                strokeWidth={DASHBOARD_CATEGORY_STROKE_WIDTH}
              />
              {chartSlices.map((segment) => (
                <Circle
                  key={segment.label}
                  cx={DASHBOARD_CATEGORY_CHART_SIZE / 2}
                  cy={DASHBOARD_CATEGORY_CHART_SIZE / 2}
                  fill="none"
                  r={DASHBOARD_CATEGORY_RADIUS}
                  stroke={segment.color}
                  strokeDasharray={`${segment.length} ${DASHBOARD_CATEGORY_CIRCUMFERENCE}`}
                  strokeDashoffset={-segment.offset}
                  strokeLinecap="round"
                  strokeWidth={DASHBOARD_CATEGORY_STROKE_WIDTH}
                />
              ))}
            </G>
          </Svg>

          <View className="absolute h-24 w-24 items-center justify-center rounded-full bg-app-surface">
            <Text className="font-display text-xs uppercase tracking-[1.2px] text-app-muted">
              Total
            </Text>
            <Text className="mt-1 font-display text-2xl font-semibold text-app-text">{total}</Text>
          </View>
        </View>
      </View>

      <View className="gap-4">
        {chartSegments.map((item) => (
          <View key={item.label} className="flex-row items-center justify-between gap-4">
            <View className="flex-row items-center gap-3">
              <View className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <Text className="font-display text-base text-app-text">{item.label}</Text>
            </View>
            <Text className="font-display text-base font-semibold text-app-text">
              {item.valueLabel}
            </Text>
          </View>
        ))}
      </View>
    </DashboardCard>
  );
}
