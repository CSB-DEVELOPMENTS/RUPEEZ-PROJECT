import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { Colors, Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

const recentActivity = [
  { date: "May 20, 2024", title: "Dividends: Commercial Bank PLC", amount: "+ 24,500.00" },
  { date: "May 18, 2024", title: "Rental Income: Colombo 07 Penthouse", amount: "+ 350,000.00" },
  { date: "May 15, 2024", title: "Portfolio Maintenance Fee", amount: "+ 5,200.00" },
];

const mobileActivity = [
  { title: "Wealth Jar Deposit", date: "Today, 2:34 PM", amount: "+LKR 15,000" },
  { title: "Daily Fill", date: "Yesterday", amount: "+LKR 15,000" },
  { title: "Dividend Received", date: "2 days ago", amount: "+LKR 2,450" },
];

function ProgressRing({ compact = false }: { compact?: boolean }) {
  return (
    <View
      className={`items-center justify-center rounded-full border-[12px] border-app-primary ${
        compact ? "h-[172px] w-[172px]" : "h-[190px] w-[190px]"
      }`}>
      <Text className="font-display text-4xl font-bold text-app-text">76%</Text>
      <Text className="mt-1 font-display text-xs font-bold uppercase text-app-muted">Saved</Text>
    </View>
  );
}

function TargetModal({ onClose, visible }: { onClose: () => void; visible: boolean }) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const modalBorderColor = theme === "dark" ? "rgba(34, 197, 94, 0.42)" : colors.primaryMuted;

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/75 px-6">
        <View
          style={{
            backgroundColor: colors.surface,
            borderColor: modalBorderColor,
          }}
          className="w-full max-w-[448px] rounded-[12px] border p-8">
          <View className="flex-row items-center gap-4">
            <View
              style={{ backgroundColor: colors.primaryMuted }}
              className="h-10 w-10 items-center justify-center rounded-full">
              <MaterialCommunityIcons name="bullseye-arrow" size={24} color={colors.primary} />
            </View>
            <Text style={{ color: colors.text }} className="font-display text-lg">
              Configure Target
            </Text>
          </View>
          <Text style={{ color: colors.textMuted }} className="mt-5 font-display text-base leading-6">
            Set your ultimate financial milestone. This will recalibrate your progress metrics and
            velocity tracking.
          </Text>

          <View className="mt-8 gap-3">
            <Text
              style={{ color: colors.textMuted }}
              className="font-display text-xs font-bold uppercase tracking-[1.6px]">
              LKR Target Amount
            </Text>
            <View
              style={{ backgroundColor: colors.background, borderColor: colors.border }}
              className="h-[62px] flex-row items-center gap-3 rounded-[10px] border px-4">
              <Text className="font-display text-base font-bold text-app-primary">LKR</Text>
              <TextInput
                value="1,000,000"
                placeholderTextColor={colors.textSoft}
                className="min-w-0 flex-1 font-display text-lg outline-none"
                style={{ color: colors.text, fontFamily: Fonts.sans }}
              />
            </View>
            <Text
              style={{ color: colors.textMuted }}
              className="font-display text-xs italic leading-5">
              Adjusting this will update your Millionaire Box progress percentage immediately.
            </Text>
          </View>

          <View className="mt-10 gap-3 md:flex-row">
            <Pressable
              accessibilityRole="button"
              className="h-[52px] flex-1 items-center justify-center rounded-full bg-app-primary active:bg-app-primary-strong">
              <Text className="font-display text-base font-bold text-app-primary-contrast">
                Save Changes
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={onClose}
              style={{ borderColor: colors.border }}
              className="h-[52px] flex-1 items-center justify-center rounded-full border active:bg-app-panel">
              <Text style={{ color: colors.textMuted }} className="font-display text-base font-bold">
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function FinancialJarsCard({ onConfigure }: { onConfigure: () => void }) {
  return (
    <View className="rounded-[10px] border border-app-border bg-black p-6 md:flex-1 md:p-7">
      <View className="flex-row items-start justify-between gap-4">
        <View>
          <Text className="font-display text-xl font-bold text-app-text">Financial Jars</Text>
          <Text className="mt-1 hidden font-display text-sm text-app-muted md:flex">
            Strategy based on the 6-jar system
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onConfigure}
          className="flex-row items-center gap-1 rounded-[8px] bg-app-primary-muted px-4 py-2 active:bg-app-panel">
          <Text className="font-display text-base text-app-primary-strong">Configure</Text>
          <MaterialCommunityIcons name="arrow-right" size={17} color="#4ADE80" />
        </Pressable>
      </View>

      <View className="mt-9 hidden items-center md:flex">
        <View className="h-[176px] w-[128px] justify-end overflow-hidden rounded-[12px] border border-app-border bg-app-panel">
          <View className="h-[76%] border-t-2 border-app-primary bg-app-primary-muted" />
        </View>
        <View className="mt-5 flex-row items-end gap-2">
          <Text className="font-display text-4xl font-bold text-app-text">76%</Text>
          <Text className="pb-2 font-display text-xs font-bold uppercase tracking-[1.6px] text-app-primary">
            Allocated
          </Text>
        </View>
      </View>

      <View className="mt-8 md:hidden">
        <View className="flex-row items-center justify-between">
          <Text className="font-display text-base text-app-text">Monthly Allocation</Text>
          <Text className="font-display text-base text-app-text">76% Allocated</Text>
        </View>
        <View className="mt-4 h-2 overflow-hidden rounded-full bg-app-panel-strong">
          <View className="h-full w-[76%] rounded-full bg-app-primary" />
        </View>
        <View className="mt-6 flex-row gap-4">
          <View className="flex-1 rounded-[6px] border border-app-border p-4">
            <Text className="font-display text-xs text-app-muted">Allocated</Text>
            <Text className="mt-2 font-display text-base text-app-text">LKR 722k</Text>
          </View>
          <View className="flex-1 rounded-[6px] border border-app-border p-4">
            <Text className="font-display text-xs text-app-muted">Remaining</Text>
            <Text className="mt-2 font-display text-base text-app-text">LKR 228k</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function MillionaireBoxScreen() {
  const router = useRouter();
  const [configureOpen, setConfigureOpen] = useState(false);

  return (
    <>
      <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="mx-auto w-full px-4 pb-24 pt-2 md:px-8 md:pb-10 lg:px-10">
          <View className="mb-7 hidden flex-row items-center justify-between md:flex">
            <Text className="font-display text-2xl font-bold text-app-text">Millionaire Box</Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/millionaire-box/allocate" as Href)}
              className="h-11 flex-row items-center gap-2 rounded-[8px] bg-app-primary px-5 active:bg-app-primary-strong">
              <MaterialCommunityIcons name="cash-multiple" size={20} color="#041009" />
              <Text className="font-display text-sm font-bold text-app-primary-contrast">
                Allocate Now
              </Text>
            </Pressable>
          </View>

          <View className="gap-6 md:flex-row">
            <View className="items-center rounded-[10px] border border-app-border bg-black p-8 md:min-h-[392px] md:flex-1">
              <View className="w-full">
                <Text className="font-display text-sm uppercase tracking-[1.8px] text-app-muted">
                  Total Wealth
                </Text>
                <Text className="mt-2 font-display text-4xl font-bold text-app-text">
                  LKR 950,000
                </Text>
                <View className="mt-3 flex-row items-center gap-3 md:hidden">
                  <View className="rounded-full bg-app-primary-muted px-3 py-1">
                    <Text className="font-display text-xs font-bold text-app-primary-strong">
                      ↗ +12.4%
                    </Text>
                  </View>
                  <Text className="font-display text-sm text-app-muted">vs last month</Text>
                </View>
              </View>
              <View className="mt-9 md:mt-16">
                <ProgressRing compact />
              </View>
            </View>

            <FinancialJarsCard onConfigure={() => setConfigureOpen(true)} />
          </View>

          <View className="mt-6 overflow-hidden rounded-[10px] border border-app-border bg-black">
            <View className="flex-row items-center justify-between px-6 py-7">
              <Text className="font-display text-xl font-bold text-app-text">Recent Activity</Text>
              <Pressable onPress={() => router.push("/millionaire-box/activity" as Href)}>
                <Text className="font-display text-base text-app-primary-strong">View All</Text>
              </Pressable>
            </View>

            <View className="hidden px-6 pb-6 md:flex">
              <View className="flex-row border-b border-app-border pb-4">
                <Text className="w-[18%] font-display text-xs font-bold uppercase tracking-[1.4px] text-app-muted">
                  Date
                </Text>
                <Text className="flex-1 font-display text-xs font-bold uppercase tracking-[1.4px] text-app-muted">
                  Activity Description
                </Text>
                <Text className="w-[20%] text-right font-display text-xs font-bold uppercase tracking-[1.4px] text-app-muted">
                  Amount (LKR)
                </Text>
              </View>
              {recentActivity.map((item) => (
                <View key={item.title} className="flex-row border-b border-app-border py-5">
                  <Text className="w-[18%] font-display text-sm text-app-muted">{item.date}</Text>
                  <Text className="flex-1 font-display text-sm font-semibold text-app-text">
                    {item.title}
                  </Text>
                  <Text className="w-[20%] text-right font-display text-sm font-bold text-app-primary-strong">
                    {item.amount}
                  </Text>
                </View>
              ))}
            </View>

            <View className="md:hidden">
              {mobileActivity.map((item) => (
                <View key={item.title} className="flex-row border-b border-app-border px-6 py-5">
                  <View className="flex-1">
                    <Text className="font-display text-base text-app-text">{item.title}</Text>
                    <Text className="mt-1 font-display text-sm text-app-muted">{item.date}</Text>
                  </View>
                  <Text className="font-display text-base text-app-primary-strong">{item.amount}</Text>
                </View>
              ))}
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/millionaire-box/allocate" as Href)}
            className="absolute bottom-6 right-6 h-16 w-16 items-center justify-center rounded-full bg-app-primary shadow-showcase-phone active:bg-app-primary-strong md:hidden">
            <MaterialCommunityIcons name="plus" size={31} color="#041009" />
          </Pressable>
        </View>
      </ScrollView>

      <TargetModal visible={configureOpen} onClose={() => setConfigureOpen(false)} />
    </>
  );
}
