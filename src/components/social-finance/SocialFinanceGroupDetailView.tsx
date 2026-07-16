import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { statusToneClasses } from "@/components/social-finance/socialFinanceTone";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { GroupDetail } from "@/types/social-finance";

type SocialFinanceGroupDetailViewProps = {
  detail: GroupDetail;
  onBack: () => void;
  onOpenOptimized: () => void;
  onSettle: () => void;
};

export function SocialFinanceGroupDetailView({
  detail,
  onBack,
  onOpenOptimized,
  onSettle,
}: SocialFinanceGroupDetailViewProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="gap-5">
      <View className="gap-3 md:flex-row md:items-center md:justify-between">
        <View className="gap-2">
          <Text className="font-display text-xs font-semibold uppercase tracking-[1.8px] text-app-primary-strong">
            {detail.breadcrumb}
          </Text>
          <Text className="font-display text-3xl font-semibold tracking-tight text-app-text">
            {detail.totalText}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onBack}
          className="self-start flex-row items-center gap-2 rounded-2xl border border-app-border bg-app-surface px-4 py-3 active:bg-app-panel md:self-auto">
          <MaterialCommunityIcons name="arrow-left" size={18} color={colors.textMuted} />
          <Text className="font-display text-sm font-semibold text-app-text">Back</Text>
        </Pressable>
      </View>

      <DashboardCard>
        <View className="flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <View className="gap-3">
            <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
              {detail.title}
            </Text>
            <Text className="font-display text-base text-app-muted">{detail.subtitle}</Text>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={onSettle}
            className="self-start rounded-2xl bg-app-primary px-5 py-3 active:opacity-90">
            <Text className="font-display text-sm font-semibold text-app-primary-contrast">
              {detail.settleLabel}
            </Text>
          </Pressable>
        </View>

        <View className="mt-6 flex-col gap-4 md:flex-row">
          {detail.overview.map((item) => (
            <View
              key={item.label}
              className="flex-1 rounded-[22px] border border-app-border bg-app-panel/20 px-4 py-4">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                {item.label}
              </Text>
              <Text className="mt-2 font-display text-xl font-semibold tracking-tight text-app-text">
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </DashboardCard>

      <DashboardCard>
        <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
          Expense Breakdown: {detail.totalText}
        </Text>

        <View className="mt-5 gap-3 md:hidden">
          {detail.members.map((member) => (
            <View
              key={member.name}
              className="rounded-[20px] border border-app-border bg-app-panel/20 px-4 py-4">
              <View className="flex-row items-start justify-between gap-3">
                <View className="min-w-0 flex-1 gap-1">
                  <Text className="font-display text-lg font-semibold text-app-text">
                    {member.name}
                  </Text>
                  <Text className="font-display text-sm text-app-muted">{member.role}</Text>
                </View>
                <Text
                  numberOfLines={1}
                  className={`self-start rounded-full px-3 py-1 font-display text-xs font-semibold ${statusToneClasses(member.tone)}`}>
                  {member.status}
                </Text>
              </View>

              <View className="mt-4 flex-row gap-3">
                <View className="flex-1 rounded-2xl border border-app-border bg-app-bg px-3 py-3">
                  <Text className="font-display text-[11px] font-semibold uppercase tracking-[1.2px] text-app-muted">
                    Paid
                  </Text>
                  <Text className="mt-2 font-display text-base text-app-text">
                    {member.paidAmount}
                  </Text>
                </View>
                <View className="flex-1 rounded-2xl border border-app-border bg-app-bg px-3 py-3">
                  <Text className="font-display text-[11px] font-semibold uppercase tracking-[1.2px] text-app-muted">
                    Due
                  </Text>
                  <Text className="mt-2 font-display text-base font-semibold text-app-danger">
                    {member.dueAmount}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View className="mt-5 hidden overflow-hidden rounded-[20px] border border-app-border md:block">
          <View className="flex-row border-b border-app-border bg-app-panel/30 px-4 py-3">
            <Text className="w-[34%] font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
              Member
            </Text>
            <Text className="w-[18%] font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
              Role
            </Text>
            <Text className="w-[18%] font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
              Status
            </Text>
            <Text className="w-[15%] font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
              Paid
            </Text>
            <Text className="flex-1 font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
              Due
            </Text>
          </View>

          {detail.members.map((member) => (
            <View
              key={member.name}
              className="flex-row items-center border-b border-app-border px-4 py-4 last:border-b-0">
              <Text className="w-[34%] font-display text-sm font-semibold text-app-text">
                {member.name}
              </Text>
              <Text className="w-[18%] font-display text-sm text-app-muted">{member.role}</Text>
              <View className="w-[18%]">
                <Text
                  className={`self-start rounded-full px-3 py-1 font-display text-xs font-semibold ${statusToneClasses(member.tone)}`}>
                  {member.status}
                </Text>
              </View>
              <Text className="w-[15%] font-display text-sm text-app-text">{member.paidAmount}</Text>
              <Text className="flex-1 font-display text-sm font-semibold text-app-danger">
                {member.dueAmount}
              </Text>
            </View>
          ))}
        </View>
      </DashboardCard>

      <View className="w-full gap-4 lg:flex-row">
        <Pressable
          accessibilityRole="button"
          onPress={onOpenOptimized}
          className="w-full lg:flex-1">
          <DashboardCard>
            <View className="gap-4 md:flex-row md:items-center">
              <View className="h-16 w-16 self-start items-center justify-center rounded-full border-2 border-app-primary md:self-auto">
                <Text className="font-display text-lg font-semibold text-app-primary">
                  {detail.progress}%
                </Text>
              </View>
              <View className="flex-1 gap-2">
                <View className="flex-row items-center gap-2">
                  <Text className="flex-1 font-display text-2xl font-semibold text-app-text md:text-xl">
                    Settlement Progress
                  </Text>
                  <MaterialCommunityIcons
                    name="arrow-right"
                    size={18}
                    color={colors.primaryStrong}
                  />
                </View>
                <Text className="font-display text-base leading-7 text-app-muted md:leading-6">
                  {detail.progressLabel}
                </Text>
                <Text className="font-display text-xs font-semibold uppercase tracking-[1.2px] text-app-primary">
                  Open optimized settlement
                </Text>
              </View>
            </View>
          </DashboardCard>
        </Pressable>

        <DashboardCard className="w-full lg:flex-1">
          <View className="flex-row items-start justify-between gap-4">
            <View className="flex-1 gap-2">
              <Text className="font-display text-xl font-semibold text-app-text">
                Next Trip Prediction
              </Text>
              <Text className="font-display text-base leading-6 text-app-muted">
                {detail.nextPrediction}
              </Text>
            </View>
            <MaterialCommunityIcons name="chart-line" size={20} color={colors.primaryStrong} />
          </View>
        </DashboardCard>
      </View>
    </View>
  );
}
