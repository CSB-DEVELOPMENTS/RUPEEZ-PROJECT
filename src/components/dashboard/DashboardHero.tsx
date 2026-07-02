import { Text, View } from "react-native";

type DashboardHeroProps = {
  dateRange: string;
  greeting: string;
  overview: string;
};

export function DashboardHero({ dateRange, greeting, overview }: DashboardHeroProps) {
  return (
    <View className="gap-5">
      <View className="gap-4 lg:flex-row lg:items-start lg:justify-between">
        <View className="max-w-2xl gap-2">
          <Text className="font-display text-4xl font-semibold tracking-tight text-app-text md:text-5xl">
            {greeting}
          </Text>
          <Text className="font-display text-lg leading-7 text-app-muted md:text-xl">
            {overview}
          </Text>
        </View>

        <View className="gap-3 md:flex-row md:items-center">
          <View className="rounded-[22px] border border-app-border bg-app-surface px-5 py-4">
            <Text className="font-display text-lg text-app-text">{dateRange}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
