import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { Colors, Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

function FormField({
  helperText,
  label,
  placeholder,
  prefix,
}: {
  helperText?: string;
  label: string;
  placeholder: string;
  prefix?: string;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="gap-3">
      <Text className="font-display text-xs font-bold uppercase tracking-[1.8px] text-app-muted">
        {label}
      </Text>
      <View className="h-14 flex-row items-center gap-3 rounded-[8px] border border-app-border bg-app-panel px-4 md:h-[58px]">
        {prefix ? (
          <Text className="font-display text-base font-bold uppercase text-app-muted">{prefix}</Text>
        ) : null}
        <TextInput
          className="flex-1 font-display text-base text-app-text focus:outline-none"
          editable={false}
          placeholder={placeholder}
          placeholderTextColor={colors.textSoft}
          style={{ fontFamily: Fonts.sans }}
        />
      </View>
      {helperText ? (
        <Text className="font-display text-xs italic leading-5 text-app-muted">{helperText}</Text>
      ) : null}
    </View>
  );
}

function AssetTypeField() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="gap-3">
      <Text className="font-display text-xs font-bold uppercase tracking-[1.8px] text-app-muted">
        Asset Type
      </Text>
      <Pressable className="h-14 flex-row items-center justify-between rounded-[8px] border border-app-border bg-app-panel px-4 md:h-[58px]">
        <Text className="font-display text-base text-app-text">Select an asset category</Text>
        <MaterialCommunityIcons name="chevron-down" size={24} color={colors.textMuted} />
      </Pressable>
    </View>
  );
}

export default function AddAsset() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 pb-8 pt-2 md:px-8 lg:px-10">
        <View className="mb-7 flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
            <Text className="font-display text-2xl font-bold text-app-text">Assets</Text>
            <View className="hidden h-6 w-px bg-app-border md:flex" />
          </View>

          <View className="flex-row items-center gap-4">
            <MaterialCommunityIcons name="bell-outline" size={24} color={colors.textMuted} />
          </View>
        </View>

        <View className="overflow-hidden rounded-[12px] border border-app-border bg-app-surface">
          <View className="border-b border-app-border px-6 py-7 md:px-8 md:py-9">
            <Text className="font-display text-2xl font-semibold text-app-text md:text-3xl">
              Add New Asset
            </Text>
            <Text className="mt-2 max-w-xl font-display text-base leading-6 text-app-muted">
              Onboard a new financial instrument to your portfolio mission control.
            </Text>
          </View>

          <View className="min-h-[460px] px-6 py-7 md:min-h-[490px] md:px-8">
            <View className="gap-7">
              <FormField
                helperText="Provide a descriptive name to easily identify this asset in your dashboard."
                label="Asset Name"
                placeholder="e.g. Primary Savings Account"
              />

              <View className="gap-7 md:flex-row">
                <View className="md:flex-1">
                  <FormField label="Initial Balance" placeholder="0.00" prefix="LKR" />
                </View>
                <View className="md:flex-1">
                  <AssetTypeField />
                </View>
              </View>
            </View>
          </View>

          <View className="border-t border-app-border px-6 py-8 md:px-8">
            <View className="gap-3 md:flex-row md:justify-end">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Cancel adding asset"
                className="h-12 items-center justify-center rounded-[8px] border border-app-border px-8 md:w-32"
                onPress={() => router.back()}>
                <Text className="font-display text-base font-bold text-app-muted">Cancel</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Save asset"
                className="h-12 items-center justify-center rounded-[8px] bg-app-primary px-8 md:w-40">
                <Text className="font-display text-base font-bold text-app-primary-contrast">
                  Save Asset
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
