import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable } from "react-native";

import type { IconName } from "@/types/social-finance";

type SocialFinanceHeaderButtonProps = {
  icon: IconName;
  onPress?: () => void;
  tone?: "neutral" | "accent";
};

export function SocialFinanceHeaderButton({
  icon,
  onPress,
  tone = "neutral",
}: SocialFinanceHeaderButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={
        tone === "accent"
          ? "h-11 w-11 items-center justify-center rounded-2xl bg-app-primary text-app-primary-contrast active:opacity-90"
          : "h-11 w-11 items-center justify-center rounded-2xl border border-app-border bg-app-surface active:bg-app-panel"
      }>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={tone === "accent" ? "#F8FFFA" : "#767A86"}
      />
    </Pressable>
  );
}
