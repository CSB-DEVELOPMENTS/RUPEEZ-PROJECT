import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { SocialFinanceHeaderButton } from "@/components/social-finance/SocialFinanceHeaderButton";
import { SOCIAL_FINANCE_PAGE_CONTENT } from "@/constants/social-finance";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type SocialFinancePageHeaderProps = {
  onOpenNewTransaction: () => void;
};

export function SocialFinancePageHeader({
  onOpenNewTransaction,
}: SocialFinancePageHeaderProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <View className="gap-2">
        <Text className="font-display text-3xl font-semibold tracking-tight text-app-text">
          {SOCIAL_FINANCE_PAGE_CONTENT.title}
        </Text>
        <Text className="max-w-2xl font-display text-base leading-6 text-app-muted">
          {SOCIAL_FINANCE_PAGE_CONTENT.subtitle}
        </Text>
      </View>

      <View className="flex-row flex-wrap items-center gap-3">
        <View className="hidden min-w-[260px] flex-row items-center gap-3 rounded-2xl border border-app-border bg-app-surface px-4 py-3 md:flex">
          <MaterialCommunityIcons name="magnify" size={20} color={colors.textMuted} />
          <Text className="flex-1 font-display text-sm text-app-muted">
            {SOCIAL_FINANCE_PAGE_CONTENT.searchPlaceholder}
          </Text>
        </View>
        <View className="flex-row items-center gap-3">
          <SocialFinanceHeaderButton
            icon="plus"
            tone="accent"
            onPress={onOpenNewTransaction}
          />
          <SocialFinanceHeaderButton icon="bell-outline" />
          <View className="h-11 w-11 items-center justify-center rounded-2xl border border-app-border bg-app-surface">
            <MaterialCommunityIcons name="account" size={20} color={colors.primaryStrong} />
          </View>
        </View>
      </View>
    </View>
  );
}
