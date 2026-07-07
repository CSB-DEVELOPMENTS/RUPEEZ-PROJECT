import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { CategoryInsightCardData } from "@/types/analytics";

function toneClasses(tone: CategoryInsightCardData["tone"]) {
  if (tone === "positive") {
    return {
      accent: "border-app-primary",
      chip: "bg-app-primary/15",
      iconColor: "primary",
      value: "text-app-primary",
    } as const;
  }

  return {
    accent: "border-app-danger/70",
    chip: "bg-app-danger/10",
    iconColor: "danger",
    value: "text-app-danger",
  } as const;
}

export function CategoryInsightCard({ data }: { data: CategoryInsightCardData }) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const tone = toneClasses(data.tone);
  const iconColor = tone.iconColor === "primary" ? colors.primary : colors.danger;

  return (
    <DashboardCard className={`border-l-2 ${tone.accent}`}>
      <View className="gap-6">
        <View className="flex-row items-start justify-between gap-4">
          <View className={`h-12 w-12 items-center justify-center rounded-2xl ${tone.chip}`}>
            <MaterialCommunityIcons
              name={data.icon === "check" ? "check-circle-outline" : "alert-outline"}
              size={24}
              color={iconColor}
            />
          </View>
          <Text className="font-display text-sm font-semibold uppercase tracking-[1.4px] text-app-muted">
            {data.caption}
          </Text>
        </View>

        <View className="gap-2">
          <Text className="font-display text-2xl font-semibold text-app-text">{data.title}</Text>
          <Text className={`font-display text-4xl font-semibold tracking-tight ${tone.value}`}>
            {data.valueLabel}
          </Text>
          <Text className="font-display text-lg leading-7 text-app-muted">{data.detail}</Text>
        </View>
      </View>
    </DashboardCard>
  );
}
