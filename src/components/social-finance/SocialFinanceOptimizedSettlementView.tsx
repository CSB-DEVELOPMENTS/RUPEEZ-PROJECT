import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { settlementToneClasses } from "@/components/social-finance/socialFinanceTone";
import { SOCIAL_FINANCE_SETTLEMENT_BENEFITS } from "@/constants/social-finance";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { GroupDetail, SettlementGuide } from "@/types/social-finance";

type SocialFinanceOptimizedSettlementViewProps = {
  detail: GroupDetail;
  guide: SettlementGuide;
  onBack: () => void;
  onSend: () => void;
};

export function SocialFinanceOptimizedSettlementView({
  detail,
  guide,
  onBack,
  onSend,
}: SocialFinanceOptimizedSettlementViewProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="gap-5">
      <View className="gap-3 md:flex-row md:items-center md:justify-between">
        <View className="gap-2">
          <Text className="font-display text-xs font-semibold uppercase tracking-[1.8px] text-app-primary-strong">
            {guide.breadcrumb}
          </Text>
          <Text className="font-display text-3xl font-semibold tracking-tight text-app-text">
            {guide.title}
          </Text>
          <Text className="font-display text-base text-app-muted">For {detail.totalText}</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onBack}
          className="self-start flex-row items-center gap-2 rounded-2xl border border-app-border bg-app-surface px-4 py-3 active:bg-app-panel md:self-auto">
          <MaterialCommunityIcons name="arrow-left" size={18} color={colors.textMuted} />
          <Text className="font-display text-sm font-semibold text-app-text">Back</Text>
        </Pressable>
      </View>

      <View className="gap-4 xl:flex-row">
        <DashboardCard className="xl:flex-1">
          <View className="gap-5">
            <View className="gap-3 md:flex-row md:items-start md:justify-between">
              <View className="gap-2">
                <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
                  Optimized Settlement
                </Text>
                <Text className="font-display text-base text-app-primary">
                  {guide.originalPaymentLabel}
                </Text>
              </View>

              <View className="flex-row flex-wrap gap-2 self-start">
                <View className="rounded-full border border-app-primary bg-app-primary-muted px-3 py-1">
                  <Text className="font-display text-xs font-semibold uppercase tracking-[1.2px] text-app-primary-strong">
                    {guide.automatedLabel}
                  </Text>
                </View>
                <View className="rounded-full border border-app-border bg-app-panel px-3 py-1">
                  <Text className="font-display text-xs font-semibold uppercase tracking-[1.2px] text-app-muted">
                    {guide.savingsLabel}
                  </Text>
                </View>
              </View>
            </View>

            <View className="items-center rounded-[24px] border border-app-border bg-app-panel/20 px-5 py-6">
              <View className="items-center gap-2">
                <View className="h-16 w-16 items-center justify-center rounded-full border-2 border-app-primary bg-app-panel">
                  <MaterialCommunityIcons name="account" size={26} color={colors.primaryStrong} />
                </View>
                <Text className="font-display text-lg font-semibold text-app-text">
                  {guide.youLabel}
                </Text>
                <Text className="font-display text-base font-semibold text-app-primary">
                  {guide.youAmount}
                </Text>
              </View>

              <View className="my-3 h-8 w-px border-l border-dashed border-app-primary/60" />

              <View className="items-center gap-2">
                <MaterialCommunityIcons
                  name="arrow-down-bold"
                  size={18}
                  color={colors.primaryStrong}
                />
                <View className="h-16 w-16 items-center justify-center rounded-full border-2 border-app-border bg-app-surface">
                  <MaterialCommunityIcons
                    name="account-group-outline"
                    size={26}
                    color={colors.textMuted}
                  />
                </View>
                <Text className="font-display text-lg font-semibold text-app-text">
                  {guide.hubLabel}
                </Text>
                <Text className="font-display text-base font-semibold text-app-danger">
                  {guide.hubAmount}
                </Text>
              </View>

              <View className="my-4 w-full flex-row items-center justify-between">
                <View className="h-px flex-1 border-t border-dashed border-app-primary/60" />
                <MaterialCommunityIcons
                  name="arrow-right-bold"
                  size={16}
                  color={colors.primaryStrong}
                />
                <View className="h-px flex-1 border-t border-dashed border-app-primary/60" />
              </View>

              <View className="w-full flex-col gap-3 md:flex-row">
                {guide.participants.map((participant) => {
                  const tone = settlementToneClasses(participant.tone);

                  return (
                    <View
                      key={participant.label}
                      className="flex-1 items-center gap-2 rounded-[22px] border border-app-border bg-app-bg px-4 py-4">
                      <View
                        className={`h-12 w-12 items-center justify-center rounded-full border ${tone.accent}`}>
                        <MaterialCommunityIcons
                          name={tone.icon}
                          size={18}
                          color={colors.primaryStrong}
                        />
                      </View>
                      <Text className="font-display text-base font-semibold text-app-text">
                        {participant.label}
                      </Text>
                      <Text className={`font-display text-sm font-semibold ${tone.amount}`}>
                        {participant.amount}
                      </Text>
                      <Text className="text-center font-display text-xs leading-5 text-app-muted">
                        {participant.note}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </DashboardCard>

        <DashboardCard className="xl:w-[30%]">
          <View className="gap-6">
            <View className="gap-2">
              <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
                Summary
              </Text>
              <View className="h-px bg-app-border" />
            </View>

            <View className="items-center rounded-[24px] border border-app-border bg-app-panel/20 px-4 py-8">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                {guide.optimizedSummary}
              </Text>
              <Text className="mt-4 font-display text-4xl font-semibold tracking-tight text-app-primary">
                {guide.optimizedPaymentLabel}
              </Text>
            </View>

            <View className="gap-4">
              {SOCIAL_FINANCE_SETTLEMENT_BENEFITS.map((item) => (
                <View key={item.title} className="flex-row items-start gap-3">
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={20}
                    color={colors.primaryStrong}
                  />
                  <View className="flex-1">
                    <Text className="font-display text-base font-semibold text-app-text">
                      {item.title}
                    </Text>
                    <Text className="font-display text-sm text-app-muted">{item.detail}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View className="gap-3 border-t border-app-border pt-4">
              <Pressable
                accessibilityRole="button"
                onPress={onSend}
                className="items-center rounded-2xl bg-app-primary px-5 py-4 active:opacity-90">
                <Text className="font-display text-sm font-semibold text-app-primary-contrast">
                  {guide.ctaLabel}
                </Text>
              </Pressable>
              <Text className="text-center font-display text-xs uppercase tracking-[1.2px] text-app-muted">
                {guide.footerNote}
              </Text>
            </View>
          </View>
        </DashboardCard>
      </View>
    </View>
  );
}
