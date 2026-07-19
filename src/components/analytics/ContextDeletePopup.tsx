import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { ContextSummary } from "@/types/contexts-switching";

import { ContextPopupButton } from "./ContextPopupButtons";
import { ContextPopupShell } from "./ContextPopupShell";

type ContextDeletePopupProps = {
  data: ContextSummary | null;
  onCancel: () => void;
  onConfirm: () => void;
  visible: boolean;
};

export function ContextDeletePopup({ data, onCancel, onConfirm, visible }: ContextDeletePopupProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <ContextPopupShell visible={visible} onClose={onCancel} maxWidthClassName="max-w-md">
      <View className="items-center gap-6 p-8">
        <View className="h-16 w-16 items-center justify-center rounded-full border border-app-danger/40 bg-app-danger/15">
          <MaterialCommunityIcons name="trash-can-outline" size={34} color={colors.danger} />
        </View>

        <View className="items-center gap-3">
          <Text className="text-center font-display text-2xl font-semibold tracking-tight text-app-text">
            Delete Context?
          </Text>
          <Text className="text-center font-display text-base leading-7 text-app-muted">
            Are you sure you want to delete {data?.label ?? "this context"}? All associated
            transaction data and history will be permanently removed. This action cannot be undone.
          </Text>
        </View>

        <View className="w-full gap-3">
          <ContextPopupButton label="Delete Context" tone="danger" onPress={onConfirm} />
          <ContextPopupButton label="Cancel" tone="outline" onPress={onCancel} />
        </View>
      </View>
    </ContextPopupShell>
  );
}
