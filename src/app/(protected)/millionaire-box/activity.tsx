import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { TablePagination } from "@/components/common/TablePagination";
import { Colors, Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

const transactions = [
  {
    date: "Oct 24, 2023",
    mobileDate: "Oct 24, 2023 • 14:30",
    title: "Dividends: Commercial Bank PLC",
    mobileTitle: "Jar Investment",
    category: "Investments",
    amount: "+ 450,000.00",
    mobileAmount: "+LKR45.20",
  },
  {
    date: "Oct 20, 2023",
    mobileDate: "Oct 22, 2023 • 09:15",
    title: "Rental Income: Colombo 07 Penthouse",
    mobileTitle: "Stock Dividend",
    category: "Real Estate",
    amount: "+ 1,200,000.00",
    mobileAmount: "+LKR45.20",
  },
  {
    date: "Oct 18, 2023",
    mobileDate: "Oct 20, 2023 • 16:45",
    title: "Daily Fill",
    mobileTitle: "Portfolio Rebalance",
    category: "Operations",
    amount: "+ 45,200.00",
    mobileAmount: "+LKR3,000.00",
  },
  {
    date: "Oct 16, 2023",
    mobileDate: "Oct 18, 2023 • 11:20",
    title: "Cash Deposit",
    mobileTitle: "Cash Deposit",
    category: "Operations",
    amount: "+ 500.00",
    mobileAmount: "+LKR500.00",
  },
  {
    date: "Oct 15, 2023",
    mobileDate: "Oct 15, 2023 • 08:00",
    title: "Referral Bonus",
    mobileTitle: "Referral Bonus",
    category: "Income",
    amount: "+ 50.00",
    mobileAmount: "+LKR50.00",
  },
];

const activityPagination = { currentPage: 1, pageSize: 5, totalItems: 142, totalPages: 29 };

export default function MillionaireBoxActivityScreen() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 pb-24 pt-2 md:px-8 md:pb-10 lg:px-10">
        <View className="mb-7 hidden flex-row items-center justify-between gap-4 md:flex">
          <View className="flex-row items-center gap-6">
            <Text className="font-display text-2xl font-bold text-app-text">Millionaire Box</Text>
            <View className="h-9 w-80 flex-row items-center gap-3 rounded-[8px] border border-app-border bg-app-surface px-3">
              <MaterialCommunityIcons name="magnify" size={20} color={colors.textMuted} />
              <TextInput
                placeholder="Search assets..."
                placeholderTextColor={colors.textMuted}
                className="min-w-0 flex-1 font-display text-sm text-app-text outline-none"
                style={{ fontFamily: Fonts.sans }}
              />
            </View>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/millionaire-box/allocate" as Href)}
            className="h-11 flex-row items-center gap-2 rounded-[8px] bg-app-primary px-5 active:bg-app-primary-strong">
            <MaterialCommunityIcons name="cash-multiple" size={20} color="#041009" />
            <Text className="font-display text-sm font-bold text-app-primary-contrast">
              Allocate Now
            </Text>
          </Pressable>
        </View>

        <View className="mb-6 flex-row gap-2 md:hidden">
          <View className="h-14 min-w-0 flex-1 flex-row items-center gap-4 rounded-[8px] border border-app-border bg-app-bg px-4">
            <MaterialCommunityIcons name="magnify" size={25} color={colors.textMuted} />
            <TextInput
              placeholder="Search transactions..."
              placeholderTextColor={colors.textMuted}
              className="min-w-0 flex-1 font-display text-base text-app-text outline-none"
              style={{ fontFamily: Fonts.sans }}
            />
          </View>
          <Pressable className="h-14 w-14 items-center justify-center rounded-[8px] border border-app-border bg-app-bg">
            <MaterialCommunityIcons name="tune-variant" size={25} color={colors.text} />
          </Pressable>
        </View>

        <View className="mb-8 hidden flex-row items-end justify-between md:flex">
          <View>
            <Text className="font-display text-sm text-app-muted">Millionaire Box &gt; Activity</Text>
            <Text className="mt-3 font-display text-2xl font-bold text-app-text">
              Millionaire Box: Recent Activity
            </Text>
          </View>
          <View className="flex-row gap-3">
            <View className="flex-row rounded-[8px] bg-app-panel p-1">
              {["All", "Income", "Expense"].map((filter) => (
                <Pressable
                  key={filter}
                  className={`h-8 items-center justify-center rounded-[6px] px-4 ${
                    filter === "All" ? "bg-app-panel-strong" : ""
                  }`}>
                  <Text className="font-display text-sm text-app-text-muted">{filter}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable className="h-10 items-center justify-center rounded-[8px] bg-app-panel px-4">
              <Text className="font-display text-sm text-app-text">Last 30 Days</Text>
            </Pressable>
            <Pressable className="h-10 flex-row items-center gap-2 rounded-[8px] border border-app-border px-4">
              <MaterialCommunityIcons name="filter-variant" size={22} color={colors.text} />
              <Text className="font-display text-sm text-app-text">Filters</Text>
            </Pressable>
          </View>
        </View>

        <View className="hidden overflow-hidden rounded-[10px] border border-app-border bg-black md:flex">
          <View className="flex-row items-center justify-between px-6 py-7">
            <Text className="font-display text-xl font-bold text-app-text">Transaction History</Text>
            <Text className="font-display text-sm text-app-muted">ⓘ Displaying 142 records</Text>
          </View>
          <View className="flex-row border-y border-app-border px-6 py-4">
            {["Date", "Activity Description", "Category", "Amount (LKR)"].map((heading, index) => (
              <Text
                key={heading}
                className={`font-display text-xs font-bold uppercase tracking-[1.4px] text-app-muted ${
                  index === 0 ? "w-[18%]"
                  : index === 1 ? "w-[44%]"
                  : index === 2 ? "w-[18%]"
                  : "w-[20%] text-right"
                }`}>
                {heading}
              </Text>
            ))}
          </View>
          {transactions.slice(0, 3).map((transaction) => (
            <View key={transaction.title} className="flex-row items-center border-b border-app-border px-6 py-5">
              <Text className="w-[18%] font-display text-sm font-bold text-app-muted">
                {transaction.date}
              </Text>
              <Text className="w-[44%] font-display text-base font-bold text-app-text">
                {transaction.title}
              </Text>
              <View className="w-[18%]">
                <View className="self-start rounded-[4px] bg-app-panel px-2 py-1">
                  <Text className="font-display text-[10px] font-bold uppercase text-app-muted">
                    {transaction.category}
                  </Text>
                </View>
              </View>
              <Text className="w-[20%] text-right font-display text-xl font-bold text-app-primary-strong">
                {transaction.amount}
              </Text>
            </View>
          ))}
          <TablePagination {...activityPagination} />
        </View>

        <View className="gap-3 md:hidden">
          {transactions.map((transaction) => (
            <View
              key={transaction.mobileTitle}
              className="min-h-[76px] flex-row items-center justify-between rounded-[10px] border border-app-border bg-black px-4">
              <View className="min-w-0 flex-1">
                <Text className="font-display text-lg font-bold text-app-text">
                  {transaction.mobileTitle}
                </Text>
                <Text className="mt-1 font-display text-sm text-app-muted">{transaction.mobileDate}</Text>
              </View>
              <Text className="font-display text-base font-bold text-app-primary-strong">
                {transaction.mobileAmount}
              </Text>
            </View>
          ))}
          <View className="mt-6">
            <TablePagination {...activityPagination} />
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/millionaire-box/allocate" as Href)}
          className="absolute bottom-6 right-6 h-16 w-16 items-center justify-center rounded-full bg-app-primary shadow-showcase-phone active:bg-app-primary-strong md:hidden">
          <MaterialCommunityIcons name="plus" size={31} color="#041009" />
        </Pressable>
      </View>
    </ScrollView>
  );
}
