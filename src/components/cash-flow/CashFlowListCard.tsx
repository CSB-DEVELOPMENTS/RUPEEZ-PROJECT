import { Text, View } from "react-native";

import type { DashboardTransaction, DashboardTransactionTone } from "@/types/dashboard";
import { DashboardCard } from "../dashboard/DashboardCard";
import { TransactionCard, transactionToneClass } from "./TransactionCard";

function listDirectionLabel(tone: DashboardTransactionTone) {
  return tone === "income" ? "+" : "-";
}

export function CashFlowListCard({
  title,
  tone,
  data,
}: {
  title: string;
  tone: DashboardTransactionTone;
  data: DashboardTransaction[];
}) {
  return (
    <DashboardCard>
      <View className="mb-5 flex-row items-center gap-3">
        <Text className={`font-display text-2xl font-semibold ${transactionToneClass(tone)}`}>
          {listDirectionLabel(tone)}
        </Text>
        <Text className="text-2xl font-semibold text-app-text md:text-3xl">{title}</Text>
      </View>

      <View className="flex flex-col gap-3">
        {data.map((item) => (
          <TransactionCard key={item.id} item={item} />
        ))}
      </View>
    </DashboardCard>
  );
}
