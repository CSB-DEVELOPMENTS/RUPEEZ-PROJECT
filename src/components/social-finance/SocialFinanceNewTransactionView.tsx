import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { SPLIT_MEMBERS } from "@/constants/social-finance";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { TransactionMode } from "@/types/social-finance";

type SocialFinanceNewTransactionViewProps = {
  onBack: () => void;
  onSave: () => void;
  onToggleMode: (mode: TransactionMode) => void;
  onToggleSplitExpense: () => void;
  splitExpense: boolean;
  transactionMode: TransactionMode;
};

export function SocialFinanceNewTransactionView({
  onBack,
  onSave,
  onToggleMode,
  onToggleSplitExpense,
  splitExpense,
  transactionMode,
}: SocialFinanceNewTransactionViewProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const amountLabel =
    transactionMode === "income" ? "0.00" : splitExpense ? "120.00" : "0.00";

  return (
    <View className="gap-5">
      <View className="flex-row items-center justify-between gap-4">
        <View className="gap-2">
          <Text className="font-display text-xs font-semibold uppercase tracking-[1.8px] text-app-primary-strong">
            SOCIAL FINANCE / NEW TRANSACTION
          </Text>
          <Text className="font-display text-3xl font-semibold tracking-tight text-app-text">
            New Transaction
          </Text>
          <Text className="font-display text-base text-app-muted">
            Record your cash flow with precision and mission control accuracy.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onBack}
          className="flex-row items-center gap-2 rounded-2xl border border-app-border bg-app-surface px-4 py-3 active:bg-app-panel">
          <MaterialCommunityIcons name="arrow-left" size={18} color={colors.textMuted} />
          <Text className="font-display text-sm font-semibold text-app-text">Back</Text>
        </Pressable>
      </View>

      <DashboardCard>
        <View className="gap-6">
          <View className="rounded-[24px] border border-app-border bg-app-panel/20 px-4 py-4">
            <View className="flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <View className="flex-row items-center rounded-2xl bg-app-bg px-1 py-1">
                {(["expense", "income"] as const).map((mode) => {
                  const active = transactionMode === mode;

                  return (
                    <Pressable
                      key={mode}
                      accessibilityRole="button"
                      onPress={() => onToggleMode(mode)}
                      className={
                        active
                          ? "rounded-xl bg-app-primary px-5 py-2"
                          : "rounded-xl px-5 py-2"
                      }>
                      <Text
                        className={
                          active
                            ? "font-display text-sm font-semibold capitalize text-app-primary-contrast"
                            : "font-display text-sm capitalize text-app-muted"
                        }>
                        {mode}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <View className="items-start md:items-end">
                <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                  Transaction amount
                </Text>
                <View className="mt-1 flex-row items-center gap-3">
                  <Text className="font-display text-2xl text-app-muted">$</Text>
                  <Text className="font-display text-4xl font-semibold tracking-tight text-app-primary">
                    {amountLabel}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="gap-2">
            <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
              Merchant or title
            </Text>
            <View className="flex-row items-center gap-3 rounded-[18px] border border-app-border bg-app-panel/30 px-4 py-4">
              <MaterialCommunityIcons name="storefront-outline" size={18} color={colors.textMuted} />
              <Text className="font-display text-sm text-app-muted">
                e.g. Starbucks, Monthly Rent, Amazon...
              </Text>
            </View>
          </View>

          <View className="gap-4 md:flex-row">
            <View className="flex-1 gap-2">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                Date of transaction
              </Text>
              <View className="flex-row items-center gap-3 rounded-[18px] border border-app-border bg-app-panel/30 px-4 py-4">
                <MaterialCommunityIcons
                  name="calendar-blank-outline"
                  size={18}
                  color={colors.textMuted}
                />
                <Text className="font-display text-sm text-app-text">Jul 16, 2026</Text>
              </View>
            </View>

            <View className="flex-1 gap-2">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                Category
              </Text>
              <Pressable className="flex-row items-center justify-between rounded-[18px] border border-app-border bg-app-panel/30 px-4 py-4">
                <Text className="font-display text-sm text-app-text">
                  {transactionMode === "income" ? "Select Category" : "Food & Dining"}
                </Text>
                <MaterialCommunityIcons name="chevron-down" size={18} color={colors.textMuted} />
              </Pressable>
            </View>
          </View>

          <View className="gap-4 md:flex-row">
            <View className="flex-1 gap-2">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                Source wallet
              </Text>
              <Pressable className="flex-row items-center justify-between rounded-[18px] border border-app-border bg-app-panel/30 px-4 py-4">
                <Text className="font-display text-sm text-app-text">
                  Priority Checking (...862)
                </Text>
                <MaterialCommunityIcons name="chevron-down" size={18} color={colors.textMuted} />
              </Pressable>
            </View>

            <View className="flex-1 gap-2">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                Recurring transaction
              </Text>
              <Pressable className="flex-row items-center justify-between rounded-[18px] border border-app-border bg-app-panel/30 px-4 py-4">
                <Text className="font-display text-sm text-app-text">One time</Text>
                <MaterialCommunityIcons name="chevron-down" size={18} color={colors.textMuted} />
              </Pressable>
            </View>
          </View>

          <Pressable
            accessibilityRole="switch"
            accessibilityState={{ checked: splitExpense }}
            onPress={onToggleSplitExpense}
            className="flex-row items-center justify-between rounded-[18px] border border-app-border bg-app-panel/20 px-4 py-4">
            <View className="flex-row items-center gap-3">
              <MaterialCommunityIcons name="source-branch" size={18} color={colors.textMuted} />
              <Text className="font-display text-sm font-medium text-app-text">Split expense</Text>
            </View>

            <View
              className={
                splitExpense
                  ? "h-6 w-11 rounded-full bg-app-primary px-1"
                  : "h-6 w-11 rounded-full bg-app-panel px-1"
              }>
              <View
                className={
                  splitExpense
                    ? "ml-auto mt-1 h-4 w-4 rounded-full bg-app-primary-contrast"
                    : "mt-1 h-4 w-4 rounded-full bg-app-text-muted"
                }
              />
            </View>
          </Pressable>

          {splitExpense ? (
            <View className="gap-3 rounded-[24px] border border-app-border bg-app-panel/10 px-4 py-4">
              <View className="flex-row items-center justify-between gap-4">
                <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                  Split details
                </Text>
                <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-primary">
                  50.0% / 6 people
                </Text>
              </View>

              {SPLIT_MEMBERS.map((member) => (
                <View
                  key={member.name}
                  className="flex-row items-center gap-3 rounded-[18px] border border-app-border bg-app-panel/30 px-3 py-3">
                  <View
                    className={
                      member.enabled
                        ? "h-9 w-9 items-center justify-center rounded-full bg-app-primary-muted"
                        : "h-9 w-9 items-center justify-center rounded-full bg-app-panel"
                    }>
                    <Text
                      className={
                        member.enabled
                          ? "font-display text-sm font-semibold text-app-primary-strong"
                          : "font-display text-sm font-semibold text-app-muted"
                      }>
                      {member.name.slice(0, 1)}
                    </Text>
                  </View>

                  <View className="min-w-0 flex-1">
                    <Text className="font-display text-sm font-semibold text-app-text">
                      {member.name}
                    </Text>
                    <Text className="font-display text-xs uppercase tracking-[1.2px] text-app-muted">
                      {member.role}
                    </Text>
                  </View>

                  <View className="min-w-[90px] rounded-xl border border-app-border bg-app-bg px-3 py-2">
                    <Text className="text-right font-display text-sm text-app-text">
                      {member.amount}
                    </Text>
                  </View>

                  <View
                    className={
                      member.enabled
                        ? "h-5 w-9 rounded-full bg-app-primary px-1"
                        : "h-5 w-9 rounded-full bg-app-panel px-1"
                    }>
                    <View
                      className={
                        member.enabled
                          ? "ml-auto mt-0.5 h-3.5 w-3.5 rounded-full bg-app-primary-contrast"
                          : "mt-0.5 h-3.5 w-3.5 rounded-full bg-app-text-muted"
                      }
                    />
                  </View>
                </View>
              ))}

              <View className="flex-row items-center justify-between border-t border-app-border pt-3">
                <Text className="font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-primary">
                  5 members
                </Text>
                <Text className="font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
                  50.0% / 6 people
                </Text>
              </View>
            </View>
          ) : null}

          <View className="gap-4 md:flex-row">
            <View className="flex-1 gap-2">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                Notes
              </Text>
              <View className="min-h-[112px] rounded-[18px] border border-app-border bg-app-panel/30 px-4 py-4">
                <Text className="font-display text-sm text-app-muted">
                  Add a description or reason for this transaction...
                </Text>
              </View>
            </View>

            <View className="flex-1 gap-2">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                Receipt attachment
              </Text>
              <View className="min-h-[112px] items-center justify-center rounded-[18px] border border-dashed border-app-border bg-app-panel/10 px-4 py-4">
                <MaterialCommunityIcons
                  name="file-upload-outline"
                  size={24}
                  color={colors.primaryStrong}
                />
                <Text className="mt-3 font-display text-sm font-semibold text-app-text">
                  Upload or drop receipt
                </Text>
                <Text className="mt-1 font-display text-xs uppercase tracking-[1.2px] text-app-muted">
                  PNG, JPG or PDF
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row items-center justify-end gap-3 border-t border-app-border pt-4">
            <Pressable
              accessibilityRole="button"
              onPress={onBack}
              className="rounded-xl border border-app-border bg-app-surface px-5 py-3 active:bg-app-panel">
              <Text className="font-display text-sm font-semibold text-app-text">Cancel</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={onSave}
              className="flex-row items-center gap-2 rounded-xl bg-app-primary px-5 py-3 active:opacity-90">
              <Text className="font-display text-sm font-semibold text-app-primary-contrast">
                Save Transaction
              </Text>
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={16}
                color={colors.primaryContrast}
              />
            </Pressable>
          </View>
        </View>
      </DashboardCard>
    </View>
  );
}
