import { Text, View } from "react-native";

type AnalyticsFlowHeroProps = { subtitle: string; title: string };

export function AnalyticsFlowHero({ subtitle, title }: AnalyticsFlowHeroProps) {
  return (
    <View className="max-w-4xl gap-2">
      <Text className="font-display text-3xl font-semibold tracking-tight text-app-text md:text-5xl">
        {title}
      </Text>
      <Text className="font-display text-lg leading-7 text-app-muted md:text-xl">{subtitle}</Text>
    </View>
  );
}
