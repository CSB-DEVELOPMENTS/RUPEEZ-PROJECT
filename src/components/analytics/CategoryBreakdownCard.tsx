import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import SectionHeader from "@/components/dashboard/SectionHeader";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { CategoryDistributionItem } from "@/types/analytics";

function trendClasses(tone: CategoryDistributionItem["trendTone"]) {
  switch (tone) {
    case "positive":
      return { badge: "bg-app-primary/15 text-app-primary", icon: "arrow-down" } as const;
    case "negative":
      return { badge: "bg-app-danger/10 text-app-danger", icon: "arrow-up" } as const;
    default:
      return { badge: "bg-app-panel text-app-muted", icon: "minus" } as const;
  }
}

function iconName(label: string) {
  if (label.includes("Housing")) {
    return "home-outline";
  }
  if (label.includes("Food")) {
    return "silverware-fork-knife";
  }
  if (label.includes("Transport")) {
    return "car-outline";
  }
  if (label.includes("Bills")) {
    return "receipt-text-outline";
  }
  return "shape-outline";
}

export function CategoryBreakdownCard({ items }: { items: CategoryDistributionItem[] }) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <DashboardCard className="overflow-hidden p-0">
      <View className="px-5 pb-4 pt-5 md:px-6 md:pt-6">
        <SectionHeader title="Detailed Breakdown" action="View all" />
      </View>

      <View>
        {items.slice(0, 4).map((item) => {
          const trend = trendClasses(item.trendTone);
          const trendColor =
            item.trendTone === "positive" ? colors.primary
            : item.trendTone === "negative" ? colors.danger
            : colors.textMuted;

          return (
            <View key={item.label} className="border-t border-app-border px-5 py-4 md:px-6 md:py-5">
              <View className="gap-4 md:flex-row lg:items-center">
                <View className="flex-1 gap-4 xl:flex-row">
                  <View className="flex-row items-center gap-4 md:w-[40%]">
                    <View className="h-12 w-12 items-center justify-center rounded-2xl bg-app-panel/35">
                      <MaterialCommunityIcons
                        name={iconName(item.label)}
                        size={20}
                        color={colors.textMuted}
                      />
                    </View>
                    <Text className="font-display text-xl xl:text-2xl font-semibold text-app-text">
                      {item.label}
                    </Text>
                  </View>

                  <View className="flex-1 gap-3">
                    <View className="h-2.5 overflow-hidden rounded-full bg-app-panel">
                      <View
                        className={`h-full rounded-full bg-app-primary`}
                        style={{ width: `${Math.max(item.progress, 4)}%` }}
                      />
                    </View>
                  </View>
                </View>
                <View className="flex-row items-center gap-4 md:w-[36%]">
                  <View className="flex-1 items-end gap-1 md:w-[22%]">
                    <Text className="font-display text-xl xl:text-2xl font-semibold text-app-text">
                      {item.amountLabel}
                    </Text>
                    <Text className="font-display text-sm font-semibold text-app-muted">
                      {item.momLabel}
                    </Text>
                  </View>

                  <View className="flex-1 items-end gap-2 md:w-[14%]">
                    <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                      MoM
                    </Text>
                    <View
                      className={`flex-row items-center gap-1 rounded-xl px-3 py-2 ${trend.badge}`}>
                      <MaterialCommunityIcons name={trend.icon} size={14} color={trendColor} />
                      <Text className="font-display text-base font-semibold text-app-text">
                        {item.varianceLabel}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </DashboardCard>
  );
}
