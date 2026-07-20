import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { ContextCreateOption } from "@/types/contexts-switching";

import { contextToneClasses, contextToneColor } from "../contexts-switching/contextTone";
import { ContextPopupButton } from "./ContextPopupButtons";
import { ContextPopupShell } from "./ContextPopupShell";

type ContextTypePopupProps = {
  data: ContextCreateOption[];
  onBack: () => void;
  onClose: () => void;
  onNext: () => void;
  onSelect: (id: string) => void;
  selectedId: string;
  visible: boolean;
};

export function ContextTypePopup({
  data,
  onBack,
  onClose,
  onNext,
  onSelect,
  selectedId,
  visible,
}: ContextTypePopupProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <ContextPopupShell visible={visible} onClose={onClose} maxWidthClassName="max-w-lg">
      <View className="border-b border-app-border px-6 py-5">
        <View className="flex-row items-center justify-between">
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} onPress={onBack} />
          <View className="items-center">
            <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
              New Context
            </Text>
            <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
              Step 1 of 2
            </Text>
          </View>
          <MaterialCommunityIcons name="close" size={24} color={colors.text} onPress={onClose} />
        </View>
      </View>

      <View className="gap-6 p-6">
        <Text className="font-display text-2xl font-semibold tracking-tight text-app-primary">
          What type of context?
        </Text>

        <View className="gap-4">
          {data.map((option) => {
            const tone = contextToneClasses(option.tone);
            const color = contextToneColor(theme, option.tone);
            const isSelected = option.id === selectedId;

            return (
              <Pressable
                key={option.id}
                className={`min-h-20 flex-row items-center gap-4 rounded-2xl border px-4 py-3 ${
                  isSelected ? "border-app-primary bg-app-primary/10" : "border-app-border bg-app-panel/45"
                }`}
                onPress={() => onSelect(option.id)}>
                <View className={`h-12 w-12 items-center justify-center rounded-xl ${tone.bg}`}>
                  <MaterialCommunityIcons name={option.icon} size={24} color={color} />
                </View>
                <View className="min-w-0 flex-1">
                  <Text className="font-display text-base font-semibold text-app-text">
                    {option.label}
                  </Text>
                  <Text className="font-display text-base leading-6 text-app-muted">
                    {option.description}
                  </Text>
                </View>
                <View
                  className={`h-5 w-5 rounded-full border-2 ${
                    isSelected ? "border-app-primary bg-app-primary" : "border-app-border"
                  }`}
                />
              </Pressable>
            );
          })}
        </View>

        <ContextPopupButton label="Next" icon="arrow-right" onPress={onNext} />
      </View>
    </ContextPopupShell>
  );
}
