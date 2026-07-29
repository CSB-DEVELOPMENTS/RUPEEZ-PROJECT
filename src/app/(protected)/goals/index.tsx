import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type Goal = {
  name: string;
  category: string;
  categoryTag?: string;
  type: "Personal" | "Shared";
  saved: number;
  target: number;
  progress: number;
  deadline: string;
  daysLeft: string;
  insight: string;
  badgeTone: "purple" | "blue" | "neutral";
};

const goals: Goal[] = [
  {
    name: "Buy MacBook Air",
    category: "Electronics Upgrade",
    type: "Personal",
    saved: 180000,
    target: 300000,
    progress: 60,
    deadline: "20 Dec 2025",
    daysLeft: "210",
    insight: "Target Date: Dec 2025 (18 months left)",
    badgeTone: "purple",
  },
  {
    name: "Europe Trip",
    category: "Travel & Leisure",
    type: "Shared",
    saved: 1200000,
    target: 1500000,
    progress: 80,
    deadline: "15 Aug 2025",
    daysLeft: "120",
    insight: "On Track: 4 months left",
    badgeTone: "blue",
  },
  {
    name: "Emergency Fund",
    category: "Security & Savings",
    type: "Personal",
    saved: 125000,
    target: 500000,
    progress: 25,
    deadline: "No date",
    daysLeft: "-",
    insight: "Increased savings by 5% this month",
    badgeTone: "purple",
  },
  {
    name: "New Car",
    category: "Automobile",
    type: "Shared",
    saved: 4500000,
    target: 10000000,
    progress: 45,
    deadline: "10 Nov 2026",
    daysLeft: "240",
    insight: "Dream Villa in Bali is next in queue",
    badgeTone: "blue",
  },
];

const mobileGoals: Goal[] = [
  {
    name: "Dream Villa in Bali",
    category: "Real Estate",
    categoryTag: "Real Estate",
    type: "Personal",
    saved: 135000,
    target: 300000,
    progress: 45,
    deadline: "Dec 2025",
    daysLeft: "540",
    insight: "Target Date: Dec 2025 (18 months left)",
    badgeTone: "neutral",
  },
  {
    name: "Retirement Fund Phase 1",
    category: "Investment",
    categoryTag: "Investment",
    type: "Shared",
    saved: 205500,
    target: 250000,
    progress: 82,
    deadline: "Nov 2025",
    daysLeft: "124",
    insight: "On Track: 4 months left",
    badgeTone: "neutral",
  },
  {
    name: "Tesla Model S",
    category: "Lifestyle",
    categoryTag: "Lifestyle",
    type: "Personal",
    saved: 15000,
    target: 100000,
    progress: 15,
    deadline: "No date",
    daysLeft: "-",
    insight: "Increased savings by 5% this month",
    badgeTone: "neutral",
  },
];

const filters = ["All", "Personal", "Shared", "Completed"];

function formatLkr(value: number) {
  return `LKR ${value.toLocaleString("en-US")}`;
}

function getGoalHref(goal: Goal) {
  return `/goals/${goal.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}` as Href;
}

function GoalTypeBadge({ goal }: { goal: Goal }) {
  const badgeClass =
    goal.badgeTone === "blue" ?
      "border-app-brand/40 bg-app-brand-faint/35"
    : goal.badgeTone === "purple" ?
      "border-purple-500/40 bg-purple-500/15"
    : "border-app-border bg-app-panel";
  const textClass =
    goal.badgeTone === "blue" ? "text-app-brand-soft"
    : goal.badgeTone === "purple" ? "text-purple-300"
    : "text-app-muted";

  return (
    <View className={`self-start rounded-full border px-3 py-1 ${badgeClass}`}>
      <Text className={`font-display text-[10px] font-bold uppercase ${textClass}`}>
        {goal.type}
      </Text>
    </View>
  );
}

function ProgressBar({ value, tone = "green" }: { value: number; tone?: "green" | "blue" }) {
  return (
    <View className="h-2 flex-1 overflow-hidden rounded-full bg-app-panel-strong">
      <View
        style={{ width: `${value}%` }}
        className={`h-full rounded-full ${tone === "blue" ? "bg-app-brand" : "bg-app-primary"}`}
      />
    </View>
  );
}

function GoalCard({ goal, onPress }: { goal: Goal; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${goal.name}`}
      onPress={onPress}
      className="rounded-[10px] border border-app-border bg-app-bg-accent p-6 active:bg-app-panel">
      <View className="flex-row items-start justify-between gap-4">
        <View className="min-w-0 flex-1">
          <View className="self-start rounded-[4px] bg-app-panel px-2 py-1">
            <Text className="font-display text-[10px] font-bold uppercase text-app-soft">
              {goal.categoryTag ?? goal.category}
            </Text>
          </View>
          <Text className="mt-2 font-display text-lg font-semibold text-app-text">{goal.name}</Text>
        </View>
        <MaterialCommunityIcons name="dots-vertical" size={22} color="#727D92" />
      </View>

      <View className="mt-5">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="font-display text-xs font-medium uppercase tracking-[1px] text-app-soft">
            Progress
          </Text>
          <Text className="font-display text-xs font-bold text-app-primary">{goal.progress}%</Text>
        </View>
        <ProgressBar value={goal.progress} />
      </View>

      <View className="mt-5 flex-row justify-between border-b border-app-border pb-4">
        <View>
          <Text className="font-display text-[10px] font-bold uppercase tracking-[1px] text-app-soft">
            Saved
          </Text>
          <Text className="mt-1 font-display text-base font-semibold text-app-text">
            {formatLkr(goal.saved)}
          </Text>
        </View>
        <View className="items-end">
          <Text className="font-display text-[10px] font-bold uppercase tracking-[1px] text-app-soft">
            Target
          </Text>
          <Text className="mt-1 font-display text-base font-semibold text-app-text">
            {formatLkr(goal.target)}
          </Text>
        </View>
      </View>

      <View className="mt-4 flex-row items-center gap-2">
        <MaterialCommunityIcons
          name={goal.type === "Shared" ? "alert-circle-outline" : "clock-outline"}
          size={15}
          color={goal.type === "Shared" ? "#4ADE80" : "#9AA3B8"}
        />
        <Text
          className={`font-display text-xs font-semibold ${
            goal.type === "Shared" ? "text-app-primary-strong" : "text-app-text-muted"
          }`}>
          {goal.insight}
        </Text>
      </View>
    </Pressable>
  );
}

function DesktopGoalRow({ goal, onPress }: { goal: Goal; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${goal.name}`}
      onPress={onPress}
      className="min-h-[104px] flex-row items-center border-b border-app-border px-6 active:bg-app-panel last:border-b-0">
      <View className="w-[17%] pr-4">
        <Text className="font-display text-base font-medium leading-5 text-app-text">{goal.name}</Text>
        <Text className="mt-1 font-display text-xs font-semibold tracking-[1px] text-app-soft">
          {goal.category}
        </Text>
      </View>
      <View className="w-[14%]">
        <GoalTypeBadge goal={goal} />
      </View>
      <View className="w-[29%] flex-row items-center gap-3 pr-8">
        <ProgressBar value={goal.progress} />
        <Text className="w-10 font-display text-sm font-bold text-app-primary">
          {goal.progress}%
        </Text>
      </View>
      <View className="w-[14%] items-end pr-6">
        <Text className="font-display text-sm font-bold text-app-text">{formatLkr(goal.saved)}</Text>
        <Text className="font-display text-xs text-app-soft">
          / {goal.target.toLocaleString("en-US")}
        </Text>
      </View>
      <View className="w-[13%]">
        <Text className="font-display text-sm text-app-text">{goal.deadline}</Text>
      </View>
      <View className="w-[10%] items-center">
        <Text className="font-display text-lg font-bold text-app-text">{goal.daysLeft}</Text>
      </View>
      <View className="w-[3%] items-end">
        <MaterialCommunityIcons name="dots-vertical" size={22} color="#727D92" />
      </View>
    </Pressable>
  );
}

function SummaryCard({
  label,
  value,
  caption,
  icon,
  tone = "green",
  children,
}: {
  label: string;
  value: string;
  caption?: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  tone?: "green" | "blue" | "purple";
  children?: React.ReactNode;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const iconColor =
    tone === "blue" ? colors.brand : tone === "purple" ? colors.chartPurple : colors.primary;

  return (
    <View className="flex-1 rounded-[10px] border border-app-border bg-app-bg-accent p-6">
      <View className="flex-row items-start justify-between gap-4">
        <View className="min-w-0 flex-1">
          <Text className="font-display text-xs font-medium uppercase tracking-[1.8px] text-app-soft">
            {label}
          </Text>
          <Text className="mt-5 font-display text-2xl font-bold text-app-text md:text-3xl">
            {value}
          </Text>
          {caption ? (
            <Text className="mt-2 font-display text-sm text-app-text-muted">{caption}</Text>
          ) : null}
          {children}
        </View>
        <MaterialCommunityIcons name={icon} size={22} color={iconColor} />
      </View>
    </View>
  );
}

export default function GoalsCenterScreen() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 pb-24 pt-2 md:px-8 md:pb-10 lg:px-10">
        <View className="mb-7 gap-4 md:flex-row md:items-center md:justify-between">
          <View className="flex-row items-center gap-4">
            <Text className="font-display text-2xl font-bold text-app-text">Goals Center</Text>
            <View className="hidden h-6 w-px bg-app-border md:flex" />
          </View>

          <View className="flex-row items-center gap-3">
            <View className="h-11 min-w-0 flex-1 flex-row items-center gap-3 rounded-[8px] border border-app-border bg-app-surface px-4 md:w-72 md:flex-none">
              <MaterialCommunityIcons name="magnify" size={20} color={colors.textMuted} />
              <TextInput
                placeholder="Search your goals..."
                placeholderTextColor={colors.textMuted}
                style={{ color: colors.text, fontSize: 14 }}
                className="min-w-0 flex-1 outline-none"
              />
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Filter goals"
              className="h-11 w-11 items-center justify-center rounded-[8px] border border-app-border bg-app-surface active:bg-app-panel md:hidden">
              <MaterialCommunityIcons name="tune-variant" size={22} color={colors.text} />
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Add goal"
              onPress={() => router.push("/goals/add")}
              className="hidden h-11 flex-row items-center gap-2 rounded-[8px] bg-app-primary px-5 active:bg-app-primary-strong md:flex">
              <MaterialCommunityIcons name="plus" size={19} color={colors.primaryContrast} />
              <Text className="font-display text-sm font-bold text-app-primary-contrast">
                Add Goal
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="hidden md:flex">
          <View className="mb-6 self-start rounded-[10px] border border-app-border bg-app-bg-accent p-1">
            <View className="flex-row">
              {filters.map((filter) => (
                <Pressable
                  key={filter}
                  className={`h-9 min-w-24 items-center justify-center rounded-[7px] px-5 ${
                    filter === "All" ? "bg-app-primary" : ""
                  }`}>
                  <Text
                    className={`font-display text-xs font-bold ${
                      filter === "All" ? "text-app-primary-contrast" : "text-app-text-muted"
                    }`}>
                    {filter}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View className="overflow-hidden rounded-[14px] border border-app-border bg-app-bg-accent">
            <View className="flex-row px-6 py-6">
              {["Goal", "Type", "Progress", "Saved / Target", "Target Date", "Days Left"].map(
                (heading, index) => (
                  <Text
                    key={heading}
                    className={`font-display text-xs font-bold uppercase tracking-[1.6px] text-app-soft ${
                      index === 0 ? "w-[17%]"
                      : index === 1 ? "w-[14%]"
                      : index === 2 ? "w-[29%]"
                      : index === 3 ? "w-[14%] pr-6 text-right"
                      : index === 4 ? "w-[13%]"
                      : "w-[10%] text-center"
                    }`}>
                    {heading}
                  </Text>
                ),
              )}
              <View className="w-[3%]" />
            </View>

            {goals.map((goal) => (
              <DesktopGoalRow
                key={goal.name}
                goal={goal}
                onPress={() => router.push(getGoalHref(goal))}
              />
            ))}

            <View className="flex-row items-center justify-between px-6 py-8">
              <Text className="font-display text-sm text-app-text-muted">
                Showing 1-4 of 12 goals
              </Text>
              <View className="flex-row items-center gap-4">
                <MaterialCommunityIcons name="chevron-left" size={20} color={colors.textMuted} />
                {[1, 2, 3].map((page) => (
                  <Pressable
                    key={page}
                    className={`h-9 w-9 items-center justify-center rounded-[8px] ${
                      page === 1 ? "bg-app-primary" : ""
                    }`}>
                    <Text
                      className={`font-display text-sm font-bold ${
                        page === 1 ? "text-app-primary-contrast" : "text-app-text-muted"
                      }`}>
                      {page}
                    </Text>
                  </Pressable>
                ))}
                <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textMuted} />
              </View>
            </View>
          </View>
        </View>

        <View className="gap-4 md:hidden">
          {mobileGoals.map((goal) => (
            <GoalCard
              key={goal.name}
              goal={goal}
              onPress={() => router.push(getGoalHref(goal))}
            />
          ))}

          <View className="items-center gap-4 py-6">
            <Text className="font-display text-sm text-app-text-muted">Showing 1-3 of 12 goals</Text>
            <View className="flex-row items-center gap-2">
              {["chevron-left", "1", "2", "3", "chevron-right"].map((item) => (
                <Pressable
                  key={item}
                  className={`h-9 w-9 items-center justify-center rounded-[6px] border ${
                    item === "1" ? "border-app-primary bg-app-primary" : "border-app-border"
                  }`}>
                  {item.includes("chevron") ? (
                    <MaterialCommunityIcons
                      name={item as "chevron-left" | "chevron-right"}
                      size={18}
                      color={colors.textMuted}
                    />
                  ) : (
                    <Text
                      className={`font-display text-sm ${
                        item === "1"
                          ? "font-bold text-app-primary-contrast"
                          : "text-app-text-muted"
                      }`}>
                      {item}
                    </Text>
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        <View className="mt-6 hidden gap-4 md:flex md:flex-row md:gap-6">
          <SummaryCard
            label="Total Goal Value"
            value="LKR 12,300,000"
            caption="Across 4 active goals"
            icon="wallet-outline"
          />
          <SummaryCard label="Average Progress" value="52.5%" icon="trending-up" tone="blue">
            <View className="mt-4 flex-row items-center gap-3">
              <ProgressBar value={52.5} tone="blue" />
            </View>
          </SummaryCard>
          <SummaryCard
            label="Next Milestone"
            value="Europe Trip"
            caption="120 days until deadline"
            icon="calendar-star"
            tone="purple"
          />
        </View>

        <View className="mt-6 gap-4 md:hidden">
          <View className="rounded-[10px] border border-app-border bg-app-bg-accent p-6">
            <View className="flex-row items-end justify-between gap-4">
              <View>
                <Text className="font-display text-xs font-medium uppercase tracking-[1.8px] text-app-soft">
                  Total Goal Value
                </Text>
                <Text className="mt-3 font-display text-3xl font-bold text-app-text">
                  LKR 420,500
                </Text>
              </View>
              <View className="rounded-full bg-app-primary-muted px-3 py-1">
                <Text className="font-display text-xs font-bold text-app-primary-strong">
                  +8.4%
                </Text>
              </View>
            </View>
          </View>

          <View className="rounded-[10px] border border-app-border bg-app-bg-accent p-6">
            <Text className="font-display text-xs font-medium uppercase tracking-[1.8px] text-app-soft">
              Average Progress
            </Text>
            <View className="mt-3 flex-row items-center gap-4">
              <Text className="font-display text-3xl font-bold text-app-text">64%</Text>
              <ProgressBar value={64} />
            </View>
          </View>

          <View className="rounded-[10px] border border-app-border bg-app-bg-accent p-6">
            <View className="flex-row justify-between gap-4">
              <View>
                <Text className="font-display text-xs font-medium uppercase tracking-[1.8px] text-app-soft">
                  Next Milestone
                </Text>
                <Text className="mt-3 font-display text-xl font-bold text-app-text">
                  Retirement Fund
                </Text>
              </View>
              <View className="items-end">
                <Text className="font-display text-xs font-medium uppercase tracking-[1.8px] text-app-soft">
                  Days to Target
                </Text>
                <Text className="mt-3 font-display text-base font-bold text-app-primary-strong">
                  124 Days
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add goal"
          onPress={() => router.push("/goals/add")}
          className="absolute bottom-6 right-6 h-16 w-16 items-center justify-center rounded-full bg-app-primary shadow-showcase-phone active:bg-app-primary-strong md:hidden">
          <MaterialCommunityIcons name="plus" size={31} color={colors.primaryContrast} />
        </Pressable>
      </View>
    </ScrollView>
  );
}
