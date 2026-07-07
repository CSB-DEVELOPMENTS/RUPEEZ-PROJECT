import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { TablePagination } from "@/components/common/TablePagination";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { CashFlowEntryIcon, DashboardTransaction } from "@/types/dashboard";
import { formatTransactionAmount, transactionToneClass } from "../cash-flow/TransactionCard";

type TransactionsTableProps = {
  pagination: { currentPage: number; pageSize: number; totalItems: number; totalPages: number };
  transactions: DashboardTransaction[];
};

function iconAccent(
  tone: DashboardTransaction["tone"],
  colors: (typeof Colors)[keyof typeof Colors],
) {
  switch (tone) {
    case "income":
      return { bg: "bg-app-primary/15", color: colors.primary };
    case "expense":
      return { bg: "bg-app-danger/10", color: colors.danger };
    default:
      return { bg: "bg-app-panel", color: colors.textSoft };
  }
}

function transactionIconName(icon?: CashFlowEntryIcon) {
  switch (icon) {
    case "briefcase":
      return "briefcase-outline";
    case "cart":
      return "cart-outline";
    case "car":
      return "car-outline";
    case "bank":
      return "bank-outline";
    case "transfer":
      return "swap-horizontal";
    case "food":
      return "silverware-fork-knife";
    case "home":
      return "home-outline";
    case "chart":
      return "chart-line";
    case "crypto":
      return "currency-btc";
    case "invoice":
      return "file-document-outline";
    case "bill":
      return "receipt-text-outline";
    default:
      return "swap-horizontal";
  }
}

function TransactionsTableRow({ item }: { item: DashboardTransaction }) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const accent = iconAccent(item.tone, colors);

  return (
    <View className="border-t border-app-border px-5 py-4 md:px-6 md:py-5">
      <View className="gap-4 md:flex-row md:items-center">
        <View className="min-w-0 md:w-[28%]">
          <View className="flex-row items-center gap-3">
            <View className={`h-12 w-12 items-center justify-center rounded-2xl ${accent.bg}`}>
              <MaterialCommunityIcons
                name={transactionIconName(item.icon)}
                size={20}
                color={accent.color}
              />
            </View>
            <Text className="flex-1 font-display text-lg font-semibold text-app-text md:text-xl">
              {item.title}
            </Text>
          </View>
        </View>
        <Text className="font-display text-base text-app-muted md:w-[16%]">{item.category}</Text>
        <Text className="font-display text-base text-app-muted md:w-[16%]">{item.date}</Text>
        <Text className="font-display text-base text-app-muted md:w-[20%]">{item.account}</Text>
        <Text
          className={`font-display text-right text-xl font-semibold md:w-[20%] ${transactionToneClass(item.tone)}`}>
          {formatTransactionAmount(item.tone, item.amount)}
        </Text>
      </View>
    </View>
  );
}

export function TransactionsTable({ pagination, transactions }: TransactionsTableProps) {
  return (
    <DashboardCard className="overflow-hidden p-0">
      <View className="hidden border-b border-app-border px-6 py-4 md:flex md:flex-row md:items-center">
        <Text className="font-display text-xs font-semibold uppercase  text-app-muted md:w-[28%]">
          Transaction
        </Text>
        <Text className="font-display text-xs font-semibold uppercase text-app-muted md:w-[16%]">
          Category
        </Text>
        <Text className="font-display text-xs font-semibold uppercase text-app-muted md:w-[16%]">
          Date
        </Text>
        <Text className="font-display text-xs font-semibold uppercase text-app-muted md:w-[20%]">
          Account
        </Text>
        <Text className="font-display text-right text-xs font-semibold uppercase text-app-muted md:w-[20%]">
          Amount
        </Text>
      </View>

      <View>
        {transactions.map((item) => (
          <TransactionsTableRow key={item.id} item={item} />
        ))}
      </View>

      <TablePagination {...pagination} />
    </DashboardCard>
  );
}
