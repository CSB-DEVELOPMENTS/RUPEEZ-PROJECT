import { Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import type { CryptoAllocationItem } from "@/types/wealth";

export function CryptoAllocationCard({
  items,
  title,
  totalAssetsLabel,
}: {
  items: CryptoAllocationItem[];
  title: string;
  totalAssetsLabel: string;
}) {
  return (
    <DashboardCard className="min-h-[320px]">
      <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
        {title}
      </Text>

      <View className="items-center py-8">
        <View className="h-40 w-40 items-center justify-center rounded-full border-[14px] border-app-primary/15">
          <View className="h-28 w-28 items-center justify-center rounded-full bg-app-bg">
            <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
              Assets
            </Text>
            <Text className="mt-2 font-display text-3xl font-semibold text-app-text">
              {totalAssetsLabel}
            </Text>
          </View>
        </View>
      </View>

      <View className="mt-auto gap-4 border-t border-app-border pt-5">
        {items.map((item) => (
          <View key={item.label} className="flex-row items-center justify-between gap-4">
            <View className="flex-row items-center gap-3">
              <View className={`h-3 w-3 rounded-full ${item.colorClassName}`} />
              <Text className="font-display text-base text-app-text">{item.label}</Text>
            </View>
            <Text className="font-display text-base text-app-muted">{item.valueLabel}</Text>
          </View>
        ))}
      </View>
    </DashboardCard>
  );
}
