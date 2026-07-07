import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, TextInput, View } from "react-native";

import { Colors, Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type TopCategoriesHeroProps = {
  dateRange: string;
  searchPlaceholder: string;
  subtitle: string;
  summaryLabel: string;
  summaryValue: string;
  title: string;
};

export function TopCategoriesHero({
  dateRange,
  searchPlaceholder,
  subtitle,
  summaryLabel,
  summaryValue,
  title,
}: TopCategoriesHeroProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="gap-6">
      <View className="gap-4 lg:flex-row lg:items-center lg:justify-between">
        <View className="w-full max-w-md rounded-[28px] border border-app-border bg-app-surface/90 px-5 py-4">
          <View className="flex-row items-center gap-3">
            <MaterialCommunityIcons name="magnify" size={20} color={colors.textMuted} />
            <TextInput
              editable={false}
              placeholder={searchPlaceholder}
              placeholderTextColor={colors.textMuted}
              className="flex-1 font-display text-base text-app-text"
              style={{ fontFamily: Fonts.sans }}
            />
          </View>
        </View>
        <Text className="font-display text-base font-semibold text-app-text md:text-lg">
          {dateRange}
        </Text>
      </View>

      <View className="gap-5 lg:flex-row lg:items-start lg:justify-between">
        <View className="max-w-2xl gap-2">
          <Text className="font-display text-lg text-app-muted md:text-xl">{subtitle}</Text>
          <Text className="font-display text-3xl font-semibold text-app-text md:text-5xl">
            {title}
          </Text>
        </View>

        <View className="items-start gap-2 lg:items-end">
          <Text className="font-display text-sm font-semibold uppercase tracking-[1.5px] text-app-muted">
            {summaryLabel}
          </Text>
          <Text className="font-display text-4xl font-semibold tracking-tight text-app-primary md:text-6xl">
            {summaryValue}
          </Text>
        </View>
      </View>
    </View>
  );
}
