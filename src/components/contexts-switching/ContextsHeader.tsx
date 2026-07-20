import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type ContextsHeaderProps = {
  onCreate: () => void;
  onManage: () => void;
};

export function ContextsHeader({ onCreate, onManage }: ContextsHeaderProps) {
  const { theme } = useAppTheme();

  return (
    <View className="gap-5 md:flex-row md:items-center md:justify-between">
      <View className="gap-1">
        <Text className="font-display text-3xl font-semibold tracking-tight text-app-text md:text-5xl">
          All Contexts
        </Text>
        <Text className="font-display text-lg leading-7 text-app-muted">
          Overview of your financial worlds
        </Text>
      </View>

      <View className="gap-3 sm:flex-row">
        <Pressable
          className="min-h-12 flex-row items-center justify-center gap-2 rounded-2xl border border-app-border bg-app-surface px-5 py-3 md:min-w-40"
          onPress={onManage}>
          <MaterialCommunityIcons name="format-list-bulleted" size={20} color={Colors[theme].text} />
          <Text className="font-display text-base font-semibold text-app-text">
            Manage
          </Text>
        </Pressable>

        <Pressable
          className="min-h-12 flex-row items-center justify-center gap-2 rounded-2xl bg-app-primary px-5 py-3 md:min-w-44"
          onPress={onCreate}>
          <MaterialCommunityIcons name="plus" size={22} color={Colors[theme].primaryContrast} />
          <Text className="font-display text-base font-semibold text-app-primary-contrast">
            New Context
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
