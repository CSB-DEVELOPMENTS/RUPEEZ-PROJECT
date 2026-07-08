import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { SettingsSecurityPanelData } from "@/types/settings";

import { SettingsActionButton } from "./SettingsActionButton";

export function SettingsTwoFactorCard({ data }: { data: SettingsSecurityPanelData }) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <DashboardCard>
      <View className="gap-6 md:flex-row md:items-center md:justify-between">
        <View className="max-w-3xl gap-4">
          <View className="flex-row items-center gap-3">
            <MaterialCommunityIcons color={colors.primaryStrong} name={data.icon as never} size={24} />
            <Text className="font-display text-2xl font-semibold text-app-text">{data.title}</Text>
          </View>

          <View className="self-start rounded-full bg-app-primary/15 px-3 py-2">
            <Text className="font-display text-xs font-semibold uppercase tracking-[1.5px] text-app-primary">
              {data.status}
            </Text>
          </View>

          <Text className="font-display text-lg leading-7 text-app-muted">{data.description}</Text>
        </View>

        <View className="items-stretch md:min-w-[11rem]">
          <SettingsActionButton {...data.action} />
        </View>
      </View>
    </DashboardCard>
  );
}
