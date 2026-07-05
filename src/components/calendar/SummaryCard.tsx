import { Text, View } from "react-native";

export function SummaryCard({
  accentClassName,
  label,
  value,
}: {
  accentClassName: string;
  label: string;
  value: string;
}) {
  return (
    <View className="w-full flex-1 gap-4 rounded-[24px] border border-app-border bg-app-panel/30 px-5 py-5 md:min-w-[12rem]">
      <Text className="font-display text-sm font-semibold uppercase tracking-[1.4px] text-app-muted">
        {label}
      </Text>
      <Text
        className={`font-display text-2xl font-semibold tracking-tight md:text-3xl ${accentClassName}`}>
        {value}
      </Text>
      <View className="h-1.5 w-24 rounded-full bg-app-border">
        <View className={`h-1.5 rounded-full ${accentClassName.replace("text-", "bg-")}`} />
      </View>
    </View>
  );
}
