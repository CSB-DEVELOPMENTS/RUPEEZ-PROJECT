import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { Colors, Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

const assets = [
  {
    balance: "4,250,000.00",
    change: "+0.05%",
    changeTone: "positive",
    detail: "Savings Account - 8920",
    icon: "piggy-bank-outline",
    lastUpdated: "Today, 10:45 AM",
    name: "Sampath Ultra Savings",
    type: "Cash",
  },
  {
    balance: "18,750,200.00",
    change: "+3.24%",
    changeTone: "positive",
    detail: "Cold Wallet - 0.42 BTC",
    icon: "bitcoin",
    lastUpdated: "2 mins ago",
    name: "Bitcoin Portfolio",
    type: "Crypto",
  },
  {
    balance: "15,000,000.00",
    change: "0.00%",
    changeTone: "neutral",
    detail: "Real Estate - Unit 4B",
    icon: "office-building-outline",
    lastUpdated: "Jan 15, 2024",
    name: "Kollupitiya Apartment",
    type: "Property",
  },
  {
    balance: "4,850,000.00",
    change: "-0.45%",
    changeTone: "negative",
    detail: "Mutual Fund - 4200 units",
    icon: "chart-line",
    lastUpdated: "Yesterday",
    name: "NDB Wealth Growth Fund",
    type: "Investment",
  },
] as const;

function toneClass(tone: (typeof assets)[number]["changeTone"]) {
  switch (tone) {
    case "positive":
      return "text-app-primary";
    case "negative":
      return "text-app-danger";
    default:
      return "text-app-muted";
  }
}

function AssetPageCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View className={`rounded-[16px] border border-app-border bg-app-surface ${className}`}>
      {children}
    </View>
  );
}

function HeaderButton({
  icon,
  label,
}: {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  label: string;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <Pressable className="h-10 flex-1 flex-row items-center justify-center gap-2 rounded-[6px] border border-app-border bg-app-panel px-4 md:flex-none">
      <MaterialCommunityIcons name={icon} size={16} color={colors.textMuted} />
      <Text className="font-display text-xs font-bold uppercase tracking-[1.4px] text-app-muted">
        {label}
      </Text>
    </Pressable>
  );
}

function SummaryCard({
  icon,
  label,
  metric,
  progress,
  sublabel,
  value,
}: {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  label: string;
  metric?: string;
  progress?: number;
  sublabel: string;
  value: string;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <AssetPageCard className="flex-1 p-6 md:min-h-[220px] md:p-8">
      <View className="flex-row items-start justify-between gap-4">
        <View className="flex-1">
          <Text className="font-display text-xs font-bold uppercase tracking-[3px] text-app-muted">
            {label}
          </Text>
          <Text className="mt-8 font-display text-3xl font-bold tracking-tight text-app-text md:text-4xl">
            {value}
          </Text>
          <View className="mt-5 flex-row flex-wrap items-center gap-3">
            {metric ? (
              <View className="rounded-[6px] bg-app-primary-muted px-3 py-2">
                <Text className="font-display text-xs font-bold text-app-primary">{metric}</Text>
              </View>
            ) : null}
            <Text className="font-display text-xs font-bold uppercase tracking-[1.4px] text-app-muted">
              {sublabel}
            </Text>
          </View>
          {progress ? (
            <View className="mt-7 h-2 overflow-hidden rounded-full bg-app-panel-strong">
              <View
                className="h-full rounded-full bg-app-primary"
                style={{ width: `${progress}%` }}
              />
            </View>
          ) : null}
        </View>
        <MaterialCommunityIcons name={icon} size={22} color={colors.primary} />
      </View>
    </AssetPageCard>
  );
}

function AssetRows() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <>
      <View className="hidden border-b border-app-border px-8 py-6 md:flex md:flex-row">
        {["Asset Name", "Type", "Balance (LKR)", "24H Change (%)", "Last Updated", ""].map(
          (heading) => (
            <Text
              key={heading || "actions"}
              className={`font-display text-xs font-bold uppercase tracking-[3px] text-app-muted ${
                heading === "Asset Name" ? "flex-[1.8]" : "flex-1"
              } ${heading === "Balance (LKR)" || heading === "24H Change (%)" ? "text-right" : ""}`}>
              {heading}
            </Text>
          ),
        )}
      </View>

      {assets.map((asset) => (
        <View
          key={asset.name}
          className="border-b border-app-border px-4 py-5 last:border-b-0 md:px-8 md:py-6">
          <View className="md:hidden">
            <View className="flex-row items-center gap-3">
              <View className="h-11 w-11 items-center justify-center rounded-[6px] border border-app-border bg-app-panel">
                <MaterialCommunityIcons name={asset.icon} size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="font-display text-base font-bold text-app-text">{asset.name}</Text>
                <View className="mt-1 self-start rounded-[4px] bg-app-panel-strong px-2 py-1">
                  <Text className="font-display text-[10px] font-bold uppercase tracking-[1px] text-app-muted">
                    {asset.type}
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons name="dots-vertical" size={22} color={colors.textMuted} />
            </View>

            <View className="mt-5 flex-row items-end justify-between border-t border-app-border pt-4">
              <View>
                <Text className="font-display text-[10px] font-bold uppercase tracking-[1.6px] text-app-muted">
                  Balance (LKR)
                </Text>
                <Text className="mt-2 font-display text-lg font-bold text-app-text">
                  {asset.balance}
                </Text>
              </View>
              <View className="items-end">
                <Text className="font-display text-[10px] font-bold uppercase tracking-[1.6px] text-app-muted">
                  24H Change
                </Text>
                <Text className={`mt-2 font-display text-base font-bold ${toneClass(asset.changeTone)}`}>
                  {asset.change}
                </Text>
              </View>
            </View>
          </View>

          <View className="hidden md:flex md:flex-row md:items-center">
            <View className="flex-[1.8] flex-row items-center gap-4">
              <View className="h-10 w-10 items-center justify-center rounded-[6px] border border-app-border bg-app-panel">
                <MaterialCommunityIcons name={asset.icon} size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="font-display text-base font-bold leading-5 text-app-text">
                  {asset.name}
                </Text>
                <Text className="mt-1 font-display text-[10px] uppercase text-app-muted">
                  {asset.detail}
                </Text>
              </View>
            </View>

            <View className="flex-1">
              <View className="self-start rounded-[4px] bg-app-panel-strong px-3 py-1.5">
                <Text className="font-display text-[10px] font-bold uppercase tracking-[1.3px] text-app-muted">
                  {asset.type}
                </Text>
              </View>
            </View>
            <Text className="flex-1 text-right font-display text-base text-app-text">
              {asset.balance}
            </Text>
            <Text className={`flex-1 text-right font-display text-base font-bold ${toneClass(asset.changeTone)}`}>
              {asset.change}
            </Text>
            <Text className="flex-1 font-display text-xs uppercase leading-5 text-app-muted">
              {asset.lastUpdated}
            </Text>
            <View className="w-8 items-end">
              <MaterialCommunityIcons name="dots-vertical" size={22} color={colors.textMuted} />
            </View>
          </View>
        </View>
      ))}
    </>
  );
}

function PortfolioCard() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <AssetPageCard className="overflow-hidden">
      <View className="gap-5 px-4 py-5 md:flex-row md:items-center md:justify-between md:px-8 md:py-8">
        <View>
          <Text className="font-display text-xl font-bold uppercase text-app-text">
            Asset Portfolio
          </Text>
          <Text className="mt-2 font-display text-xs uppercase tracking-[2.5px] text-app-muted">
            Live tracking of all your financial positions
          </Text>
        </View>
        <View className="flex-row gap-2">
          <HeaderButton icon="filter-variant" label="Filter" />
          <HeaderButton icon="download-outline" label="Export" />
        </View>
      </View>

      <AssetRows />

      <View className="flex-row items-center justify-between border-t border-app-border px-4 py-5 md:px-8">
        <Text className="font-display text-xs font-bold uppercase tracking-[2px] text-app-muted">
          Showing 1-4 of 12 assets
        </Text>
        <View className="flex-row items-center gap-3">
          <MaterialCommunityIcons name="chevron-left" size={21} color={colors.textSoft} />
          {[1, 2, 3].map((page) => (
            <Pressable
              key={page}
              className={`h-8 w-8 items-center justify-center rounded-[6px] ${
                page === 1 ? "bg-app-primary" : ""
              }`}>
              <Text
                className={`font-display text-xs font-bold ${
                  page === 1 ? "text-app-primary-contrast" : "text-app-muted"
                }`}>
                {page}
              </Text>
            </Pressable>
          ))}
          <MaterialCommunityIcons name="chevron-right" size={21} color={colors.textMuted} />
        </View>
      </View>
    </AssetPageCard>
  );
}

export default function AssetPortfolio() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 pb-10 pt-2 md:px-8 lg:px-10">
        <View className="mb-7 gap-4 md:flex-row md:items-center md:justify-between">
          <View className="flex-row items-center gap-4">
            <Text className="font-display text-2xl font-bold text-app-text">Assets</Text>
            <View className="hidden h-6 w-px bg-app-border md:flex" />
            <View className="hidden h-10 w-72 flex-row items-center gap-3 rounded-[8px] border border-app-border bg-app-panel px-4 md:flex">
              <MaterialCommunityIcons name="magnify" size={18} color={colors.textMuted} />
              <TextInput
                className="flex-1 font-display text-sm text-app-text focus:outline-none"
                editable={false}
                placeholder="Search assets..."
                placeholderTextColor={colors.textMuted}
                style={{ fontFamily: Fonts.sans }}
              />
            </View>
          </View>

          <View className="hidden flex-row items-center gap-4 md:flex">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Add asset"
              className="h-10 flex-row items-center gap-2 rounded-[8px] bg-app-primary px-5 active:bg-app-primary-strong"
              onPress={() => router.push("/add-asset")}>
              <MaterialCommunityIcons name="plus" size={19} color={colors.primaryContrast} />
              <Text className="font-display text-base font-bold text-app-primary-contrast">
                New Asset
              </Text>
            </Pressable>
            <MaterialCommunityIcons name="bell-outline" size={24} color={colors.textMuted} />
          </View>

          <View className="flex-row gap-2 md:hidden">
            <View className="h-14 flex-1 flex-row items-center gap-3 rounded-[8px] border border-app-border bg-app-panel px-4">
              <MaterialCommunityIcons name="magnify" size={22} color={colors.textMuted} />
              <TextInput
                className="flex-1 font-display text-base text-app-text focus:outline-none"
                editable={false}
                placeholder="Search transactions..."
                placeholderTextColor={colors.textMuted}
                style={{ fontFamily: Fonts.sans }}
              />
            </View>
            <Pressable className="h-14 w-14 items-center justify-center rounded-[8px] border border-app-border bg-app-panel">
              <MaterialCommunityIcons name="tune-variant" size={24} color={colors.text} />
            </Pressable>
          </View>
        </View>

        <View className="gap-8 md:hidden">
          <SummaryCard
            icon="bank-outline"
            label="Total Asset Value"
            metric="+ 12.4%"
            sublabel="vs last quarter"
            value="LKR 42.85M"
          />
          <SummaryCard
            icon="star-outline"
            label="Top Performing"
            progress={42}
            sublabel="ROI: +42.8% YTD"
            value="Ethereum (ETH)"
          />
          <SummaryCard
            icon="chart-line-variant"
            label="Monthly Growth"
            metric="+ 5.2%"
            sublabel="this month"
            value="LKR 1,240,500"
          />
          <PortfolioCard />
        </View>

        <View className="hidden gap-8 md:flex">
          <PortfolioCard />
          <View className="gap-6 xl:flex-row">
            <SummaryCard
              icon="bank-outline"
              label="Total Asset Value"
              metric="+ 12.4%"
              sublabel="vs last quarter"
              value={"LKR\n42,850,200.00"}
            />
            <SummaryCard
              icon="star-outline"
              label="Top Performing Asset"
              progress={42}
              sublabel="ROI: +42.8% YTD"
              value="Ethereum (ETH)"
            />
            <SummaryCard
              icon="chart-line-variant"
              label="Total Monthly Growth"
              metric="+ 5.2%"
              sublabel="this month"
              value={"LKR\n1,240,500.00"}
            />
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add asset"
          className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-app-primary shadow-showcase-soft md:hidden"
          onPress={() => router.push("/add-asset")}>
          <MaterialCommunityIcons name="plus" size={30} color={colors.primaryContrast} />
        </Pressable>
      </View>
    </ScrollView>
  );
}
