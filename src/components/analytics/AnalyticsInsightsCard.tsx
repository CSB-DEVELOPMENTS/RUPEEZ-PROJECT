import { Text, View } from "react-native";

export function AnalyticsInsightsCard() {
  return (
    <View className="relative min-h-[285px] overflow-hidden rounded-[30px] border border-app-border bg-app-surface p-6 shadow-showcase-soft dark:shadow-showcase-soft-dark">
      <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">Insights</Text>
      <Text className="mt-5 max-w-[18rem] font-display text-lg leading-8 text-app-text lg:text-xl">
        You spent <Text className="font-semibold text-app-primary">25% more</Text> on Food & Dining
        compared to last month.
      </Text>
      <View className="mt-5 self-start rounded-2xl bg-app-panel px-5 py-3">
        <Text className="font-display text-base font-semibold text-app-text">View Analysis</Text>
      </View>
      <View className="absolute -bottom-12 -right-10 h-40 w-56 rounded-[80px] bg-app-primary/55" />
      <View className="absolute -bottom-14 left-0 h-24 w-40 rounded-[60px] bg-app-primary/35" />
    </View>
  );
}
