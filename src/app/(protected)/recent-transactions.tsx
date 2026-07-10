import { ScrollView, View } from "react-native";

import {
  TransactionsFilters,
  TransactionsHero,
  TransactionsTable,
} from "@/components/transactions";
import { RECENT_TRANSACTIONS_PAGE } from "@/constants/dashboard";

export default function RecentTransactionsScreen() {
  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <View className="relative overflow-hidden p-4 md:p-6">
          <View className="absolute -left-10 top-16 h-40 w-40 rounded-full bg-app-primary/10" />
          <View className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-app-brand/10" />

          <View className="relative gap-5">
            <TransactionsHero
              dateRange={RECENT_TRANSACTIONS_PAGE.dateRange}
              searchPlaceholder={RECENT_TRANSACTIONS_PAGE.searchPlaceholder}
              subtitle={RECENT_TRANSACTIONS_PAGE.subtitle}
              title={RECENT_TRANSACTIONS_PAGE.title}
            />
            <TransactionsFilters filters={RECENT_TRANSACTIONS_PAGE.filters} />
            <TransactionsTable
              pagination={RECENT_TRANSACTIONS_PAGE.pagination}
              transactions={RECENT_TRANSACTIONS_PAGE.transactions}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
