import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { Colors, Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

function formatGoalName(id: string | string[] | undefined) {
  const slug = Array.isArray(id) ? id[0] : id;

  if (!slug) {
    return "Retirement Fund 2045";
  }

  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => {
      if (part === "macbook") {
        return "MacBook";
      }

      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text className="font-display text-xs font-bold uppercase tracking-[1.3px] text-app-muted md:text-sm md:tracking-[1.6px]">
      {children}
    </Text>
  );
}

function FormInput({
  editable = true,
  keyboardType,
  placeholder,
  prefix,
  rightIcon,
  value,
}: {
  editable?: boolean;
  keyboardType?: "default" | "numeric";
  placeholder?: string;
  prefix?: string;
  rightIcon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  value?: string;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="h-14 flex-row items-center gap-3 rounded-[10px] border border-app-border bg-app-bg px-4 md:h-[52px]">
      {prefix ? <Text className="font-display text-base font-bold text-app-muted">{prefix}</Text> : null}
      <TextInput
        editable={editable}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={colors.textSoft}
        value={value}
        className="min-w-0 flex-1 font-display text-base text-app-text outline-none"
        style={{ fontFamily: Fonts.sans }}
      />
      {rightIcon ? (
        <MaterialCommunityIcons name={rightIcon} size={22} color={colors.textMuted} />
      ) : null}
    </View>
  );
}

function WalletSelect() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <Pressable className="h-14 flex-row items-center justify-between rounded-[10px] border border-app-border bg-app-bg px-4 md:h-[52px]">
      <Text className="font-display text-base text-app-text">Select Wallet</Text>
      <MaterialCommunityIcons name="chevron-down" size={24} color={colors.textMuted} />
    </Pressable>
  );
}

function UploadBox() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <Pressable className="min-h-[180px] items-center justify-center rounded-[10px] border-2 border-dashed border-app-border bg-app-bg px-6 py-8 md:min-h-[190px]">
      <View className="h-14 w-14 items-center justify-center rounded-full bg-app-panel md:h-12 md:w-12">
        <MaterialCommunityIcons name="cloud-upload-outline" size={28} color={colors.primary} />
      </View>
      <Text className="mt-5 text-center font-display text-base text-app-text md:mt-6">
        <Text className="hidden md:flex">Drag and drop files here</Text>
        <Text className="md:hidden">Tap to upload receipt</Text>
      </Text>
      <Text className="mt-2 text-center font-display text-sm text-app-muted">
        <Text className="hidden md:flex">or browse for files (PDF, JPG, PNG up to 10MB)</Text>
        <Text className="md:hidden">PDF, JPG or PNG up to 5MB</Text>
      </Text>
    </Pressable>
  );
}

export default function GoalContributionScreen() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const goalName = formatGoalName(id);

  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 pb-10 pt-2 md:px-8 lg:px-10">
        <View className="mb-8 hidden md:flex">
          <Text className="font-display text-lg text-app-text">Add Contribution</Text>
          <Text className="mt-3 font-display text-base text-app-muted">
            Log a new financial milestone towards your savings goals.
          </Text>
        </View>

        <View className="mx-auto w-full max-w-[980px] overflow-hidden rounded-[10px] border border-app-border bg-app-surface px-6 py-7 shadow-showcase-soft-dark md:px-8 md:py-10">
          <View className="mb-7 md:hidden">
            <Text className="font-display text-xs font-bold uppercase tracking-[1.6px] text-app-primary">
              Transaction Details
            </Text>
            <Text className="mt-2 font-display text-sm leading-5 text-app-muted">
              Please provide the details of your contribution to update your goal progress.
            </Text>
          </View>

          <View className="gap-7">
            <View className="gap-3">
              <FieldLabel>Goal Name</FieldLabel>
              <FormInput editable={false} value={goalName} />
            </View>

            <View className="gap-7 md:grid md:grid-cols-3 md:gap-8">
              <View className="gap-3">
                <FieldLabel>Contribution Amount (LKR)</FieldLabel>
                <FormInput keyboardType="numeric" placeholder="0.00" prefix="LKR" />
              </View>
              <View className="gap-3">
                <FieldLabel>Contribution Date</FieldLabel>
                <FormInput placeholder="mm/dd/yyyy" rightIcon="calendar-month" />
              </View>
              <View className="gap-3">
                <FieldLabel>Source Wallet</FieldLabel>
                <WalletSelect />
              </View>
            </View>

            <View className="gap-3">
              <FieldLabel>Description</FieldLabel>
              <View className="min-h-[58px] rounded-[10px] border border-app-border bg-app-bg px-4 py-4 md:min-h-[52px] md:py-0 md:justify-center">
                <TextInput
                  multiline
                  placeholder="e.g. Monthly automated transfer to Retirement Fund"
                  placeholderTextColor={colors.textSoft}
                  className="min-h-[76px] font-display text-base text-app-text outline-none md:min-h-0"
                  style={{ fontFamily: Fonts.sans, textAlignVertical: "top" }}
                />
              </View>
            </View>

            <View className="gap-3">
              <FieldLabel>Proof of Contribution</FieldLabel>
              <UploadBox />
            </View>
          </View>

          <View className="mt-8 h-px bg-app-border md:mt-9" />

          <View className="mt-8 gap-3 md:flex-row md:justify-end md:gap-4">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Add contribution"
              className="h-[54px] min-w-[220px] items-center justify-center rounded-[10px] bg-app-primary px-8 active:bg-app-primary-strong md:w-60">
              <View className="flex-row items-center gap-2">
                <MaterialCommunityIcons
                  className="hidden md:flex"
                  name="check-circle-outline"
                  size={18}
                  color={colors.primaryContrast}
                />
                <Text
                  numberOfLines={1}
                  className="font-display text-base font-bold text-app-primary-contrast">
                  Add Contribution
                </Text>
              </View>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Cancel contribution"
              onPress={() => router.back()}
              className="h-[54px] items-center justify-center rounded-[10px] border border-app-border px-8 active:bg-app-panel md:-order-1 md:w-28">
              <Text className="font-display text-base font-bold text-app-muted">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
