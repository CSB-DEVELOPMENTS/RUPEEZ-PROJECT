import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import { WealthCard } from "./WealthCard";

export function MetricCard({
  className = "",
  icon,
  iconClassName,
  label,
  sublabel,
  value,
  valueClassName,
}: {
  className?: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  iconClassName: string;
  label: string;
  sublabel?: string;
  value: string;
  valueClassName: string;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <WealthCard className={`min-h-[112px] justify-center ${className}`}>
      <View className="flex-row items-center justify-between gap-4">
        <View className="gap-2">
          <Text className="font-display text-xs font-medium uppercase tracking-[1.6px] text-app-muted">
            {label}
          </Text>
          <Text className={`font-display text-2xl font-bold tracking-tight ${valueClassName}`}>
            {value}
          </Text>
          {sublabel ? (
            <Text className="font-display text-xs text-app-muted">{sublabel}</Text>
          ) : null}
        </View>
        <View className={`h-12 w-12 items-center justify-center rounded-full ${iconClassName}`}>
          <MaterialCommunityIcons
            name={icon}
            size={25}
            color={valueClassName.includes("danger") ? colors.danger : colors.primary}
          />
        </View>
      </View>
    </WealthCard>
  );
}
