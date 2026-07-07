import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { CategoryDistributionItem } from "@/types/analytics";

const CHART_SIZE = 256;
const STROKE_WIDTH = 24;
const RADIUS = (CHART_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CHART_ROTATION = -90;

function chartPaletteColor(theme: "light" | "dark", index: number) {
  const palette = Colors[theme].chartPalette;

  return palette[index % palette.length];
}

export function CategoryDistributionCard({
  exportLabel,
  items,
  title,
}: {
  exportLabel: string;
  items: CategoryDistributionItem[];
  title: string;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const topItem = items[0];
  const chartSegments = items.map((item, index) => ({
    color: chartPaletteColor(theme, index),
    label: item.label,
    value: item.progress,
    valueLabel: item.momLabel,
  }));
  const totalValue = chartSegments.reduce((sum, item) => sum + item.value, 0);
  const chartSlices = chartSegments.reduce<
    ((typeof chartSegments)[number] & { length: number; offset: number })[]
  >((slices, segment) => {
    const previousSlice = slices[slices.length - 1];
    const offset = previousSlice ? previousSlice.offset + previousSlice.length : 0;
    const length = totalValue > 0 ? (segment.value / totalValue) * CIRCUMFERENCE : 0;

    slices.push({ ...segment, length, offset });
    return slices;
  }, []);

  return (
    <DashboardCard className="flex-1">
      <View className="mb-8 flex-row items-start justify-between gap-4">
        <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
          {title}
        </Text>
        <View className="flex-row items-center gap-2">
          <Text className="font-display text-sm font-semibold text-app-muted">{exportLabel}</Text>
          <MaterialCommunityIcons name="download" size={16} color={colors.textMuted} />
        </View>
      </View>

      <View className="gap-8 lg:flex-row lg:items-center">
        <View className="items-center">
          <View className="relative h-64 w-64 items-center justify-center">
            <Svg height={CHART_SIZE} width={CHART_SIZE}>
              <G transform={`rotate(${CHART_ROTATION} ${CHART_SIZE / 2} ${CHART_SIZE / 2})`}>
                <Circle
                  cx={CHART_SIZE / 2}
                  cy={CHART_SIZE / 2}
                  fill="none"
                  r={RADIUS}
                  stroke={colors.chartTrack}
                  strokeWidth={STROKE_WIDTH}
                />
                {chartSlices.map((segment) => (
                  <Circle
                    key={segment.label}
                    cx={CHART_SIZE / 2}
                    cy={CHART_SIZE / 2}
                    fill="none"
                    r={RADIUS}
                    stroke={segment.color}
                    strokeDasharray={`${segment.length} ${CIRCUMFERENCE}`}
                    strokeDashoffset={-segment.offset}
                    strokeLinecap="round"
                    strokeWidth={STROKE_WIDTH}
                  />
                ))}
              </G>
            </Svg>

            <View className="absolute h-44 w-44 items-center justify-center rounded-full bg-app-bg">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.5px] text-app-muted">
                Top Category
              </Text>
              <Text className="mt-2 font-display text-4xl font-semibold text-app-text">
                {topItem?.momLabel}
              </Text>
              <Text className="mt-1 font-display text-lg font-semibold text-app-primary">
                {topItem?.label}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-1 gap-5">
          {chartSegments.map((item) => (
            <View key={item.label} className="flex-row items-center justify-between gap-4">
              <View className="flex-row items-center gap-3">
                <View className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <Text className="font-display text-xl text-app-text">{item.label}</Text>
              </View>
              <Text className="font-display text-2xl font-semibold text-app-text">
                {item.valueLabel}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </DashboardCard>
  );
}
