import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Href, useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type SettingsActionButtonProps = {
  href?: Href;
  icon?: string;
  label: string;
  tone?: "danger" | "outline" | "primary" | "secondary";
};

function buttonToneClass(tone: NonNullable<SettingsActionButtonProps["tone"]>) {
  switch (tone) {
    case "danger":
      return {
        container: "border-app-danger/50 bg-app-danger/5",
        text: "text-app-danger",
      };
    case "outline":
      return {
        container: "border-app-border bg-transparent",
        text: "text-app-text",
      };
    case "secondary":
      return {
        container: "border-transparent bg-transparent px-0 py-0",
        text: "text-app-primary",
      };
    default:
      return {
        container: "border-app-primary bg-app-primary",
        text: "text-app-primary-contrast",
      };
  }
}

export function SettingsActionButton({
  href,
  icon,
  label,
  tone = "primary",
}: SettingsActionButtonProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const toneClasses = buttonToneClass(tone);
  const iconColor =
    tone === "primary" ? colors.primaryContrast
    : tone === "danger" ? colors.danger
    : tone === "secondary" ? colors.primary
    : colors.text;

  return (
    <Pressable
      className={`min-h-12 flex-row items-center justify-center gap-2 rounded-2xl border px-5 py-3 ${toneClasses.container}`}
      onPress={href ? () => router.push(href) : undefined}>
      {icon ? <MaterialCommunityIcons color={iconColor} name={icon as never} size={18} /> : null}
      <Text className={`font-display text-base font-semibold ${toneClasses.text}`}>{label}</Text>
      {tone === "secondary" ? (
        <MaterialCommunityIcons color={iconColor} name="chevron-right" size={18} />
      ) : null}
    </Pressable>
  );
}
