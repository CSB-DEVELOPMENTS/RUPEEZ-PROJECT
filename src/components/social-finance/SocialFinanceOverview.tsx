import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { SocialFinanceMetricCard } from "@/components/social-finance/SocialFinanceMetricCard";
import {
  activityToneClasses,
  groupToneClasses,
} from "@/components/social-finance/socialFinanceTone";
import {
  SOCIAL_FINANCE_GROUP_PAGINATION_LABEL,
  SOCIAL_FINANCE_GROUP_PAGES,
} from "@/constants/social-finance";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { ExpenseGroup, SettlementItem, SocialMetric } from "@/types/social-finance";

type SocialFinanceOverviewProps = {
  activity: SettlementItem[];
  groups: ExpenseGroup[];
  metrics: SocialMetric[];
  onSelectGroup: (groupId: string) => void;
};

export function SocialFinanceOverview({
  activity,
  groups,
  metrics,
  onSelectGroup,
}: SocialFinanceOverviewProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <>
      <View className="mx-[-8px] flex-row flex-wrap">
        {metrics.map((item) => (
          <View key={item.caption} className="w-full p-2 md:w-1/2 xl:w-1/4">
            <SocialFinanceMetricCard item={item} />
          </View>
        ))}
      </View>

      <DashboardCard>
        <View className="flex-row items-start justify-between gap-4">
          <View className="gap-1">
            <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
              Expense Groups
            </Text>
            <Text className="font-display text-base text-app-muted">
              Shared balances across your most active groups
            </Text>
          </View>

          <View className="h-10 w-10 items-center justify-center rounded-2xl border border-app-border bg-app-panel/30">
            <MaterialCommunityIcons name="chevron-down" size={20} color={colors.textMuted} />
          </View>
        </View>

        <View className="mt-6 hidden flex-row items-center border-b border-app-border pb-3 md:flex">
          <Text className="w-[26%] font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
            Expense name
          </Text>
          <Text className="w-[10%] font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
            Members
          </Text>
          <Text className="w-[12%] font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
            Recurring
          </Text>
          <Text className="w-[18%] font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
            Your position
          </Text>
          <Text className="w-[14%] font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
            Balance
          </Text>
          <Text className="flex-1 font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
            Progress
          </Text>
        </View>

        <View className="mt-4 gap-3">
          {groups.map((group) => {
            const tone = groupToneClasses(group.tone);

            return (
              <Pressable
                key={group.id}
                accessibilityRole="button"
                onPress={() => onSelectGroup(group.id)}
                className="rounded-[24px] border border-app-border bg-app-panel/20 px-4 py-4 active:bg-app-panel/40">
                <View className="flex-col gap-4 md:flex-row md:items-center md:gap-0">
                  <View className="md:w-[26%]">
                    <Text className="font-display text-lg font-semibold text-app-text">
                      {group.name}
                    </Text>
                    <Text className="mt-1 font-display text-sm text-app-muted md:hidden">
                      {group.members} members - {group.recurring} - {group.balance}
                    </Text>
                  </View>

                  <Text className="hidden md:block md:w-[10%] font-display text-base text-app-text">
                    {group.members}
                  </Text>

                  <Text className="hidden md:block md:w-[12%] font-display text-base text-app-text">
                    {group.recurring}
                  </Text>

                  <View className="md:w-[18%]">
                    <Text
                      className={`self-start rounded-full px-3 py-1 font-display text-xs font-semibold ${tone.badge}`}>
                      {group.position}
                    </Text>
                  </View>

                  <Text className="font-display text-base font-semibold text-app-text md:w-[14%]">
                    {group.balance}
                  </Text>

                  <View className="flex-1 gap-2">
                    <View className="h-2 overflow-hidden rounded-full bg-app-panel">
                      <View
                        className={`h-full rounded-full ${tone.bar}`}
                        style={{ width: `${group.progress}%` }}
                      />
                    </View>
                    <View className="flex-row items-center justify-between gap-3">
                      <Text className="font-display text-sm text-app-muted">
                        {group.recurring} settlement
                      </Text>
                      <Text className="font-display text-sm font-semibold text-app-text">
                        {group.progressLabel}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        <View className="mt-5 flex-row items-center justify-between gap-4 border-t border-app-border pt-4">
          <Text className="font-display text-sm text-app-muted">
            {SOCIAL_FINANCE_GROUP_PAGINATION_LABEL}
          </Text>

          <View className="flex-row items-center gap-2">
            {SOCIAL_FINANCE_GROUP_PAGES.map((page, index) => {
              const active = index === 0;

              return (
                <View
                  key={page}
                  className={
                    active
                      ? "h-9 min-w-9 items-center justify-center rounded-xl bg-app-primary px-3"
                      : "h-9 min-w-9 items-center justify-center rounded-xl bg-app-panel/35 px-3"
                  }>
                  <Text
                    className={
                      active
                        ? "font-display text-sm font-semibold text-app-primary-contrast"
                        : "font-display text-sm font-semibold text-app-muted"
                    }>
                    {page}
                  </Text>
                </View>
              );
            })}
            <View className="h-9 w-9 items-center justify-center rounded-xl bg-app-panel/35">
              <MaterialCommunityIcons name="chevron-right" size={18} color={colors.textMuted} />
            </View>
          </View>
        </View>
      </DashboardCard>

      <DashboardCard>
        <View className="flex-row items-start justify-between gap-4">
          <View className="gap-1">
            <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
              Settlement Activity
            </Text>
            <Text className="font-display text-base text-app-muted">
              Latest payments moving through your groups
            </Text>
          </View>

          <View className="h-10 w-10 items-center justify-center rounded-2xl border border-app-border bg-app-panel/30">
            <MaterialCommunityIcons
              name="filter-variant"
              size={20}
              color={colors.textMuted}
            />
          </View>
        </View>

        <View className="mt-6 gap-3">
          {activity.map((item) => {
            const tone = activityToneClasses(item.tone);

            return (
              <View
                key={item.id}
                className="flex-row items-center gap-4 rounded-[22px] bg-app-panel/30 px-4 py-4">
                <View className={`h-12 w-12 items-center justify-center rounded-2xl ${tone.badge}`}>
                  <MaterialCommunityIcons name={item.icon} size={22} color={tone.icon} />
                </View>

                <View className="min-w-0 flex-1">
                  <Text className="font-display text-lg font-semibold text-app-text">
                    {item.title}
                  </Text>
                  <Text className="font-display text-sm text-app-muted">{item.detail}</Text>
                </View>

                <Text className={`font-display text-lg font-semibold ${tone.value}`}>
                  {item.value}
                </Text>
              </View>
            );
          })}
        </View>
      </DashboardCard>
    </>
  );
}
