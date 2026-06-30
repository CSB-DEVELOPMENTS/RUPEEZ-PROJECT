import { Text, View } from 'react-native';

type FeatureListProps = {
  items: string[];
};

export function FeatureList({ items }: FeatureListProps) {
  return (
    <View className="gap-4">
      {items.map((item) => (
        <View key={item} className="flex-row items-center gap-4">
          <View className="h-6 w-6 items-center justify-center rounded-full bg-app-primary-muted">
            <View className="h-2.5 w-2.5 rounded-full bg-app-primary" />
          </View>
          <Text className="font-display text-xl leading-7 text-app-text">{item}</Text>
        </View>
      ))}
    </View>
  );
}
