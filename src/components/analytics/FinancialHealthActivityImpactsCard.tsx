import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { FinancialHealthActivityImpact } from "@/types/analytics";

function toneClasses(tone: FinancialHealthActivityImpact["tone"]) {
  return tone === "positive" ?
      {
        chip: "bg-app-primary text-app-primary-contrast",
        points: "text-app-primary",
      }
    : {
        chip: "bg-app-danger text-app-primary-contrast",
        points: "text-app-danger",
      };
}

export function FinancialHealthActivityImpactsCard({
  items,
}: {
  items: FinancialHealthActivityImpact[];
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <DashboardCard className="min-h-[320px]">
      <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
        Recent Activity Impacts
      </Text>

      <View className="mt-6 gap-5">
        {items.map((item) => {
          const tone = toneClasses(item.tone);
          const iconColor = item.tone === "positive" ? colors.primaryContrast : colors.primaryContrast;

          return (
            <View
              key={item.id}
              className="flex-row items-center gap-4 rounded-[24px] bg-app-panel/35 px-5 py-5">
              <View className={`h-14 w-14 items-center justify-center rounded-full ${tone.chip}`}>
                <MaterialCommunityIcons name={item.icon} size={24} color={iconColor} />
              </View>

              <View className="min-w-0 flex-1 gap-1">
                <Text className="font-display text-xl font-semibold text-app-text">
                  {item.title}
                </Text>
                <Text className="font-display text-base text-app-muted">{item.detail}</Text>
              </View>

              <Text className={`font-display text-2xl font-semibold ${tone.points}`}>
                {item.pointsLabel}
              </Text>
            </View>
          );
        })}
      </View>
    </DashboardCard>
  );
}
