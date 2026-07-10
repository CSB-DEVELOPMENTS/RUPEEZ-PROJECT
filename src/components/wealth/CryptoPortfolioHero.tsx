import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, TextInput, View } from "react-native";

import { Colors, Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type CryptoPortfolioHeroProps = {
  dateRange: string;
  searchPlaceholder: string;
  subtitle: string;
  title: string;
};

export function CryptoPortfolioHero({
  dateRange,
  searchPlaceholder,
  subtitle,
  title,
}: CryptoPortfolioHeroProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="gap-6">
      <View className="rounded-[28px] border border-app-border bg-app-surface/90 px-5 py-4">
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

      <View className="gap-4 lg:flex-row lg:items-start lg:justify-between">
        <View className="max-w-2xl gap-2">
          <Text className="font-display text-3xl font-semibold text-app-text md:text-5xl">
            {title}
          </Text>
          <Text className="font-display text-lg leading-7 text-app-muted md:text-xl">
            {subtitle}
          </Text>
        </View>
        <Text className="font-display text-base font-semibold text-app-text md:text-lg">
          {dateRange}
        </Text>
      </View>
    </View>
  );
}
