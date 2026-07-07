import { ScrollView, View } from "react-native";

import {
  CryptoAllocationCard,
  CryptoHoldingsCard,
  CryptoPortfolioHero,
  CryptoSummaryCards,
} from "@/components/wealth";
import { CRYPTO_PORTFOLIO_PAGE } from "@/constants/wealth";

export default function Wealth() {
  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <View className="relative overflow-hidden p-4 md:p-6">
          <View className="absolute -left-10 top-16 h-40 w-40 rounded-full bg-app-primary/10" />
          <View className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-app-brand/10" />

          <View className="relative gap-5">
            <CryptoPortfolioHero
              dateRange={CRYPTO_PORTFOLIO_PAGE.dateRange}
              searchPlaceholder={CRYPTO_PORTFOLIO_PAGE.searchPlaceholder}
              subtitle={CRYPTO_PORTFOLIO_PAGE.subtitle}
              title={CRYPTO_PORTFOLIO_PAGE.title}
            />
            <CryptoSummaryCards items={CRYPTO_PORTFOLIO_PAGE.stats} />

            <View className="gap-4 xl:flex-row">
              <View className="xl:flex-1">
                <CryptoHoldingsCard
                  items={CRYPTO_PORTFOLIO_PAGE.holdings.items}
                  title={CRYPTO_PORTFOLIO_PAGE.holdings.title}
                />
              </View>
              <View className="xl:w-[28%]">
                <CryptoAllocationCard
                  items={CRYPTO_PORTFOLIO_PAGE.allocation.items}
                  title={CRYPTO_PORTFOLIO_PAGE.allocation.title}
                  totalAssetsLabel={CRYPTO_PORTFOLIO_PAGE.allocation.totalAssetsLabel}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
