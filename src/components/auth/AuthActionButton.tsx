import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import { ActivityIndicator, Pressable, Text } from "react-native";

type AuthActionButtonProps = {
  children: string;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  variant?: "primary" | "secondary";
};

export function AuthActionButton({
  children,
  disabled,
  loading,
  onPress,
  variant = "primary",
}: AuthActionButtonProps) {
  const { theme } = useAppTheme();
  const primary = variant === "primary";

  return (
    <Pressable
      className={
        primary
          ? "min-h-16 items-center justify-center rounded-2xl bg-app-primary px-6 py-4"
          : "min-h-16 items-center justify-center rounded-2xl border border-app-border bg-app-surface px-6 py-4"
      }
      disabled={disabled || loading}
      onPress={onPress}
      style={{ opacity: disabled || loading ? 0.55 : 1 }}>
      {loading ? (
        <ActivityIndicator
          className=""
          color={primary ? Colors[theme].primaryContrast : Colors[theme].text}
        />
      ) : (
        <Text
          className={
            primary
              ? "font-display text-xl font-semibold text-app-primary-contrast"
              : "font-display text-xl font-semibold text-app-text"
          }>
          {children}
        </Text>
      )}
    </Pressable>
  );
}
