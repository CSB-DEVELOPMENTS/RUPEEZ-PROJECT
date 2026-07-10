import { ScrollView, View } from "react-native";

import {
  CategoryBreakdownCard,
  CategoryDistributionCard,
  CategoryInsightCard,
  TopCategoriesHero,
} from "@/components/analytics";
import { TOP_CATEGORIES_PAGE } from "@/constants/analytics";

export default function Analytics() {
  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <View className="relative overflow-hidden p-4 md:p-6">
          <View className="absolute -left-10 top-16 h-40 w-40 rounded-full bg-app-primary/10" />
          <View className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-app-brand/10" />

          <View className="relative gap-5">
            <TopCategoriesHero
              dateRange={TOP_CATEGORIES_PAGE.dateRange}
              searchPlaceholder={TOP_CATEGORIES_PAGE.searchPlaceholder}
              subtitle={TOP_CATEGORIES_PAGE.subtitle}
              summaryLabel={TOP_CATEGORIES_PAGE.summaryLabel}
              summaryValue={TOP_CATEGORIES_PAGE.summaryValue}
              title={TOP_CATEGORIES_PAGE.title}
            />

            <View className="gap-4 xl:flex-row">
              <CategoryDistributionCard
                exportLabel={TOP_CATEGORIES_PAGE.distribution.exportLabel}
                items={TOP_CATEGORIES_PAGE.distribution.items}
                title={TOP_CATEGORIES_PAGE.distribution.title}
              />

              <View className="gap-4 xl:w-[30%]">
                {TOP_CATEGORIES_PAGE.insights.map((item) => (
                  <CategoryInsightCard key={item.caption} data={item} />
                ))}
              </View>
            </View>

            <CategoryBreakdownCard items={TOP_CATEGORIES_PAGE.distribution.items} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
