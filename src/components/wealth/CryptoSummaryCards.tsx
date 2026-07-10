import { Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import type { CryptoSummaryCardData } from "@/types/wealth";

function toneClass(tone: CryptoSummaryCardData["tone"]) {
  switch (tone) {
    case "positive":
      return "text-app-primary";
    case "negative":
      return "text-app-danger";
    default:
      return "text-app-text";
  }
}

function chipClass(type: CryptoSummaryCardData["type"]) {
  switch (type) {
    case "performer":
      return "bg-app-brand/20 text-app-brand";
    case "quickAction":
      return "bg-app-primary/15 text-app-primary";
    default:
      return "bg-app-panel text-app-text";
  }
}

function chipLabel(data: CryptoSummaryCardData) {
  if (data.assetSymbol) {
    return data.assetSymbol;
  }

  if (data.type === "quickAction") {
    return "GO";
  }

  return "TL";
}

export function CryptoSummaryCards({ items }: { items: CryptoSummaryCardData[] }) {
  return (
    <View className="gap-4 xl:flex-row">
      {items.map((item) => (
        <DashboardCard key={item.caption} className="flex-1">
          <View className="gap-5">
            <View className="flex-row items-start justify-between gap-4">
              <Text className="font-display text-sm font-semibold uppercase tracking-[1.4px] text-app-muted">
                {item.caption}
              </Text>
              {/* <View
                className={`h-12 w-12 items-center justify-center rounded-2xl ${chipClass(item.type)}`}>
                <Text className="font-display text-base font-semibold text-app-text">
                  {chipLabel(item)}
                </Text>
              </View> */}
            </View>

            {item.type === "balance" ?
              <View className="gap-2">
                <Text className="font-display text-3xl font-semibold tracking-tight text-app-text md:text-5xl">
                  {item.value}
                </Text>
                <Text className={`font-display text-base font-semibold ${toneClass(item.tone)}`}>
                  {item.detail}
                </Text>
              </View>
            : null}

            {item.type === "performer" ?
              <View className="flex-row items-center gap-4">
                <View className="h-12 w-12 items-center justify-center rounded-full bg-app-brand/15">
                  <Text className="font-display text-base font-semibold text-app-brand">
                    {item.assetSymbol}
                  </Text>
                </View>
                <View className="gap-1">
                  <Text className="font-display text-2xl font-semibold text-app-text">
                    {item.assetName}
                  </Text>
                  <Text className={`font-display text-base font-semibold ${toneClass(item.tone)}`}>
                    {item.changeLabel}
                  </Text>
                </View>
              </View>
            : null}
          </View>
        </DashboardCard>
      ))}
    </View>
  );
}
