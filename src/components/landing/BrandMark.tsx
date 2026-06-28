import { Text, View } from 'react-native';

export function BrandMark() {
  return (
    <View className="flex-row items-center gap-3">
      <View className="h-10 w-10 items-center justify-center rounded-xl bg-app-primary-muted">
        <View className="h-6 w-6 rounded-lg bg-app-primary">
          <View className="absolute left-[5px] top-[5px] h-2 w-3 rounded-sm bg-app-primary-contrast" />
          <View className="absolute right-[4px] top-[8px] h-1.5 w-1.5 rounded-full bg-app-primary-contrast" />
        </View>
      </View>
      <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">Rupeez</Text>
    </View>
  );
}
