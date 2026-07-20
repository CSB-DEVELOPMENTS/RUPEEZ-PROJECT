import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { ContextSummary } from "@/types/contexts-switching";

import { contextToneClasses, contextToneColor } from "./contextTone";

export function ContextListPanel({ data }: { data: ContextSummary[] }) {
  const { theme } = useAppTheme();

  return (
    <View className="gap-4 xl:w-[34%]">
      {data.map((item) => {
        const tone = contextToneClasses(item.tone);
        const color = contextToneColor(theme, item.tone);

        return (
          <View
            key={item.id}
            className={`rounded-[24px] border bg-app-surface px-5 py-5 ${tone.border}`}>
            <View className="flex-row items-center gap-4">
              <View className={`h-12 w-12 items-center justify-center rounded-2xl ${tone.bg}`}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={24}
                  color={color}
                />
              </View>

              <View className="min-w-0 flex-1">
                <Text className="font-display text-xl font-semibold text-app-text">
                  {item.label}
                </Text>
                <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                  {item.subtitle}
                </Text>
              </View>

              <Text className={`font-display text-lg font-semibold ${tone.text}`}>
                {item.percent}%
              </Text>
            </View>

            <View className="mt-5 h-2 overflow-hidden rounded-full bg-app-panel">
              <View
                className="h-full rounded-full"
                style={{ backgroundColor: color, width: `${item.percent}%` }}
              />
            </View>
          </View>
        );
      })}
    </View>
  );
}
