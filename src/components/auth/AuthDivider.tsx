import { Text, View } from 'react-native';

type AuthDividerProps = {
  label: string;
};

export function AuthDivider({ label }: AuthDividerProps) {
  return (
    <View className="flex-row items-center gap-4">
      <View className="h-px flex-1 bg-app-border" />
      <Text className="font-display text-sm font-semibold uppercase tracking-[2px] text-app-soft">
        {label}
      </Text>
      <View className="h-px flex-1 bg-app-border" />
    </View>
  );
}
