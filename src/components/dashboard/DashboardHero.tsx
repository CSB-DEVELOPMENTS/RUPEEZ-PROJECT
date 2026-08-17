import { Text, View } from "react-native";

type DashboardHeroProps = { dateRange: string; userName: string };

export function DashboardHero({ dateRange, userName }: DashboardHeroProps) {
  return (
    <View className="gap-5">
      <View className="gap-4 lg:flex-row lg:items-start lg:justify-between">
        <View className="max-w-2xl gap-2">
          <Text className="font-display text-4xl font-semibold tracking-tight text-app-text md:text-5xl">
            Good morning, {userName}!
          </Text>
          <Text className="font-display text-lg leading-7 text-app-muted md:text-xl">
            {`Here's your financial overview for the last 30 days.`}
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
