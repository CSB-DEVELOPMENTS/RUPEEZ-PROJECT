import { Text, View } from "react-native";
import { DonutChart } from "react-native-chart-kit/v2";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { FinancialHealthAllocationItem } from "@/types/analytics";
import { formatTransactionAmount } from "../cash-flow/TransactionCard";

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
  const colors = Colors[theme];

  const totalShare = items.reduce((sum, item) => sum + item.value, 0);

  const segments = items.map((item, index) => ({
    ...item,
    color: chartPaletteColor(theme, index),
  }));

  const donutColors = segments.map((s) => s.color);

  const donutData = segments.map((s) => ({
    id: s.id,
    label: s.label,
    value: s.share,
  }));

  return (
    <DashboardCard className="">
      <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
        Asset Allocation
      </Text>

      <View className="mt-6 gap-6 md:flex-row md:items-center">
        <View className="items-center md:w-[48%]">
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
                    letterSpacing: 1.5,
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    color: chartTheme.text,
                    fontSize: 16,
                    fontWeight: "700",
                    marginTop: 2,
                    textAlign: "center",
                  }}>
                  {formatTransactionAmount(totalShare)}
                </Text>
              </View>
            )}
            legend={false}
            width={188}
            height={188}
            theme={theme}
          />
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
