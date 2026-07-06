import type { DashboardTransaction, DashboardTransactionTone } from "@/types/dashboard";
import { Text, useWindowDimensions, View } from "react-native";

export function transactionToneClass(tone: DashboardTransactionTone) {
  switch (tone) {
    case "income":
      return "text-app-primary";
    case "expense":
      return "text-app-danger";
    default:
      return "text-app-text";
  }
}

export function formatTransactionAmount(type: string, amount: number) {
  if (type === "income") {
    return `+LKR ${amount.toLocaleString()}`;
  }
  if (type === "transfer") {
    return `LKR ${Math.abs(amount).toLocaleString()}`;
  }
  return `-LKR ${Math.abs(amount).toLocaleString()}`;
}

export function TransactionCard({ item }: { item: DashboardTransaction }) {
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
        } ${transactionToneClass(item.tone)}`}>
        {formatTransactionAmount(item.tone, item.amount)}
      </Text>
    </View>
  );
}
