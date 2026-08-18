import { DashboardPortfolioAsset } from "@/types/dashboard";
import { Text, View } from "react-native";
import { DashboardCard } from "./DashboardCard";
import { portfolioChipToneClass } from "./DashboardSections";
import SectionHeader from "./SectionHeader";

export function DashboardPortfolioCard({ items }: { items: DashboardPortfolioAsset[] }) {
  return (
    <DashboardCard className="min-h-[280px]">
      <SectionHeader title="Crypto Portfolio" action="See all" actionHref="/crypto-assets" />

      {items.length === 0 && (
        <Text className="mt-4 font-display text-base text-app-muted">No crypto assets found.</Text>
      )}

      <View className="gap-5">
        {items.map((asset) => (
          <View
            key={asset.symbol}
            className="flex-row items-center justify-between gap-4 rounded-[22px] border border-app-border bg-app-panel/30 p-4">
            <View className="flex-row items-center gap-4">
              <View
                className={`h-12 w-12 items-center justify-center rounded-full ${portfolioChipToneClass(asset.chipTone)}`}>
                <Text className="font-display text-base font-semibold text-app-primary-contrast">
                  {asset.symbol[0]}
                </Text>
              </View>
              <View>
                <Text className="font-display text-lg md:text-xl font-semibold text-app-text">
                  {asset.symbol}
                </Text>
                <Text className="font-display text-sm text-app-muted">{asset.subtitle}</Text>
              </View>
            </View>
            <View className="items-end">
              <Text className="font-display text-lg md:text-xl font-semibold text-app-text">
                {asset.value}
              </Text>
              <Text className="mt-1 font-display text-sm font-semibold text-app-primary">
                {asset.change}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </DashboardCard>
  );
}
