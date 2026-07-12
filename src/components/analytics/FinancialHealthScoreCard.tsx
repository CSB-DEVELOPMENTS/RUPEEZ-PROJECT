import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { FinancialHealthMetric } from "@/types/analytics";

const CHART_SIZE = 228;
const STROKE_WIDTH = 18;
const RADIUS = (CHART_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ROTATION = -90;

type FinancialHealthScoreCardProps = {
  metrics: FinancialHealthMetric[];
  statusLabel: string;
  total: number;
  value: number;
};

export function FinancialHealthScoreCard({
  metrics,
  statusLabel,
  total,
  value,
}: FinancialHealthScoreCardProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const progress = total > 0 ? Math.min(Math.max(value / total, 0), 1) : 0;
  const strokeLength = progress * CIRCUMFERENCE;

  return (
    <DashboardCard className="xl:w-[32%]">
      <Text className="text-center font-display text-2xl font-semibold tracking-tight text-app-text">
        Financial Health
      </Text>

      <View className="mt-6 items-center">
        <View className="relative h-[228px] w-[228px] items-center justify-center">
          <Svg height={CHART_SIZE} width={CHART_SIZE}>
            <Circle
              cx={CHART_SIZE / 2}
              cy={CHART_SIZE / 2}
              fill="none"
              r={RADIUS}
              stroke={colors.chartTrack}
              strokeWidth={STROKE_WIDTH}
            />
            <Circle
              cx={CHART_SIZE / 2}
              cy={CHART_SIZE / 2}
              fill="none"
              r={RADIUS}
              stroke={colors.primary}
              strokeDasharray={`${strokeLength} ${CIRCUMFERENCE}`}
              strokeLinecap="round"
              strokeWidth={STROKE_WIDTH}
              transform={`rotate(${ROTATION} ${CHART_SIZE / 2} ${CHART_SIZE / 2})`}
            />
          </Svg>

          <View className="absolute items-center">
            <Text className="font-display text-6xl font-semibold tracking-tight text-app-text">
              {value}
            </Text>
            <Text className="mt-2 font-display text-xl text-app-muted">/{total}</Text>
          </View>
        </View>

        <View className="mt-[-20px] rounded-full border border-app-border bg-app-surface px-6 py-3">
          <Text className="font-display text-xl font-semibold text-app-primary">{statusLabel}</Text>
        </View>
      </View>

      <View className="mt-8 gap-6">
        {metrics.map((item) => (
          <View key={item.label} className="gap-2.5">
            <View className="flex-row items-center justify-between gap-4">
              <Text className="font-display text-lg text-app-text">{item.label}</Text>
              <Text className="font-display text-lg font-semibold text-app-text">
                {item.scoreLabel}
              </Text>
            </View>

            <View className="h-2.5 overflow-hidden rounded-full bg-app-panel">
              <View
                className="h-full rounded-full bg-app-primary"
                style={{ width: `${Math.max(item.progress, 4)}%` }}
              />
            </View>
          </View>
        ))}
      </View>

      <View className="mt-8 self-start rounded-2xl border border-app-border bg-app-panel/20 px-5 py-3">
        <Text className="font-display text-base font-semibold text-app-primary">
          View Recommendations
        </Text>
      </View>
    </DashboardCard>
  );
}
