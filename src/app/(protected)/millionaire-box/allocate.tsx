import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from "react-native";

import { Colors, Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text className="font-display text-xs font-bold uppercase tracking-[1.5px] text-app-muted">
      {children}
    </Text>
  );
}

function FormInput({
  placeholder,
  prefix,
}: {
  placeholder: string;
  prefix?: string;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="h-14 flex-row items-center gap-3 rounded-[8px] border border-app-border bg-app-bg px-4 md:bg-app-panel">
      {prefix ? <Text className="font-display text-base font-bold text-app-muted">{prefix}</Text> : null}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.textSoft}
        className="min-w-0 flex-1 font-display text-base text-app-text outline-none"
        style={{ fontFamily: Fonts.sans }}
      />
    </View>
  );
}

function WalletSelect({ mobile = false }: { mobile?: boolean }) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <Pressable className="h-14 flex-row items-center justify-between rounded-[8px] border border-app-border bg-app-bg px-4 md:bg-app-panel">
      <Text className="font-display text-base text-app-text">
        {mobile ? "Main Treasury ($245,000.00)" : "Select origin account"}
      </Text>
      <MaterialCommunityIcons name="chevron-down" size={24} color={colors.textMuted} />
    </Pressable>
  );
}

export default function AllocateFundsScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 pb-10 pt-2 md:px-8 lg:px-10">
        <View className="mx-auto w-full max-w-[860px]">
          <View className="mb-8 md:mb-9">
            <Text className="hidden font-display text-sm text-app-muted md:flex">
              Millionaire Box &gt; <Text className="text-app-primary"> Allocate Funds</Text>
            </Text>
            <Text className="font-display text-3xl font-bold text-app-text md:mt-8 md:text-4xl">
              Allocate Funds
            </Text>
            <Text className="mt-3 max-w-md font-display text-base leading-6 text-app-muted">
              {isDesktop
                ? "Transfer capital into your Millionaire Box goal-based allocation."
                : "Distribute your capital across specialized investment jars."}
            </Text>
          </View>

          <View className="overflow-hidden rounded-[10px] border border-app-border bg-app-surface">
            <View className="gap-7 p-6 md:p-8">
              <View className="gap-3 md:hidden">
                <FieldLabel>Allocation Name</FieldLabel>
                <FormInput placeholder="e.g. Q4 Growth Rebalance" />
              </View>

              <View className="hidden gap-3 md:flex">
                <FieldLabel>Description</FieldLabel>
                <FormInput placeholder="e.g., Monthly recurring investment" />
              </View>

              <View className="gap-7 md:grid md:grid-cols-2 md:gap-8">
                <View className="gap-3 md:order-1">
                  <FieldLabel>{`Amount${""}`}<Text className="md:hidden"> to Allocate</Text></FieldLabel>
                  <FormInput placeholder="0.00" prefix="LKR" />
                </View>

                <View className="gap-3 md:order-2">
                  <FieldLabel>Source Wallet</FieldLabel>
                  <WalletSelect mobile={!isDesktop} />
                </View>
              </View>
            </View>

            <View className="hidden border-t border-app-border px-8 py-6 md:flex md:flex-row md:justify-end md:gap-4">
              <Pressable
                accessibilityRole="button"
                onPress={() => router.back()}
                className="h-10 w-28 items-center justify-center rounded-[6px] border border-app-border active:bg-app-panel">
                <Text className="font-display text-sm font-bold uppercase text-app-muted">Cancel</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                className="h-10 w-44 items-center justify-center rounded-[6px] bg-app-primary active:bg-app-primary-strong">
                <Text className="font-display text-sm font-bold uppercase text-app-primary-contrast">
                  Allocate Now
                </Text>
              </Pressable>
            </View>
          </View>

          <View className="mt-32 gap-4 border-t border-app-border pt-6 md:hidden">
            <Pressable
              accessibilityRole="button"
              className="h-[58px] items-center justify-center rounded-[8px] bg-app-primary shadow-showcase-phone active:bg-app-primary-strong">
              <Text className="font-display text-base font-bold text-app-primary-contrast">
                Allocate Now
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.back()}
              className="h-[58px] items-center justify-center rounded-[8px] border border-app-border active:bg-app-panel">
              <Text className="font-display text-base font-bold text-app-text">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
