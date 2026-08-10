import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { DonutChart } from "react-native-chart-kit/v2";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { AnalyticsHomeCategory } from "@/types/analytics";

type AnalyticsTopCategoriesCardProps = {
  items: AnalyticsHomeCategory[];
  total: number;
};

export function AnalyticsTopCategoriesCard({ items, total }: AnalyticsTopCategoriesCardProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const chartSegments = items.map((item, index) => ({
    color: colors.chartPalette[index % colors.chartPalette.length],
    value: Number.parseFloat(item.value.replace(/[^0-9.]/g, "")) || 0,
    valueLabel: item.value,
    label: item.label,
  }));

  return (
    <View className="rounded-[30px] border border-app-border bg-app-surface p-5 shadow-showcase-soft dark:shadow-showcase-soft-dark md:p-6">
      <View className="mb-5 flex-row items-start justify-between gap-4">
        <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
          Top Categories
        </Text>
        <Pressable
          accessibilityHint="Opens the top categories breakdown"
          accessibilityRole="button"
          onPress={() => router.push("/top-categories")}>
          <Text className="font-display text-sm font-semibold text-app-primary-strong">See all</Text>
        </Pressable>
      </View>

      <View className="items-center pb-6 pt-2">
        <DonutChart
          centerLabel={({ theme: chartTheme }) => (
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: colors.textMuted,
                  fontSize: 10,
                  fontWeight: "600",
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                }}>
                Total
              </Text>
              <Text style={{ color: chartTheme.text, fontSize: 12, fontWeight: "700", marginTop: 2 }}>
                LKR {total.toLocaleString()}
              </Text>
            </View>
          )}
          colors={chartSegments.map((item) => item.color)}
          data={chartSegments}
          height={144}
          labelKey="label"
          legend={false}
          theme={theme}
          valueKey="value"
          width={144}
        />
      </View>

      <View className="gap-4">
        {chartSegments.map((item) => (
          <View key={item.label} className="flex-row items-center justify-between gap-4">
            <View className="flex-row items-center gap-3">
              <View className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
              <Text className="font-display text-base text-app-text">{item.label}</Text>
            </View>
            <Text className="font-display text-base font-semibold text-app-text">{item.valueLabel}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
