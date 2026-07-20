import { useState } from "react";
import { ScrollView, View } from "react-native";

import SectionHeader from "@/components/dashboard/SectionHeader";
import {
  EditSubscriptionModal,
  SubscriptionListCard,
  SubscriptionSummaryCard,
  SubscriptionsHero,
} from "@/components/subscriptions";
import { ACTIVE_SUBSCRIPTIONS_PAGE } from "@/constants/dashboard";
import type { ActiveSubscriptionItem } from "@/types/dashboard";

export default function SubscriptionsScreen() {
  const [subscriptions, setSubscriptions] = useState(ACTIVE_SUBSCRIPTIONS_PAGE.subscriptions);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [editingSubscription, setEditingSubscription] = useState<ActiveSubscriptionItem | null>(
    null,
  );

  return (
    <>
      <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="mx-auto w-full px-4 md:px-8 lg:px-10">
          <View className="relative overflow-visible p-4 md:p-6">
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

              <View className="pt-5 md:pt-6">
                <SectionHeader title="Subscriptions" />
              </View>

              <View className="mx-[-8px] flex-row flex-wrap">
                {subscriptions.map((item) => (
                  <View
                    key={item.id}
                    className={`w-full p-2 xl:w-1/3 ${activeMenuId === item.id ? "z-50" : "z-0"}`}>
                    <SubscriptionListCard
                      data={item}
                      isMenuOpen={activeMenuId === item.id}
                      onDelete={(subscription) => {
                        setActiveMenuId((current) =>
                          current === subscription.id ? null : current,
                        );
                        setSubscriptions((current) =>
                          current.filter((entry) => entry.id !== subscription.id),
                        );
                      }}
                      onEdit={(subscription) => setEditingSubscription(subscription)}
                      onMenuClose={() => setActiveMenuId(null)}
                      onMenuToggle={() =>
                        setActiveMenuId((current) => (current === item.id ? null : item.id))
                      }
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <EditSubscriptionModal
        subscription={editingSubscription}
        visible={editingSubscription !== null}
        onClose={() => setEditingSubscription(null)}
        onSave={(subscription) => {
          setSubscriptions((current) =>
            current.map((entry) => (entry.id === subscription.id ? subscription : entry)),
          );
          setEditingSubscription(null);
        }}
      />
    </>
  );
}
