import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import { Pressable, Text, View } from "react-native";

type ThemeToggleProps = {
  compact?: boolean;
};

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, setTheme } = useAppTheme();

  if (compact) {
    const nextTheme = theme === "light" ? "dark" : "light";

    return (
      <Pressable
        accessibilityRole="switch"
        accessibilityLabel="Toggle color theme"
        accessibilityState={{ checked: theme === "dark" }}
        onPress={() => setTheme(nextTheme)}
        className="h-11 w-11 items-center justify-center rounded-full bg-app-panel active:opacity-80">
        <MaterialCommunityIcons
          name={theme === "dark" ? "weather-night" : "white-balance-sunny"}
          size={20}
          color={theme === "dark" ? "#F8FFFA" : "#0B7D37"}
        />
      </Pressable>
    );
  }

  return (
    <View className="flex-row rounded-full border border-app-border bg-app-surface p-1">
      {(["light", "dark"] as const).map((mode) => {
        const active = mode === theme;

        return (
          <Pressable
            key={mode}
            className={active ? "rounded-full bg-app-panel px-4 py-2" : "rounded-full px-4 py-2"}
            onPress={() => setTheme(mode)}>
            <Text
              className={
                active
                  ? "font-display text-sm font-medium capitalize text-app-text"
                  : "font-display text-sm capitalize text-app-muted"
              }>
              {mode}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
