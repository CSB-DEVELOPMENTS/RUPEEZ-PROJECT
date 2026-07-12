import { Text, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { FinancialHealthAllocationItem } from "@/types/analytics";
import { formatTransactionAmount } from "../cash-flow/TransactionCard";

const CHART_SIZE = 188;
const STROKE_WIDTH = 26;
const RADIUS = (CHART_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ROTATION = -90;

function chartPaletteColor(theme: "light" | "dark", index: number) {
  const palette = Colors[theme].chartPalette;

  return palette[index % palette.length];
}

export function FinancialHealthAllocationCard({
  items,
}: {
  items: FinancialHealthAllocationItem[];
}) {
  const { theme } = useAppTheme();
  const totalShare = items.reduce((sum, item) => sum + item.value, 0);
  const segments = items.map((item, index) => ({
    ...item,
    color: chartPaletteColor(theme, index),
  }));
  const slices = segments.reduce<
    (FinancialHealthAllocationItem & { color: string; length: number; offset: number })[]
  >((acc, segment) => {
    const previous = acc[acc.length - 1];
    const offset = previous ? previous.offset + previous.length : 0;
    const length = totalShare > 0 ? (segment.share / 100) * CIRCUMFERENCE : 0;

    acc.push({ ...segment, length, offset });
    return acc;
  }, []);

  return (
    <DashboardCard className="">
      <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
        Asset Allocation
      </Text>

      <View className="mt-6 gap-6 md:flex-row md:items-center">
        <View className="items-center md:w-[48%]">
          <View className="relative h-[188px] w-[188px] items-center justify-center">
            <Svg height={CHART_SIZE} width={CHART_SIZE}>
              <G transform={`rotate(${ROTATION} ${CHART_SIZE / 2} ${CHART_SIZE / 2})`}>
                <Circle
                  cx={CHART_SIZE / 2}
                  cy={CHART_SIZE / 2}
                  fill="none"
                  r={RADIUS}
                  stroke={Colors[theme].chartTrack}
                  strokeWidth={STROKE_WIDTH}
                />
                {slices.map((segment) => (
                  <Circle
                    key={segment.id}
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
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.5px] text-app-muted">
                Total
              </Text>
              <Text className="mt-1 font-display text-xl font-semibold text-app-text text-center">
                {formatTransactionAmount(totalShare)}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-auto gap-4">
          {segments.map((item) => (
            <View key={item.id} className="flex-row items-center justify-between gap-4">
              <View className="flex-row items-center gap-3">
                <View className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <Text className="font-display text-lg text-app-text">{item.label}</Text>
              </View>
              <View className="items-end">
                <Text className="font-display text-lg font-semibold text-app-text">
                  {item.share}%
                </Text>
                <Text className="font-display text-sm text-app-muted">
                  {formatTransactionAmount(item.value)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </DashboardCard>
  );
}
