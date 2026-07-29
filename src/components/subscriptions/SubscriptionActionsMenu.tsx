import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type SubscriptionActionsMenuProps = { visible: boolean; onDelete: () => void; onEdit: () => void };

export function SubscriptionActionsMenu({
  visible,
  onDelete,
  onEdit,
}: SubscriptionActionsMenuProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  if (!visible) {
    return null;
  }

  return (
    <View className="absolute right-0 top-12 z-20 w-40 rounded-[24px] border border-app-border bg-app-surface p-2 shadow-showcase-soft">
      <Pressable
        className="flex-row items-center gap-3 rounded-2xl px-4 py-3 hover:bg-app-panel"
        onPress={onEdit}>
        <MaterialCommunityIcons color={colors.text} name="pencil-outline" size={18} />
        <Text className="font-display text-base font-semibold text-app-text hover:bg-app-surface">
          Edit
        </Text>
      </Pressable>

      <Pressable
        className="flex-row items-center gap-3 rounded-2xl px-4 py-3 hover:bg-app-panel"
        onPress={onDelete}>
        <MaterialCommunityIcons color={colors.danger} name="trash-can-outline" size={18} />
        <Text className="font-display text-base font-semibold text-app-danger">Delete</Text>
      </Pressable>
    </View>
  );
}
