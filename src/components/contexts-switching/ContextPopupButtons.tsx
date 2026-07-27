import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text } from "react-native";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type ContextPopupButtonProps = {
  disabled?: boolean;
  icon?: string;
  label: string;
  onPress?: () => void;
  tone?: "danger" | "ghost" | "outline" | "primary";
};

export function ContextPopupButton({
  disabled = false,
  icon,
  label,
  onPress,
  tone = "primary",
}: ContextPopupButtonProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const isPrimary = tone === "primary";
  const isDanger = tone === "danger";
  const isGhost = tone === "ghost";
  const containerClass =
    isPrimary ? "border-app-primary bg-app-primary"
    : isDanger ? "border-app-danger bg-app-danger"
    : isGhost ? "border-transparent bg-transparent"
    : "border-app-border bg-transparent";
  const textClass =
    isPrimary ? "text-app-primary-contrast"
    : isDanger ? "text-app-primary-contrast"
    : isGhost ? "text-app-muted"
    : "text-app-text";
  const iconColor =
    isPrimary || isDanger ? colors.primaryContrast
    : isGhost ? colors.textMuted
    : colors.text;

  return (
    <Pressable
      className={`min-h-12 flex-row items-center justify-center gap-2 rounded-2xl border px-5 py-3 ${containerClass} ${
        disabled ? "opacity-60" : ""
      }`}
      disabled={disabled}
      onPress={onPress}>
      <Text className={`font-display text-base font-semibold ${textClass}`}>{label}</Text>
      {icon ? <MaterialCommunityIcons name={icon as never} size={20} color={iconColor} /> : null}
    </Pressable>
  );
}
