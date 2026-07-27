import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { ContextSummary } from "@/types/contexts-switching";

import { ContextPopupButton } from "./ContextPopupButtons";
import { ContextPopupShell } from "./ContextPopupShell";
import { contextToneClasses, contextToneColor } from "./contextTone";

type ContextManagePopupProps = {
  data: ContextSummary[];
  onClose: () => void;
  onCreate: () => void;
  onDelete: (context: ContextSummary) => void;
  onEdit: (context: ContextSummary) => void;
  visible: boolean;
};

export function ContextManagePopup({
  data,
  onClose,
  onCreate,
  onDelete,
  onEdit,
  visible,
}: ContextManagePopupProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <ContextPopupShell visible={visible} onClose={onClose} maxWidthClassName="max-w-lg">
      <View className="gap-6 p-6 md:p-7">
        <View className="flex-row items-start justify-between gap-4">
          <View className="gap-5">
            <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
              Manage Profiles
            </Text>
            <Text className="font-display text-base leading-6 text-app-muted">
              Reorder or delete your profiles.
            </Text>
          </View>

          <MaterialCommunityIcons
            name="close"
            size={24}
            color={colors.textMuted}
            onPress={onClose}
          />
        </View>

        <ScrollView className="max-h-[460px]" showsVerticalScrollIndicator={false}>
          <View className="gap-3">
            {data.map((context) => {
              const tone = contextToneClasses(context.tone);
              const color = context.primaryColor ?? contextToneColor(theme, context.tone);

              return (
                <View
                  key={context.id}
                  className="min-h-16 flex-row items-center gap-4 rounded-2xl border border-app-border bg-app-panel/45 px-4 py-3">
                  <MaterialCommunityIcons name="drag-vertical" size={22} color={colors.textSoft} />
                  <View className={`h-10 w-10 items-center justify-center rounded-xl ${tone.bg}`}>
                    <MaterialCommunityIcons name={context.icon} size={22} color={color} />
                  </View>
                  <Text className="min-w-0 flex-1 font-display text-base text-app-text">
                    {context.label}
                  </Text>
                  <MaterialCommunityIcons
                    name="pencil"
                    size={22}
                    color={colors.text}
                    onPress={() => onEdit(context)}
                  />
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={22}
                    color={colors.danger}
                    onPress={() => onDelete(context)}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <View className="border-t border-app-border bg-app-surface px-6 py-5 md:px-7">
        <ContextPopupButton label="New Profile" icon="plus" onPress={onCreate} />
      </View>
    </ContextPopupShell>
  );
}
