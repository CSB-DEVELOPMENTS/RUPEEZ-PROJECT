import type { DashboardTransaction, DashboardTransactionTone } from "@/types/dashboard";
import { Text, useWindowDimensions, View } from "react-native";
import { formatTransactionAmount } from "../dashboard/DashboardSections";

export function listToneColor(tone: DashboardTransactionTone) {
  return tone === "income" ? "text-app-primary" : "text-app-danger";
}

export default function TransactionCard({ item }: { item: DashboardTransaction }) {
  const { width } = useWindowDimensions();
  const isCompact = width < 480;
  const metadata = [item.category, item.date, item.time].filter(Boolean).join(" - ");

  return (
    <View
      className={`rounded-[24px] border border-app-border/60 bg-app-panel/25 px-4 py-4 ${
        isCompact ? "gap-3" : "flex-row items-center gap-4"
      }`}>
      {/* <CashFlowEntryGlyph icon={item.icon} tone={tone} /> */}
      <View className={`flex-1 gap-1 ${isCompact ? "items-center" : ""}`}>
        <Text className="font-display text-lg font-semibold text-app-text">{item.title}</Text>
        {metadata ? (
          <Text className="font-display text-sm font-semibold uppercase tracking-[1.2px] text-app-muted">
            {metadata}
          </Text>
        ) : null}
      </View>

      <Text
        className={`font-display text-lg font-semibold tracking-tight md:text-xl ${
          isCompact ? "self-center" : "text-right"
        } ${listToneColor(item.tone)}`}>
        {formatTransactionAmount(item.tone, item.amount)}
      </Text>
    </View>
  );
}
