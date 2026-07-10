import { Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import SectionHeader from "@/components/dashboard/SectionHeader";
import type { CryptoHolding } from "@/types/wealth";

function changeToneClass(tone: CryptoHolding["changeTone"]) {
  switch (tone) {
    case "positive":
      return "text-app-primary";
    case "negative":
      return "text-app-danger";
    default:
      return "text-app-muted";
  }
}

function symbolChipClass(symbol: string) {
  if (symbol === "BTC") {
    return "border-app-primary/25 bg-app-primary/40 text-app-primary";
  }

  if (symbol === "ETH") {
    return "border-app-brand/25 bg-app-brand/40 text-app-brand";
  }

  return "border-app-border bg-app-panel/40 text-app-text";
}

export function CryptoHoldingsCard({ items, title }: { items: CryptoHolding[]; title: string }) {
  return (
    <DashboardCard className="overflow-hidden p-0">
      <View className="px-2  pt-5 md:px-6 md:pt-6 ">
        <SectionHeader title={title} />
      </View>

      <View className="hidden md:flex border-y border-app-border px-5 py-4 md:px-6">
        <View className="flex md:flex-row md:items-center">
          <Text className="font-display text-xs font-semibold uppercase text-app-muted md:w-[36%]">
            Asset
          </Text>
          <Text className="font-display text-right text-xs font-semibold uppercase text-app-muted md:w-[16%]">
            Price
          </Text>
          <Text className="font-display text-right text-xs font-semibold uppercase text-app-muted md:w-[16%]">
            24H Change
          </Text>
          <Text className="font-display text-right text-xs font-semibold uppercase text-app-muted md:w-[16%]">
            Holdings
          </Text>
          <Text className="font-display text-right text-xs font-semibold uppercase text-app-muted md:w-[16%]">
            Value
          </Text>
        </View>
      </View>

      <View>
        {items.map((item) => (
          <View key={item.symbol} className="border-b border-app-border px-2 py-4 md:px-6 md:py-5">
            <View className="gap-4 md:flex-row md:items-center">
              <View className="md:w-[36%]">
                <View className="flex-row items-center gap-3">
                  <View
                    className={`h-11 w-11 items-center justify-center rounded-2xl border ${symbolChipClass(item.symbol)}`}>
                    <Text className="font-display text-sm font-semibold text-app-text">
                      {item.symbol}
                    </Text>
                  </View>
                  <View>
                    <Text className="font-display text-lg font-semibold text-app-text">
                      {item.name}
                    </Text>
                    <Text className="font-display text-sm text-app-muted">{item.symbol}</Text>
                  </View>
                </View>
              </View>
              <View className="flex-1 flex-row gap-4">
                <Text className="font-display text-right text-lg font-semibold text-app-text md:w-[25%]">
                  {item.priceLabel}
                </Text>
                <Text
                  className={`font-display text-right text-base font-semibold md:w-[25%] ${changeToneClass(item.changeTone)}`}>
                  {item.changeLabel}
                </Text>
                <Text className="font-display text-right text-base text-app-text md:w-[25%]">
                  {item.holdingsLabel}
                </Text>
                <Text className="font-display text-right text-base text-app-text md:w-[25%]">
                  {item.valueLabel}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </DashboardCard>
  );
}
