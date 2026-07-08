import { ScrollView, View } from "react-native";

import {
  SubscriptionListCard,
  SubscriptionSummaryCard,
  SubscriptionsHero,
} from "@/components/subscriptions";
import { ACTIVE_SUBSCRIPTIONS_PAGE } from "@/constants/dashboard";

export default function SubscriptionsScreen() {
  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <View className="relative overflow-hidden p-4 md:p-6">
          <View className="absolute -left-10 top-16 h-40 w-40 rounded-full bg-app-primary/10" />
          <View className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-app-brand/10" />

          <View className="relative gap-5">
            <SubscriptionsHero
              dateRange={ACTIVE_SUBSCRIPTIONS_PAGE.dateRange}
              searchPlaceholder={ACTIVE_SUBSCRIPTIONS_PAGE.searchPlaceholder}
              subtitle={ACTIVE_SUBSCRIPTIONS_PAGE.subtitle}
              title={ACTIVE_SUBSCRIPTIONS_PAGE.title}
            />

            <View className="gap-4 xl:flex-row">
              {ACTIVE_SUBSCRIPTIONS_PAGE.summaryCards.map((item) => (
                <View key={item.id} className="xl:flex-1">
                  <SubscriptionSummaryCard data={item} />
                </View>
              ))}
            </View>

            <View className="mx-[-8px] flex-row flex-wrap">
              {ACTIVE_SUBSCRIPTIONS_PAGE.subscriptions.map((item) => (
                <View key={item.id} className="w-full p-2 xl:w-1/3">
                  <SubscriptionListCard data={item} />
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
