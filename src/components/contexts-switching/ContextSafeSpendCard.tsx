import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { ContextSafeSpendCardData } from "@/types/contexts-switching";

import { formatTransactionAmount } from "../cash-flow/TransactionCard";
import { contextToneClasses, contextToneColor } from "./contextTone";

const CHART_SIZE = 104;
const STROKE_WIDTH = 10;
const RADIUS = (CHART_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ContextSafeSpendCard({ data }: { data: ContextSafeSpendCardData }) {
  const { theme } = useAppTheme();
  const tone = contextToneClasses(data.tone);
  const color = contextToneColor(theme, data.tone);
  const progressLength = (Math.min(100, Math.max(0, data.percent)) / 100) * CIRCUMFERENCE;

  return (
    <View
      className={`min-h-[260px] flex-1 items-center justify-between rounded-[24px] border bg-app-surface p-5 ${data.tone === "orange" ? tone.border : "border-app-border"}`}>
      <View className="relative h-[104px] w-[104px] items-center justify-center">
        <Svg height={CHART_SIZE} width={CHART_SIZE}>
          <G transform={`rotate(-90 ${CHART_SIZE / 2} ${CHART_SIZE / 2})`}>
            <Circle
              cx={CHART_SIZE / 2}
              cy={CHART_SIZE / 2}
              fill="none"
              r={RADIUS}
              stroke={Colors[theme].chartTrack}
              strokeWidth={STROKE_WIDTH}
            />
            <Circle
              cx={CHART_SIZE / 2}
              cy={CHART_SIZE / 2}
              fill="none"
              r={RADIUS}
              stroke={color}
              strokeDasharray={`${progressLength} ${CIRCUMFERENCE}`}
              strokeLinecap="round"
              strokeWidth={STROKE_WIDTH}
            />
          </G>
        </Svg>

        <Text className="absolute font-display text-lg font-semibold text-app-text">
          {data.percent}%
        </Text>
      </View>

      <View className="items-center gap-2">
        <Text className={`text-center font-display text-lg font-semibold ${tone.text}`}>
          {data.label}
        </Text>
        <Text className="font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
          Safe to spend
        </Text>
        <Text className="text-center font-display text-2xl font-semibold tracking-tight text-app-text md:text-3xl">
          {formatTransactionAmount(data.amount)}
        </Text>
      </View>

      {data.tone === "orange" ?
        <View className="absolute right-5 top-5 h-5 w-5 items-center justify-center rounded-full border border-app-chart-orange">
          <MaterialCommunityIcons name="star-four-points-outline" size={12} color={color} />
        </View>
      : null}
    </View>
  );
}
