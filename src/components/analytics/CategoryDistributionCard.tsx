import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { CategoryDistributionItem } from "@/types/analytics";

export function CategoryDistributionCard({
  exportLabel,
  items,
  title,
}: {
  exportLabel: string;
  items: CategoryDistributionItem[];
  title: string;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const topItem = items[0];

  return (
    <DashboardCard className="flex-1">
      <View className="mb-8 flex-row items-start justify-between gap-4">
        <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
          {title}
        </Text>
        <View className="flex-row items-center gap-2">
          <Text className="font-display text-sm font-semibold text-app-muted">{exportLabel}</Text>
          <MaterialCommunityIcons name="download" size={16} color={colors.textMuted} />
        </View>
      </View>

      <View className="gap-8 lg:flex-row lg:items-center">
        <View className="items-center">
          <View className="h-64 w-64 items-center justify-center rounded-full border-[22px] border-app-panel">
            <View className="h-44 w-44 items-center justify-center rounded-full bg-app-bg">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.5px] text-app-muted">
                Top Category
              </Text>
              <Text className="mt-2 font-display text-4xl font-semibold text-app-text">
                {topItem?.momLabel}
              </Text>
              <Text className="mt-1 font-display text-lg font-semibold text-app-primary">
                {topItem?.label}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-1 gap-5">
          {items.map((item) => (
            <View key={item.label} className="flex-row items-center justify-between gap-4">
              <View className="flex-row items-center gap-3">
                <View className="h-3 w-3 rounded-full bg-app-primary" />
                <Text className="font-display text-xl text-app-text">{item.label}</Text>
              </View>
              <Text className="font-display text-2xl font-semibold text-app-text">
                {item.momLabel}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </DashboardCard>
  );
}
