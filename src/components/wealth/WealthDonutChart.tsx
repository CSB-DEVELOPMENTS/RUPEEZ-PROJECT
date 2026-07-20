import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import { Text, View } from "react-native";
import { DonutChart } from "react-native-chart-kit/v2";

type AssetColorKey = "chartBlue" | "chartGreen" | "chartOrange" | "chartPurple";

const assetBreakdown: { colorKey: AssetColorKey; label: string; value: string }[] = [
  { colorKey: "chartBlue", label: "Cash & Bank", value: "33.4" },
  { colorKey: "chartOrange", label: "Investments", value: "41.8" },
  { colorKey: "chartGreen", label: "Crypto", value: "16.8" },
  { colorKey: "chartPurple", label: "Other Assets", value: "8.0" },
];

const donutChartData = assetBreakdown.map((item) => ({
  label: item.label,
  value: Number(item.value),
}));

export function WealthDonutChart() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="mt-5 flex-1 gap-5 md:flex-row md:items-center">
      <View className="items-center md:w-[40%]">
        <View className="h-56 w-56 items-center justify-center">
          <DonutChart
            data={donutChartData}
            valueKey="value"
            labelKey="label"
            colors={[colors.chartBlue, colors.chartOrange, colors.chartGreen, colors.chartPurple]}
            centerLabel={({ theme: chartTheme }) => (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: colors.textMuted,
                    fontSize: 10,
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}>
                  Total
                </Text>
                <Text
                  style={{ color: chartTheme.text, fontSize: 13, fontWeight: "700", marginTop: 2 }}>
                  LKR 1,250K
                </Text>
              </View>
            )}
            legend={false}
            width={224}
            height={224}
            theme={theme}
          />
        </View>
      </View>
      <View className="flex-1 gap-5">
        {assetBreakdown.map((item) => (
          <View key={item.label} className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
              <View
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: colors[item.colorKey] }}
              />
              <Text className="font-display text-base text-app-text">{item.label}</Text>
            </View>
            <Text className="font-display text-base font-bold text-app-text">{item.value}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export { assetBreakdown };
export type { AssetColorKey };
