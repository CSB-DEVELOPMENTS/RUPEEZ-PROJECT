import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

export function PerformanceTile({
  icon,
  label,
  note,
  value,
}: {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  label: string;
  note: string;
  value: string;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="flex-1 rounded-[10px] border border-app-border bg-app-panel px-4 py-5">
      <Text className="font-display text-xs font-semibold uppercase text-app-muted">{label}</Text>
      <View className="mt-4 flex-row items-center gap-3">
        <View className="h-9 w-9 items-center justify-center rounded-[8px] bg-app-primary-muted">
          <MaterialCommunityIcons name={icon} size={19} color={colors.primary} />
        </View>
        <View>
          <Text className="font-display text-2xl font-bold text-app-text">{value}</Text>
          <Text className="font-display text-xs text-app-primary">{note}</Text>
        </View>
      </View>
    </View>
  );
}
