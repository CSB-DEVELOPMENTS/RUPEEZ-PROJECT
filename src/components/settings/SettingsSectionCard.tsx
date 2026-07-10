import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type SettingsSectionCardProps = {
  children: React.ReactNode;
  icon?: string;
  title?: string;
};

export function SettingsSectionCard({ children, icon, title }: SettingsSectionCardProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <DashboardCard className="gap-6">
      {title ? (
        <View className="flex-row items-center gap-3">
          {icon ? (
            <MaterialCommunityIcons
              color={colors.primaryStrong}
              name={icon as never}
              size={24}
            />
          ) : null}
          <Text className="font-display text-2xl font-semibold text-app-text">{title}</Text>
        </View>
      ) : null}
      {children}
    </DashboardCard>
  );
}
