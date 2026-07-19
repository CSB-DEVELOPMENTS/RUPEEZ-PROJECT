import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { ContextInsightData } from "@/types/contexts-switching";

export function ContextInsightBanner({ data }: { data: ContextInsightData }) {
  const { theme } = useAppTheme();

  return (
    <View className="gap-4 rounded-[24px] border border-app-primary/25 bg-app-surface px-5 py-5 md:flex-row md:items-center md:justify-between">
      <View className="min-w-0 flex-1 flex-row items-center gap-4">
        <View className="h-12 w-12 items-center justify-center rounded-full bg-app-primary/15">
          <MaterialCommunityIcons
            name="lightbulb-outline"
            size={22}
            color={Colors[theme].primary}
          />
        </View>
        <Text className="min-w-0 flex-1 font-display text-base leading-7 text-app-text">
          <Text className="font-semibold text-app-primary">{data.emphasizedLabel} </Text>
          {data.message}
        </Text>
      </View>

      <Pressable className="self-start rounded-2xl border border-app-primary/30 px-4 py-3 md:self-center">
        <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-primary">
          {data.actionLabel}
        </Text>
      </Pressable>
    </View>
  );
}
