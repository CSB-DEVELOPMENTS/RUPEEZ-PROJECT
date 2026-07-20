import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import { DashboardCategory } from "@/types/dashboard";
import { Text, View } from "react-native";
import { DonutChart } from "react-native-chart-kit/v2";
import { formatTransactionAmount } from "../cash-flow/TransactionCard";
import { DashboardCard } from "./DashboardCard";
import { chartPaletteColor, parseChartValue } from "./DashboardSections";
import SectionHeader from "./SectionHeader";

export function DashboardCategoriesCard({
  total,
  items,
}: {
  total: number;
  items: DashboardCategory[];
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  const chartSegments = items.map((item, index) => ({
    color: chartPaletteColor(theme, index),
    label: item.label,
    value: parseChartValue(item.value),
    valueLabel: item.value,
  }));

  const donutColors = chartSegments.map((s) => s.color);

  const donutData = chartSegments.map((s) => ({ label: s.label, value: s.value }));

  return (
    <DashboardCard>
      <SectionHeader title="Top Categories" action="See all" actionHref="/top-categories" />

      <View className="items-center pb-6 pt-2">
        <DonutChart
          data={donutData}
          valueKey="value"
          labelKey="label"
          colors={donutColors}
          centerLabel={({ theme: chartTheme }) => (
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  color: colors.textMuted,
                  fontSize: 10,
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                }}>
                Total
              </Text>
              <Text
                style={{ color: chartTheme.text, fontSize: 12, fontWeight: "700", marginTop: 2 }}>
                {formatTransactionAmount(total)}
              </Text>
            </View>
          )}
          legend={false}
          width={144}
          height={144}
          theme={theme}
        />
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
