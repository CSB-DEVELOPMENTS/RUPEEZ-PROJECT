import { Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { SankeyFlowTone, SankeySummaryCardData } from "@/types/analytics";

function toneColor(colors: (typeof Colors)[keyof typeof Colors], tone: SankeyFlowTone) {
  switch (tone) {
    case "brand":
      return colors.brand;
    case "danger":
      return colors.chartOrange;
    case "teal":
      return colors.chartTeal;
    case "positive":
      return colors.primary;
    default:
      return colors.textMuted;
  }
}

export function SankeySummaryCard({ data }: { data: SankeySummaryCardData }) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const accentColor = toneColor(colors, data.accentTone);

  return (
    <DashboardCard className={data.isHighlighted ? "border-app-primary/25 bg-app-primary/15" : ""}>
      <View
        className="absolute bottom-0 left-0 top-0 w-1.5 rounded-l-[30px]"
        style={{ backgroundColor: accentColor }}
      />

      <View className="gap-3">
        <Text className="font-display text-sm uppercase tracking-[1.4px] text-app-muted">
          {data.label}
        </Text>

        <View className="flex-row items-end gap-3">
          <Text
            className={`font-display text-3xl font-semibold tracking-tight md:text-4xl ${
              data.isHighlighted ? "text-app-primary" : "text-app-text"
            }`}>
            {data.valueLabel}
          </Text>
          {data.emphasisLabel ?
            <View className="rounded-xl bg-app-primary/15 px-3 py-1">
              <Text className="font-display text-base font-semibold text-app-primary">
                {data.emphasisLabel}
              </Text>
            </View>
          : null}
        </View>
      </View>
    </DashboardCard>
  );
}
