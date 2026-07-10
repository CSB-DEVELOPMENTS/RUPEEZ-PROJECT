import { Text, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { CryptoAllocationItem } from "@/types/wealth";

const CHART_SIZE = 160;
const STROKE_WIDTH = 20;
const RADIUS = (CHART_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SVG_ROTATION = -90;

function parseAllocationValue(valueLabel: string) {
  const parsedValue = Number.parseFloat(valueLabel.replace(/[^0-9.]/g, ""));

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function allocationColor(theme: "light" | "dark", index: number) {
  const palette = Colors[theme].chartPalette;

  return palette[index % palette.length];
}

export function CryptoAllocationCard({
  items,
  title,
  totalAssetsLabel,
}: {
  items: CryptoAllocationItem[];
  title: string;
  totalAssetsLabel: string;
}) {
  const { theme } = useAppTheme();
  const trackColor = Colors[theme].chartTrack;

  const chartSegments = items.map((item, index) => ({
    color: allocationColor(theme, index),
    label: item.label,
    value: parseAllocationValue(item.valueLabel),
    valueLabel: item.valueLabel,
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
    <DashboardCard className="min-h-[320px]">
      <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
        {title}
      </Text>

      <View className="items-center py-8">
        <View className="relative h-40 w-40 items-center justify-center">
          <Svg height={CHART_SIZE} width={CHART_SIZE}>
            <G transform={`rotate(${SVG_ROTATION} ${CHART_SIZE / 2} ${CHART_SIZE / 2})`}>
              <Circle
                cx={CHART_SIZE / 2}
                cy={CHART_SIZE / 2}
                fill="none"
                r={RADIUS}
                stroke={trackColor}
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

          <View className="absolute h-28 w-28 items-center justify-center rounded-full bg-app-bg">
            <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
              Assets
            </Text>
            <Text className="mt-2 font-display text-3xl font-semibold text-app-text">
              {totalAssetsLabel}
            </Text>
          </View>
        </View>
      </View>

      <View className="mt-auto gap-4 border-t border-app-border pt-5">
        {chartSegments.map((item) => (
          <View key={item.label} className="flex-row items-center justify-between gap-4">
            <View className="flex-row items-center gap-3">
              <View className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <Text className="font-display text-base text-app-text">{item.label}</Text>
            </View>
            <Text className="font-display text-base text-app-muted">{item.valueLabel}</Text>
          </View>
        ))}
      </View>
    </DashboardCard>
  );
}
