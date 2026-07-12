import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type AnalyticsPlaceholderCardProps = {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  label: string;
  title: string;
};

export function AnalyticsPlaceholderCard({
  icon,
  label,
  title,
}: AnalyticsPlaceholderCardProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <DashboardCard className="min-h-[260px] flex-1">
      <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
        {title}
      </Text>

      <View className="mt-8 flex-1 items-center justify-center rounded-[24px] border border-dashed border-app-border bg-app-panel/20 px-6 py-10">
        <MaterialCommunityIcons name={icon} size={42} color={colors.textSoft} />
        <Text className="mt-4 text-center font-display text-lg text-app-muted">{label}</Text>
      </View>
    </DashboardCard>
  );
}
