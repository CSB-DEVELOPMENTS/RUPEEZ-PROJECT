import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import {
  MetricCard,
  PerformanceTile,
  WealthCard,
  WealthDonutChart,
  WealthLineChart,
} from "@/components/wealth";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

const rangeOptions = ["1M", "3M", "1Y", "ALL"];

export default function Wealth() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 pb-8 pt-2 md:px-8 lg:px-10">
        <View className="mb-7 flex-row flex-wrap items-center justify-between gap-4">
          <View className="flex-row items-center gap-4">
            <Text className="font-display text-2xl font-bold text-app-text">Wealth</Text>
            <View className="hidden h-6 w-px bg-app-border md:flex" />
          </View>

          <View className="flex-row items-center gap-4">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Add asset"
              className="h-10 flex-row items-center gap-2 rounded-[8px] bg-app-primary px-4 active:bg-app-primary-strong md:px-5"
              onPress={() => router.push("/add-asset")}>
              <MaterialCommunityIcons name="plus" size={19} color={colors.primaryContrast} />
              <Text className="font-display text-sm font-bold text-app-primary-contrast md:text-base">
                New Asset
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="gap-6">
          <View className="gap-6 xl:flex-row">
            <View className="xl:flex-[2]">
              <WealthCard className="overflow-hidden p-0 xl:min-h-[420px]">
                <View>
                  <View className="gap-5 md:flex-row md:items-start md:justify-between">
                    <View className="min-w-0">
                      <Text className="font-display text-xs font-medium uppercase tracking-[1.8px] text-app-muted">
                        Net Worth
                      </Text>
                      <View className="mt-2 flex-row flex-wrap items-center gap-3">
                        <Text className="font-display text-4xl font-bold tracking-tight text-app-text md:text-5xl">
                          LKR 1,250,000
                        </Text>
                        <View className="rounded-full bg-app-primary-muted px-3 py-1">
                          <Text className="font-display text-xs font-bold text-app-primary">
                            + 18.4%
                          </Text>
                        </View>
                      </View>
                      <Text className="mt-2 font-display text-sm text-app-muted">
                        vs last month
                      </Text>
                    </View>

                    <View className="flex-row flex-wrap gap-2 self-start md:self-auto">
                      {rangeOptions.map((option) => (
                        <Pressable
                          key={option}
                          className={`h-9 min-w-11 items-center justify-center rounded-[6px] px-3 ${
                            option === "1M" ? "bg-app-panel-strong" : "bg-app-panel"
                          }`}>
                          <Text className="font-display text-xs font-medium text-app-text">
                            {option}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>

                  <WealthLineChart />
                </View>
              </WealthCard>
            </View>

            <View className="gap-4 xl:flex-1 xl:self-stretch">
              <MetricCard
                className="xl:flex-1"
                icon="bank-outline"
                iconClassName="bg-app-brand/15"
                label="Total Assets"
                value="LKR 1,350,000"
                valueClassName="text-app-brand-soft"
              />
              <MetricCard
                className="xl:flex-1"
                icon="credit-card-outline"
                iconClassName="bg-app-danger-muted"
                label="Total Liabilities"
                value="-LKR 100,000"
                valueClassName="text-app-danger"
              />
              <MetricCard
                className="xl:flex-1"
                icon="diamond-stone"
                iconClassName="bg-app-primary-muted"
                label="Current Net Worth"
                sublabel="Update frequency: Real-time"
                value="LKR 1,250,000"
                valueClassName="text-app-primary"
              />
            </View>
          </View>

          <View className="gap-6 xl:flex-row xl:items-stretch">
            <WealthCard className="xl:flex-[1.35]">
              <View className="flex-row items-center justify-between">
                <Text className="font-display text-2xl font-bold text-app-text">
                  Assets Breakdown
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="View asset portfolio"
                  className="flex-row items-center gap-1"
                  onPress={() => router.push("/asset-portfolio")}>
                  <Text className="font-display text-xs font-bold uppercase tracking-[1px] text-app-muted">
                    See All
                  </Text>
                  <MaterialCommunityIcons name="chevron-right" size={18} color={colors.textMuted} />
                </Pressable>
              </View>

              <WealthDonutChart />
            </WealthCard>

            <WealthCard className="xl:flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="font-display text-2xl font-bold text-app-text">Performance</Text>
                <View className="rounded-[6px] bg-app-panel-strong px-3 py-2">
                  <Text className="font-display text-xs font-bold uppercase text-app-muted">
                    This Month
                  </Text>
                </View>
              </View>

              <View className="mt-7 gap-4 md:flex-row xl:flex-row">
                <PerformanceTile
                  icon="chart-line-variant"
                  label="Expenses"
                  note="Below average"
                  value="-9.2%"
                />
                <PerformanceTile
                  icon="piggy-bank-outline"
                  label="Savings Rate"
                  note="Target: 40%"
                  value="42%"
                />
              </View>

              <View className="mt-7 border-t border-app-border pt-6">
                <View className="flex-row items-center justify-between">
                  <Text className="font-display text-sm text-app-muted">
                    Wealth Achievement Score
                  </Text>
                  <Text className="font-display text-sm font-bold text-app-text">82/100</Text>
                </View>
                <View className="mt-4 h-2 overflow-hidden rounded-full bg-app-panel-strong">
                  <View className="h-full w-[82%] rounded-full bg-app-primary" />
                </View>
                <Text className="mt-4 text-center font-display text-xs text-app-muted">
                  Top 5% among similar investor profiles
                </Text>
              </View>
            </WealthCard>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
