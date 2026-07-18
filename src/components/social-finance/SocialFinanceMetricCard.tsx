import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { metricToneClasses } from "@/components/social-finance/socialFinanceTone";
import type { SocialMetric } from "@/types/social-finance";

type SocialFinanceMetricCardProps = {
  item: SocialMetric;
};

export function SocialFinanceMetricCard({ item }: SocialFinanceMetricCardProps) {
  const classes = metricToneClasses(item.tone);

  return (
    <DashboardCard className="flex-1">
      <View className="gap-4">
        <View className="flex-row items-start justify-between gap-3">
          <View className={`h-12 w-12 items-center justify-center rounded-2xl ${classes.badge}`}>
            <MaterialCommunityIcons name={item.icon} size={22} color={classes.icon} />
          </View>
          <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
            {item.caption}
          </Text>
        </View>

        <View className="gap-1">
          <Text className={`font-display text-2xl font-semibold tracking-tight ${classes.value}`}>
            {item.value}
          </Text>
          <Text className={`font-display text-sm font-medium ${classes.change}`}>{item.change}</Text>
        </View>
      </View>
    </DashboardCard>
  );
}
