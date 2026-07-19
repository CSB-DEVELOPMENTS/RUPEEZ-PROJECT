import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from "react-native-svg";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type AssetColorKey = "chartBlue" | "chartGreen" | "chartOrange" | "chartPurple";

const assetBreakdown: {
  colorKey: AssetColorKey;
  label: string;
  value: string;
}[] = [
  { colorKey: "chartBlue", label: "Cash & Bank", value: "33.4" },
  { colorKey: "chartOrange", label: "Investments", value: "41.8" },
  { colorKey: "chartGreen", label: "Crypto", value: "16.8" },
  { colorKey: "chartPurple", label: "Other Assets", value: "8.0" },
];

const rangeOptions = ["1M", "3M", "1Y", "ALL"];
const donutRadius = 74;
const donutCircumference = 2 * Math.PI * donutRadius;
const donutSegments = assetBreakdown.reduce<((typeof assetBreakdown)[number] & {
  dash: number;
  offset: number;
})[]>((segments, item) => {
  const offset = segments.reduce((total, segment) => total + segment.dash, 0);

  return [
    ...segments,
    {
      ...item,
      dash: (Number(item.value) / 100) * donutCircumference,
      offset,
    },
  ];
}, []);

function WealthCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View className={`rounded-[16px] border border-app-border bg-app-surface p-6 ${className}`}>
      {children}
    </View>
  );
}

function LineChart({ colors }: { colors: (typeof Colors)[keyof typeof Colors] }) {
  return (
    <View className="mt-10 h-56 w-full overflow-hidden md:h-64">
      <Svg width="100%" height="100%" viewBox="0 0 720 280" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="wealthArea" x1="0" x2="0" y1="0" y2="1">
            <Stop offset="0" stopColor={colors.primary} stopOpacity="0.42" />
            <Stop offset="0.78" stopColor={colors.primary} stopOpacity="0.04" />
          </LinearGradient>
        </Defs>

        {[58, 112, 166, 220].map((y) => (
          <Path
            key={y}
            d={`M0 ${y}H720`}
            stroke={colors.textMuted}
            strokeOpacity={0.16}
            strokeWidth={1}
          />
        ))}

        <Path
          d="M0 205 C70 190 105 205 150 192 C215 172 220 118 296 90 C355 68 397 103 448 95 C516 84 548 37 627 35 C666 34 696 39 720 43 L720 280 L0 280 Z"
          fill="url(#wealthArea)"
        />
        <Path
          d="M0 205 C70 190 105 205 150 192 C215 172 220 118 296 90 C355 68 397 103 448 95 C516 84 548 37 627 35 C666 34 696 39 720 43"
          fill="none"
          stroke={colors.primary}
          strokeLinecap="round"
          strokeWidth={4}
        />
        <Circle cx={720} cy={43} fill={colors.primary} r={5} />
      </Svg>
    </View>
  );
}

function DonutChart({ colors }: { colors: (typeof Colors)[keyof typeof Colors] }) {
  const strokeWidth = 18;

  return (
    <View className="h-56 w-56 items-center justify-center">
      <Svg width={224} height={224} viewBox="0 0 224 224">
        <Circle
          cx={112}
          cy={112}
          fill="transparent"
          r={donutRadius}
          stroke={colors.chartTrack}
          strokeOpacity={0.16}
          strokeWidth={strokeWidth}
        />
        {donutSegments.map((item) => (
          <Circle
            key={item.label}
            cx={112}
            cy={112}
            fill="transparent"
            r={donutRadius}
            stroke={colors[item.colorKey]}
            strokeDasharray={`${item.dash} ${donutCircumference - item.dash}`}
            strokeDashoffset={-item.offset}
            strokeLinecap="butt"
            strokeWidth={strokeWidth}
            transform="rotate(-90 112 112)"
          />
        ))}
      </Svg>

      <View className="absolute items-center">
        <Text className="font-display text-[10px] font-semibold uppercase text-app-muted">Total</Text>
        <Text className="mt-1 font-display text-base font-bold text-app-text">LKR 1,250K</Text>
      </View>
    </View>
  );
}

function MetricCard({
  className = "",
  icon,
  iconClassName,
  label,
  sublabel,
  value,
  valueClassName,
}: {
  className?: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  iconClassName: string;
  label: string;
  sublabel?: string;
  value: string;
  valueClassName: string;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <WealthCard className={`min-h-[112px] justify-center ${className}`}>
      <View className="flex-row items-center justify-between gap-4">
        <View className="gap-2">
          <Text className="font-display text-xs font-medium uppercase tracking-[1.6px] text-app-muted">
            {label}
          </Text>
          <Text className={`font-display text-2xl font-bold tracking-tight ${valueClassName}`}>
            {value}
          </Text>
          {sublabel ? (
            <Text className="font-display text-xs text-app-muted">{sublabel}</Text>
          ) : null}
        </View>
        <View className={`h-12 w-12 items-center justify-center rounded-full ${iconClassName}`}>
          <MaterialCommunityIcons
            name={icon}
            size={25}
            color={valueClassName.includes("danger") ? colors.danger : colors.primary}
          />
        </View>
      </View>
    </WealthCard>
  );
}

function PerformanceTile({
  icon,
  label,
  note,
  value,
}: {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  label: string;
  note: string;
  value: string;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="flex-1 rounded-[10px] border border-app-border bg-app-panel px-4 py-5">
      <Text className="font-display text-xs font-semibold uppercase text-app-muted">{label}</Text>
      <View className="mt-4 flex-row items-center gap-3">
        <View className="h-9 w-9 items-center justify-center rounded-[8px] bg-app-primary-muted">
          <MaterialCommunityIcons name={icon} size={19} color={colors.primary} />
        </View>
        <View>
          <Text className="font-display text-2xl font-bold text-app-text">{value}</Text>
          <Text className="font-display text-xs text-app-primary">{note}</Text>
        </View>
      </View>
    </View>
  );
}

export default function Wealth() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 pb-8 pt-2 md:px-8 lg:px-10">
        <View className="mb-7 flex-row flex-wrap items-center justify-between gap-4">
          <View className="flex-row items-center gap-4">
            <Text className="font-display text-2xl font-bold text-app-text">Wealth</Text>
            <View className="hidden h-6 w-px bg-app-border md:flex" />
          </View>

          <View className="flex-row items-center gap-4">
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Add asset"
              className="h-10 flex-row items-center gap-2 rounded-[8px] bg-app-primary px-4 active:bg-app-primary-strong md:px-5"
              onPress={() => router.push("/add-asset")}>
              <MaterialCommunityIcons name="plus" size={19} color={colors.primaryContrast} />
              <Text className="font-display text-sm font-bold text-app-primary-contrast md:text-base">
                New Asset
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="gap-6">
          <View className="gap-6 xl:flex-row">
            <View className="xl:flex-[2]">
              <WealthCard className="overflow-hidden p-0 xl:min-h-[420px]">
                <View className="p-6 md:p-7">
                  <View className="gap-5 md:flex-row md:items-start md:justify-between">
                    <View className="min-w-0">
                      <Text className="font-display text-xs font-medium uppercase tracking-[1.8px] text-app-muted">
                        Net Worth
                      </Text>
                      <View className="mt-2 flex-row flex-wrap items-center gap-3">
                        <Text className="font-display text-4xl font-bold tracking-tight text-app-text md:text-5xl">
                          LKR 1,250,000
                        </Text>
                        <View className="rounded-full bg-app-primary-muted px-3 py-1">
                          <Text className="font-display text-xs font-bold text-app-primary">
                            + 18.4%
                          </Text>
                        </View>
                      </View>
                      <Text className="mt-2 font-display text-sm text-app-muted">
                        vs last month
                      </Text>
                    </View>

                    <View className="flex-row flex-wrap gap-2 self-start md:self-auto">
                      {rangeOptions.map((option) => (
                        <Pressable
                          key={option}
                          className={`h-9 min-w-11 items-center justify-center rounded-[6px] px-3 ${
                            option === "1M" ? "bg-app-panel-strong" : "bg-app-panel"
                          }`}>
                          <Text className="font-display text-xs font-medium text-app-text">
                            {option}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>

                  <LineChart colors={colors} />

                  <View className="mt-1 flex-row justify-between">
                    {["APR-21", "APR-28", "MAY-05", "MAY-12", "MAY-19"].map((item) => (
                      <Text key={item} className="font-display text-[10px] text-app-muted">
                        {item}
                      </Text>
                    ))}
                  </View>
                </View>
              </WealthCard>
            </View>

            <View className="gap-4 xl:flex-1 xl:self-stretch">
              <MetricCard
                className="xl:flex-1"
                icon="bank-outline"
                iconClassName="bg-app-brand/15"
                label="Total Assets"
                value="LKR 1,350,000"
                valueClassName="text-app-brand-soft"
              />
              <MetricCard
                className="xl:flex-1"
                icon="credit-card-outline"
                iconClassName="bg-app-danger-muted"
                label="Total Liabilities"
                value="-LKR 100,000"
                valueClassName="text-app-danger"
              />
              <MetricCard
                className="xl:flex-1"
                icon="diamond-stone"
                iconClassName="bg-app-primary-muted"
                label="Current Net Worth"
                sublabel="Update frequency: Real-time"
                value="LKR 1,250,000"
                valueClassName="text-app-primary"
              />
            </View>
          </View>

          <View className="gap-6 xl:flex-row xl:items-stretch">
            <WealthCard className="xl:flex-[1.35]">
              <View className="flex-row items-center justify-between">
                <Text className="font-display text-2xl font-bold text-app-text">
                  Assets Breakdown
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="View asset portfolio"
                  className="flex-row items-center gap-1"
                  onPress={() => router.push("/asset-portfolio")}>
                  <Text className="font-display text-xs font-bold uppercase tracking-[1px] text-app-muted">
                    See All
                  </Text>
                  <MaterialCommunityIcons name="chevron-right" size={18} color={colors.textMuted} />
                </Pressable>
              </View>

              <View className="mt-5 flex-1 gap-6 md:flex-row md:items-center">
                <View className="items-center md:w-[40%]">
                  <DonutChart colors={colors} />
                </View>

                <View className="flex-1 gap-5">
                  {assetBreakdown.map((item) => (
                    <View key={item.label} className="flex-row items-center justify-between">
                      <View className="flex-row items-center gap-3">
                        <View
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: colors[item.colorKey] }}
                        />
                        <Text className="font-display text-base text-app-text">{item.label}</Text>
                      </View>
                      <Text className="font-display text-base font-bold text-app-text">
                        {item.value}%
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </WealthCard>

            <WealthCard className="xl:flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="font-display text-2xl font-bold text-app-text">Performance</Text>
                <View className="rounded-[6px] bg-app-panel-strong px-3 py-2">
                  <Text className="font-display text-xs font-bold uppercase text-app-muted">
                    This Month
                  </Text>
                </View>
              </View>

              <View className="mt-7 gap-4 md:flex-row xl:flex-row">
                <PerformanceTile
                  icon="chart-line-variant"
                  label="Expenses"
                  note="Below average"
                  value="-9.2%"
                />
                <PerformanceTile
                  icon="piggy-bank-outline"
                  label="Savings Rate"
                  note="Target: 40%"
                  value="42%"
                />
              </View>

              <View className="mt-7 border-t border-app-border pt-6">
                <View className="flex-row items-center justify-between">
                  <Text className="font-display text-sm text-app-muted">
                    Wealth Achievement Score
                  </Text>
                  <Text className="font-display text-sm font-bold text-app-text">82/100</Text>
                </View>
                <View className="mt-4 h-2 overflow-hidden rounded-full bg-app-panel-strong">
                  <View className="h-full w-[82%] rounded-full bg-app-primary" />
                </View>
                <Text className="mt-4 text-center font-display text-xs text-app-muted">
                  Top 5% among similar investor profiles
                </Text>
              </View>
            </WealthCard>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
