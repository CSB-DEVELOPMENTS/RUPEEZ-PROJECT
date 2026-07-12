import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { ReportExportItem } from "@/types/analytics";

export function ReportsExportList({ items }: { items: ReportExportItem[] }) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="gap-4">
      {items.map((item) => (
        <DashboardCard key={item.id} className="rounded-[26px] px-5 py-5 md:px-6">
          <View className="flex-row items-center gap-4">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-app-panel/45">
              <MaterialCommunityIcons name={item.icon} size={24} color={colors.primary} />
            </View>

            <View className="min-w-0 flex-1 gap-1">
              <Text className="font-display text-2xl font-semibold text-app-text">{item.title}</Text>
              <Text className="font-display text-lg text-app-muted">{item.description}</Text>
            </View>

            <View className="rounded-full border border-app-border bg-app-panel/20 px-4 py-2">
              <Text className="font-display text-base font-semibold text-app-text">
                {item.formatLabel}
              </Text>
            </View>
          </View>
        </DashboardCard>
      ))}

      <DashboardCard className="items-center rounded-[26px] py-6">
        <View className="flex-row items-center gap-3">
          <MaterialCommunityIcons name="plus" size={28} color={colors.textMuted} />
          <Text className="font-display text-2xl font-semibold text-app-text">Custom Report</Text>
        </View>
      </DashboardCard>
    </View>
  );
}
