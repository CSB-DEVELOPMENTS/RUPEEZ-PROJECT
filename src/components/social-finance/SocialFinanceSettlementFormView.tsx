import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { GroupDetail, SettlementForm } from "@/types/social-finance";

type SocialFinanceSettlementFormViewProps = {
  detail: GroupDetail;
  form: SettlementForm;
  onBack: () => void;
  onCancel: () => void;
};

export function SocialFinanceSettlementFormView({
  detail,
  form,
  onBack,
  onCancel,
}: SocialFinanceSettlementFormViewProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="gap-5">
      <View className="gap-3 md:flex-row md:items-center md:justify-between">
        <View className="gap-2">
          <Text className="font-display text-xs font-semibold uppercase tracking-[1.8px] text-app-primary-strong">
            {detail.breadcrumb} / Settle Up
          </Text>
          <Text className="font-display text-3xl font-semibold tracking-tight text-app-text">
            Settle Up
          </Text>
          <Text className="font-display text-base text-app-muted">
            Confirm your payment to balance group expenses.
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
        <View className="gap-6">
          <View className="gap-3">
            <Text className="font-display text-sm font-semibold uppercase tracking-[1.4px] text-app-danger">
              You are owe {form.amount}
            </Text>

            <View className="rounded-[22px] border border-app-border bg-app-panel/30 px-4 py-4">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                Settlement amount
              </Text>
              <Text className="mt-2 font-display text-3xl font-semibold text-app-text">
                {form.amount}
              </Text>
            </View>
          </View>

          <View className="gap-4 md:flex-row">
            <View className="flex-1 gap-2">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                Source wallet
              </Text>
              <Pressable className="flex-row items-center justify-between rounded-[18px] border border-app-border bg-app-panel/30 px-4 py-4">
                <Text className="font-display text-sm text-app-text">{form.sourceWallet}</Text>
                <MaterialCommunityIcons name="chevron-down" size={18} color={colors.textMuted} />
              </Pressable>
            </View>

            <View className="flex-1 gap-2">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                Settlement date
              </Text>
              <View className="flex-row items-center gap-3 rounded-[18px] border border-app-border bg-app-panel/30 px-4 py-4">
                <MaterialCommunityIcons
                  name="calendar-blank-outline"
                  size={18}
                  color={colors.textMuted}
                />
                <Text className="font-display text-sm text-app-text">{form.date}</Text>
              </View>
            </View>
          </View>

          <View className="gap-2">
            <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
              Notes
            </Text>
            <View className="rounded-[18px] border border-app-border bg-app-panel/30 px-4 py-4">
              <Text className="font-display text-sm text-app-muted">{form.notes}</Text>
            </View>
          </View>

          <View className="gap-2">
            <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
              Receipt attachment
            </Text>
            <View className="items-center justify-center rounded-[18px] border border-dashed border-app-border bg-app-panel/10 px-4 py-10">
              <MaterialCommunityIcons
                name="file-upload-outline"
                size={24}
                color={colors.textMuted}
              />
              <Text className="mt-3 font-display text-base text-app-text">
                Click or drag receipt to upload
              </Text>
              <Text className="mt-1 font-display text-xs uppercase tracking-[1.2px] text-app-muted">
                PDF, JPG, PNG, max 10MB
              </Text>
            </View>
          </View>

          <View className="gap-3">
            <Pressable className="items-center rounded-2xl bg-app-primary px-5 py-4 active:opacity-90">
              <Text className="font-display text-sm font-semibold text-app-primary-contrast">
                Confirm Settlement
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={onCancel}
              className="items-center rounded-2xl border border-app-border bg-app-surface px-5 py-4 active:bg-app-panel">
              <Text className="font-display text-sm font-semibold text-app-text">
                Cancel Transaction
              </Text>
            </Pressable>
          </View>
        </View>
      </DashboardCard>
    </View>
  );
}
