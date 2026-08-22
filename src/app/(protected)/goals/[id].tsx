import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { Href } from "expo-router";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type Member = {
  name: string;
  role?: string;
  initials: string;
  avatarClassName: string;
};

type Contribution = {
  date: string;
  mobileDate: string;
  description: string;
  contributor: string;
  amount: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  avatarClassName: string;
};

const members: Member[] = [
  { name: "Alex Mitchell", role: "Owner", initials: "AM", avatarClassName: "bg-app-brand/20" },
  { name: "Sarah Smith", role: "Contributor", initials: "SS", avatarClassName: "bg-app-primary-muted" },
  { name: "Mike Ross", role: "Contributor", initials: "MR", avatarClassName: "bg-app-panel-strong" },
];

const contributions: Contribution[] = [
  {
    date: "May 15, 2024",
    mobileDate: "12 May 2024",
    description: "Monthly Deposit",
    contributor: "Me",
    amount: "+ LKR 15,000",
    icon: "wallet-outline",
    avatarClassName: "bg-app-brand/20",
  },
  {
    date: "Apr 28, 2024",
    mobileDate: "05 May 2024",
    description: "Bonus Allocation",
    contributor: "Sarah Smith",
    amount: "+ LKR 25,000",
    icon: "party-popper",
    avatarClassName: "bg-app-primary-muted",
  },
  {
    date: "Apr 15, 2024",
    mobileDate: "28 Apr 2024",
    description: "Monthly Deposit",
    contributor: "Me",
    amount: "+ LKR 15,000",
    icon: "wallet-outline",
    avatarClassName: "bg-app-brand/20",
  },
  {
    date: "Mar 30, 2024",
    mobileDate: "30 Mar 2024",
    description: "Spare Change Roundup",
    contributor: "Mike Ross",
    amount: "+ LKR 2,450",
    icon: "piggy-bank-outline",
    avatarClassName: "bg-app-panel-strong",
  },
];

function getContributionHref(id: string | string[] | undefined) {
  const slug = Array.isArray(id) ? id[0] : id;

  return `/goals/${slug ?? "buy-macbook-air"}/contribute` as Href;
}

function Avatar({
  className,
  initials,
  size = "md",
}: {
  className: string;
  initials: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = size === "lg" ? "h-10 w-10" : size === "sm" ? "h-7 w-7" : "h-8 w-8";

  return (
    <View
      className={`${sizeClass} items-center justify-center rounded-full border border-app-border ${className}`}>
      <Text className="font-display text-[10px] font-bold text-app-text">{initials}</Text>
    </View>
  );
}

function GoalIcon() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="h-12 w-12 items-center justify-center rounded-[8px] bg-app-primary-muted">
      <MaterialCommunityIcons name="laptop" size={26} color={colors.primaryStrong} />
    </View>
  );
}

function ProgressRing({ compact = false }: { compact?: boolean }) {
  return (
    <View
      className={`items-center justify-center rounded-full border-[16px] border-app-primary ${
        compact ? "h-[168px] w-[168px]" : "h-[250px] w-[250px]"
      }`}>
      <Text className={`${compact ? "text-xl" : "text-4xl"} font-display font-bold text-app-primary`}>
        60%
      </Text>
      <Text className="mt-1 font-display text-xs font-bold uppercase tracking-[1.6px] text-app-muted">
        Complete
      </Text>
    </View>
  );
}

function DesktopProgressCard() {
  return (
    <View className="min-h-[610px] flex-1 items-center justify-center rounded-[10px] border border-app-border bg-black px-8 py-12">
      <ProgressRing />
      <View className="mt-12 items-center">
        <View className="flex-row items-end gap-3">
          <Text className="font-display text-4xl font-bold text-app-text">LKR 180,000</Text>
          <Text className="pb-1 font-display text-base text-app-muted">of LKR 300,000</Text>
        </View>
        <Text className="mt-4 max-w-md text-center font-display text-sm leading-5 text-app-muted">
          You are making great progress! Only LKR 120,000 left to reach your goal.
        </Text>
      </View>
    </View>
  );
}

function DetailRow({
  icon,
  label,
  value,
  status,
}: {
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  label: string;
  value?: string;
  status?: string;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="flex-row items-center justify-between border-b border-app-primary/25 py-6 last:border-b-0">
      <View className="flex-row items-center gap-4">
        <MaterialCommunityIcons name={icon} size={24} color={colors.textMuted} />
        <Text className="font-display text-sm text-app-muted">{label}</Text>
      </View>
      {status ? (
        <View className="rounded-full border border-app-primary/25 bg-app-primary-muted px-4 py-1.5">
          <Text className="font-display text-xs font-bold text-app-primary-strong">• {status}</Text>
        </View>
      ) : (
        <Text className="font-display text-sm font-bold text-app-text">{value}</Text>
      )}
    </View>
  );
}

function TargetDetailsCard() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="rounded-[10px] border border-app-border bg-black p-6">
      <View className="mb-5 flex-row items-center justify-between">
        <Text className="font-display text-xl font-bold text-app-text">Target Details</Text>
        <MaterialCommunityIcons name="calendar-check-outline" size={25} color={colors.primary} />
      </View>
      <DetailRow icon="calendar-month-outline" label="Target Date" value="20 Dec 2025" />
      <DetailRow icon="timer-outline" label="Days Remaining" value="210 Days" />
      <DetailRow icon="chart-box-outline" label="Status" status="On Track" />
    </View>
  );
}

function DesktopMembersCard() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="rounded-[10px] border border-app-border bg-black p-6">
      <View className="mb-7 flex-row items-center justify-between">
        <Text className="font-display text-xl font-bold text-app-text">Goal Members</Text>
        <MaterialCommunityIcons name="account-group-outline" size={25} color={colors.primary} />
      </View>
      <View className="gap-5">
        {members.map((member, index) => (
          <View key={member.name} className="flex-row items-center gap-3">
            <Avatar
              className={member.avatarClassName}
              initials={member.initials}
              size={index === 0 ? "md" : "sm"}
            />
            <Text className="font-display text-sm font-medium text-app-text">
              {member.name}
              {index === 0 ? " (Me)" : ""}
            </Text>
          </View>
        ))}
      </View>
      <Text className="mt-8 font-display text-sm text-app-muted">
        3 members contributing to this goal.
      </Text>
    </View>
  );
}

function MobileMetricCard({
  label,
  value,
  status,
}: {
  label: string;
  value?: string;
  status?: string;
}) {
  return (
    <View className="flex-1 rounded-[8px] border border-app-border bg-app-panel p-4">
      <Text className="font-display text-sm uppercase text-app-soft">{label}</Text>
      {status ? (
        <View className="mt-2 flex-row items-center gap-1.5">
          <MaterialCommunityIcons name="check-circle" size={17} color="#4ADE80" />
          <Text className="font-display text-sm font-bold text-app-primary-strong">{status}</Text>
        </View>
      ) : (
        <Text className="mt-2 font-display text-base font-bold text-app-text">{value}</Text>
      )}
    </View>
  );
}

function MobileProgressCard() {
  return (
    <View className="items-center rounded-[10px] border border-app-border bg-black px-6 py-9">
      <ProgressRing compact />
      <Text className="mt-10 font-display text-lg text-app-text">LKR 180,000</Text>
      <Text className="mt-1 font-display text-base text-app-muted">of LKR 300,000</Text>
    </View>
  );
}

function MobileMembersCard() {
  return (
    <View className="overflow-hidden rounded-[10px] border border-app-border bg-black">
      <View className="border-b border-app-border px-4 py-5">
        <Text className="font-display text-base text-app-text">Goal Members</Text>
      </View>
      <View className="gap-5 px-4 py-5">
        {members.map((member) => (
          <View key={member.name} className="flex-row items-center gap-3">
            <Avatar className={member.avatarClassName} initials={member.initials} size="lg" />
            <View>
              <Text className="font-display text-base text-app-text">{member.name}</Text>
              <Text className="font-display text-base text-app-muted">{member.role}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function Pagination() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="flex-row items-center justify-end gap-4 px-6 py-4">
      <MaterialCommunityIcons name="chevron-left" size={18} color={colors.textMuted} />
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
      <MaterialCommunityIcons name="chevron-right" size={18} color={colors.textMuted} />
    </View>
  );
}

function DesktopContributionHistory() {
  return (
    <View className="overflow-hidden rounded-[10px] border border-app-border bg-black">
      <View className="flex-row items-center justify-between px-6 py-8">
        <Text className="font-display text-xl font-bold text-app-text">Contribution History</Text>
        <Pressable className="h-9 items-center justify-center rounded-[4px] bg-app-panel-strong px-4">
          <Text className="font-display text-sm text-app-text">Filter</Text>
        </Pressable>
      </View>

      <View className="flex-row border-y border-app-primary/25 px-6 py-4">
        {["Date", "Description", "Contributor", "Amount"].map((heading, index) => (
          <Text
            key={heading}
            className={`font-display text-xs font-bold uppercase tracking-[1.8px] text-app-muted ${
              index === 0 ? "w-[22%]"
              : index === 1 ? "w-[36%]"
              : index === 2 ? "w-[22%]"
              : "w-[20%] text-right"
            }`}>
            {heading}
          </Text>
        ))}
      </View>

      {contributions.map((contribution) => (
        <View
          key={`${contribution.description}-${contribution.date}`}
          className="flex-row items-center border-b border-app-primary/25 px-6 py-5">
          <Text className="w-[22%] font-display text-sm text-app-text">{contribution.date}</Text>
          <View className="w-[36%] flex-row items-center gap-3">
            <MaterialCommunityIcons name={contribution.icon} size={19} color="#4ADE80" />
            <Text className="font-display text-sm text-app-text">{contribution.description}</Text>
          </View>
          <View className="w-[22%] flex-row items-center gap-3">
            <Avatar className={contribution.avatarClassName} initials={contribution.contributor.slice(0, 2)} size="sm" />
            <Text className="font-display text-sm text-app-text">{contribution.contributor}</Text>
          </View>
          <Text className="w-[20%] text-right font-display text-sm font-bold text-app-primary-strong">
            {contribution.amount}
          </Text>
        </View>
      ))}

      <View className="flex-row items-center justify-between">
        <Text className="px-6 font-display text-sm text-app-muted">
          Showing <Text className="text-app-text">1-4</Text> of 12 contributions
        </Text>
        <Pagination />
      </View>
    </View>
  );
}

function MobileContributions() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="overflow-hidden rounded-[10px] border border-app-border bg-black">
      <View className="flex-row items-center justify-between border-b border-app-border px-4 py-5">
        <Text className="font-display text-base text-app-text">Contributions</Text>
        <MaterialCommunityIcons name="filter-variant" size={24} color={colors.primary} />
      </View>
      {contributions.slice(0, 3).map((contribution) => (
        <View
          key={`${contribution.description}-${contribution.mobileDate}`}
          className="flex-row items-center justify-between border-b border-app-border px-4 py-5">
          <View>
            <Text className="font-display text-base text-app-text">
              {contribution.contributor === "Me" ? "Alex Mitchell" : contribution.contributor}
            </Text>
            <Text className="mt-1 font-display text-base text-app-muted">{contribution.mobileDate}</Text>
          </View>
          <Text className="font-display text-base text-app-primary-strong">
            {contribution.amount.replace(" ", "")}
          </Text>
        </View>
      ))}
      <Pagination />
    </View>
  );
}

function DesktopGoalDetails() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="mx-auto hidden w-full px-4 pb-10 pt-2 md:flex md:px-8 lg:px-10">
      <View className="mb-8 flex-row items-start justify-between gap-6">
        <View className="min-w-0 flex-1">
          <View className="flex-row items-center gap-4">
            <GoalIcon />
            <View className="min-w-0">
              <Text className="font-display text-4xl font-bold text-app-text">Buy MacBook Air</Text>
              <View className="mt-3 flex-row items-center gap-3">
                <Text className="font-display text-base text-app-muted">Electronics</Text>
                <View className="h-1 w-1 rounded-full bg-app-muted" />
                <View className="rounded-[4px] border border-app-brand bg-app-brand-faint/35 px-3 py-1">
                  <Text className="font-display text-[10px] font-bold uppercase text-app-primary-strong">
                    Shared Goal
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="mt-9 flex-row gap-3">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add contribution"
            onPress={() => router.push(getContributionHref(id))}
            className="h-10 flex-row items-center gap-2 rounded-[8px] bg-app-primary px-5 active:bg-app-primary-strong">
            <MaterialCommunityIcons name="plus" size={18} color={colors.primaryContrast} />
            <Text className="font-display text-sm font-bold text-app-primary-contrast">
              Contribute
            </Text>
          </Pressable>
          <Pressable className="h-10 w-10 items-center justify-center rounded-[6px] border border-app-primary/30 active:bg-app-panel">
            <MaterialCommunityIcons name="pencil-outline" size={23} color={colors.text} />
          </Pressable>
          <Pressable className="h-10 w-10 items-center justify-center rounded-[6px] border border-app-primary/30 active:bg-app-panel">
            <MaterialCommunityIcons name="dots-vertical" size={24} color={colors.text} />
          </Pressable>
        </View>
      </View>

      <View className="gap-6 xl:flex-row">
        <DesktopProgressCard />
        <View className="gap-6 xl:w-[320px]">
          <TargetDetailsCard />
          <DesktopMembersCard />
        </View>
      </View>

      <View className="mt-8">
        <DesktopContributionHistory />
      </View>
    </View>
  );
}

function MobileGoalDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="px-4 pb-24 pt-2 md:hidden">
      <View className="mb-6 flex-row items-center gap-4">
        <GoalIcon />
        <View>
          <Text className="font-display text-lg text-app-text">Buy MacBook Air</Text>
          <View className="mt-1 self-start rounded-full border border-app-border bg-app-panel px-3 py-1">
            <Text className="font-display text-xs uppercase text-app-muted">Personal</Text>
          </View>
        </View>
      </View>

      <MobileProgressCard />

      <View className="mt-6 gap-3">
        <View className="flex-row gap-3">
          <MobileMetricCard label="Target Date" value="20 Dec 2025" />
          <MobileMetricCard label="Status" status="On Track" />
        </View>
        <MobileMetricCard label="Time Remaining" value="210 Days" />
      </View>

      <View className="mt-6">
        <MobileMembersCard />
      </View>

      <View className="mt-6">
        <MobileContributions />
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add contribution"
        onPress={() => router.push(getContributionHref(id))}
        className="absolute bottom-7 right-6 h-16 w-16 items-center justify-center rounded-full bg-app-primary shadow-showcase-phone active:bg-app-primary-strong">
        <MaterialCommunityIcons name="plus" size={31} color="#041009" />
      </Pressable>
    </View>
  );
}

export default function GoalDetailsScreen() {
  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <DesktopGoalDetails />
      <MobileGoalDetails />
    </ScrollView>
  );
}
