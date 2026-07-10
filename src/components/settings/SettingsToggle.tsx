import { Text, View } from "react-native";

type SettingsToggleProps = {
  description?: string;
  enabled: boolean;
  label: string;
  variant?: "card" | "row";
};

export function SettingsToggle({
  description,
  enabled,
  label,
  variant = "row",
}: SettingsToggleProps) {
  const baseTrack = enabled ? "bg-app-primary" : "bg-app-border";
  const baseThumb = enabled ? "ml-auto bg-app-primary-contrast" : "mr-auto bg-app-surface";

  return (
    <View
      className={
        variant === "card" ?
          "min-h-[5rem] flex-1 rounded-[20px] border border-app-border bg-app-surface px-4 py-4"
        : "flex-row items-start gap-4 py-2"
      }>
      <View className="flex-1 gap-1">
        <Text className="font-display text-lg font-medium text-app-text">{label}</Text>
        {description ? (
          <Text className="font-display text-base leading-6 text-app-muted">{description}</Text>
        ) : null}
      </View>
      <View className={`mt-1 h-8 w-14 rounded-full px-1 py-1 ${baseTrack}`}>
        <View className={`h-6 w-6 rounded-full ${baseThumb}`} />
      </View>
    </View>
  );
}
