import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import type { SettingsDangerZoneData } from "@/types/settings";

import { SettingsActionButton } from "./SettingsActionButton";

export function SettingsDangerZone({ data }: { data: SettingsDangerZoneData }) {
  return (
    <DashboardCard className="border-app-danger/25 bg-app-danger/5">
      <View className="gap-6 lg:flex-row lg:items-center lg:justify-between">
        <View className="max-w-3xl gap-3">
          <View className="flex-row items-center gap-3">
            <MaterialCommunityIcons color="#EF4444" name="alert-outline" size={26} />
            <Text className="font-display text-2xl font-semibold text-app-danger">
              {data.title}
            </Text>
          </View>
          <Text className="font-display text-lg leading-7 text-app-muted">{data.description}</Text>
        </View>

        <View className="items-stretch lg:min-w-[16rem]">
          <SettingsActionButton {...data.action} />
        </View>
      </View>
    </DashboardCard>
  );
}
