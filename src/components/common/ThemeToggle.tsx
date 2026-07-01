import { useAppTheme } from "@/hooks/theme/useAppTheme";
import { Pressable, Text, View } from "react-native";

type ThemeToggleProps = {
  theme: "light" | "dark";
  onChange: (theme: "light" | "dark") => void;
};

export function ThemeToggle() {
  const { theme, setTheme } = useAppTheme();

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
