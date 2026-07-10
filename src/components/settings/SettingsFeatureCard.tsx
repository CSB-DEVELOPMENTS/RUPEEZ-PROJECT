import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { SettingsFeatureCardData } from "@/types/settings";

import { SettingsActionButton } from "./SettingsActionButton";

function featureToneClasses(tone: SettingsFeatureCardData["tone"]) {
  return tone === "brand" ?
      {
        badge: "bg-app-brand/15",
        iconBox: "bg-app-brand/15",
      }
    : {
        badge: "bg-app-primary/15",
        iconBox: "bg-app-primary/15",
      };
}

export function SettingsFeatureCard({ data }: { data: SettingsFeatureCardData }) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const tone = featureToneClasses(data.tone);
  const iconColor = data.tone === "brand" ? colors.brandSoft : colors.primaryStrong;

  return (
    <DashboardCard className="min-h-[19rem] justify-between">
      <View className="gap-8">
        <View className="flex-row items-start justify-between gap-4">
          <View className={`h-14 w-14 items-center justify-center rounded-2xl ${tone.iconBox}`}>
            <MaterialCommunityIcons color={iconColor} name={data.icon as never} size={28} />
          </View>
          {data.badge ? (
            <View className={`rounded-full px-3 py-2 ${tone.badge}`}>
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.5px] text-app-primary">
                {data.badge}
              </Text>
            </View>
          ) : null}
        </View>

        <View className="gap-3">
          <Text className="font-display text-2xl font-semibold text-app-text">{data.title}</Text>
          <Text className="font-display text-lg leading-7 text-app-muted">{data.description}</Text>
          {data.meta ? (
            <View className="self-start rounded-2xl border border-app-border bg-app-panel/70 px-4 py-3">
              <Text className="font-display text-sm font-semibold text-app-text">{data.meta}</Text>
            </View>
          ) : null}
        </View>
      </View>

      <View className="self-start pt-6">
        <SettingsActionButton {...data.cta} />
      </View>
    </DashboardCard>
  );
}
