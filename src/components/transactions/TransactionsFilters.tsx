import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type TransactionsFiltersProps = {
  filters: string[];
};

export function TransactionsFilters({ filters }: TransactionsFiltersProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="rounded-[30px] border border-app-border bg-app-surface p-4 md:p-5">
      <View className="gap-3 lg:flex-row lg:items-center lg:justify-between">
        <View className="flex-row flex-wrap gap-3">
          {filters.map((filter, index) => {
            const isActive = index === 0;

            return (
              <Pressable
                key={filter}
                className={`min-h-12 flex-row items-center gap-2 rounded-2xl border px-4 py-3 ${
                  isActive
                    ? "border-app-primary bg-app-primary"
                    : "border-app-border bg-app-panel/25"
                }`}>
                <MaterialCommunityIcons
                  name={isActive ? "calendar-month-outline" : "filter-variant"}
                  size={18}
                  color={isActive ? colors.primaryContrast : colors.textMuted}
                />
                <Text
                  className={`font-display text-sm font-semibold ${
                    isActive ? "text-app-primary-contrast" : "text-app-text"
                  }`}>
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View className="flex-row items-center gap-3 self-end">
          <Pressable className="h-12 w-12 items-center justify-center rounded-2xl border border-app-border bg-app-panel/25">
            <MaterialCommunityIcons name="format-list-bulleted" size={20} color={colors.textMuted} />
          </Pressable>
          <Pressable className="h-12 w-12 items-center justify-center rounded-2xl border border-app-border bg-app-panel/25">
            <MaterialCommunityIcons name="view-grid-outline" size={20} color={colors.textMuted} />
          </Pressable>
          <Pressable className="min-h-12 flex-row items-center gap-2 rounded-2xl border border-app-border bg-app-panel/25 px-4 py-3">
            <MaterialCommunityIcons name="export-variant" size={18} color={colors.text} />
            <Text className="font-display text-sm font-semibold text-app-text">Export</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
