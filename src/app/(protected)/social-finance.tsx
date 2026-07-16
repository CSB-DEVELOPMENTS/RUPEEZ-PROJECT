import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type MetricTone = "positive" | "negative" | "neutral" | "brand";
type GroupTone = "positive" | "negative" | "neutral";
type ActivityTone = "positive" | "negative";
type IconName = React.ComponentProps<typeof MaterialCommunityIcons>["name"];

type SocialMetric = {
  caption: string;
  change: string;
  icon: IconName;
  tone: MetricTone;
  value: string;
};

type ExpenseGroup = {
  balance: string;
  id: string;
  members: number;
  name: string;
  recurring: string;
  progress: number;
  progressLabel: string;
  position: string;
  tone: GroupTone;
};

type GroupMember = {
  dueAmount: string;
  name: string;
  paidAmount: string;
  role: string;
  status: string;
  tone: "positive" | "negative" | "neutral";
};

type GroupDetail = {
  breadcrumb: string;
  id: string;
  members: GroupMember[];
  nextPrediction: string;
  overview: { label: string; value: string }[];
  progress: number;
  progressLabel: string;
  settleLabel: string;
  title: string;
  totalText: string;
  subtitle: string;
};

type SettlementForm = {
  amount: string;
  date: string;
  notes: string;
  sourceWallet: string;
};

type SettlementBranch = {
  amount: string;
  label: string;
  note: string;
  tone: "positive" | "negative" | "neutral";
};

type SettlementGuide = {
  automatedLabel: string;
  breadcrumb: string;
  ctaLabel: string;
  footerNote: string;
  optimizedSummary: string;
  optimizedPaymentLabel: string;
  originalPaymentLabel: string;
  participants: SettlementBranch[];
  savingsLabel: string;
  subtitle: string;
  title: string;
  hubAmount: string;
  hubLabel: string;
  youAmount: string;
  youLabel: string;
};

type SettlementItem = {
  detail: string;
  icon: IconName;
  id: string;
  title: string;
  tone: ActivityTone;
  value: string;
};

type TransactionMode = "expense" | "income";

type SplitMember = {
  amount: string;
  enabled: boolean;
  name: string;
  role: string;
};

const SETTLEMENT_FORM: Record<string, SettlementForm> = {
  "trip-to-ella": {
    amount: "LKR 1,240",
    date: "Jul 16, 2026",
    notes: "Split for the island trip accommodation.",
    sourceWallet: "Main Savings (****3842)",
  },
  "college-friends": {
    amount: "LKR 2,100",
    date: "Jul 17, 2026",
    notes: "Reconcile the weekend reunion expenses.",
    sourceWallet: "Daily Wallet (****1204)",
  },
  "team-outing": {
    amount: "LKR 800",
    date: "Jul 16, 2026",
    notes: "Settle your share for the team dinner.",
    sourceWallet: "Main Savings (****3842)",
  },
  "office-project": {
    amount: "LKR 1,275",
    date: "Jul 18, 2026",
    notes: "Monthly project cost settlement.",
    sourceWallet: "Business Wallet (****7701)",
  },
};

const SETTLEMENT_GUIDES: Record<string, SettlementGuide> = {
  "trip-to-ella": {
    automatedLabel: "Automated",
    breadcrumb: "SOCIAL FINANCE / TRIP TO ELLA SETTLEMENT",
    ctaLabel: "Send Settlement Requests",
    footerNote: "Paid by one person, then split by the rest automatically.",
    optimizedPaymentLabel: "3 payments",
    optimizedSummary: "Instead of 6 payments",
    originalPaymentLabel: "Save LKR 7,800 in extra payments",
    participants: [
      { amount: "LKR 3,000", label: "Nimesh", note: "Pays into the main bucket", tone: "positive" },
      { amount: "LKR 1,250", label: "Supun", note: "Pays remaining balance", tone: "positive" },
    ],
    savingsLabel: "Low fee",
    subtitle: "Trip to Ella",
    title: "Optimized Settlement",
    hubAmount: "owes LKR 8,500",
    hubLabel: "Kevindu",
    youAmount: "Get LKR 7,250",
    youLabel: "You",
  },
  "college-friends": {
    automatedLabel: "Automated",
    breadcrumb: "SOCIAL FINANCE / COLLEGE FRIENDS SETTLEMENT",
    ctaLabel: "Send Settlement Requests",
    footerNote: "Use the shortest path first so everyone settles faster.",
    optimizedPaymentLabel: "2 payments",
    optimizedSummary: "Instead of 4 payments",
    originalPaymentLabel: "Save LKR 2,400 in extra payments",
    participants: [
      { amount: "LKR 1,200", label: "Dylan", note: "Pays his share to the hub", tone: "positive" },
      { amount: "LKR 900", label: "Anjali", note: "Completes the remaining balance", tone: "positive" },
    ],
    savingsLabel: "Low fee",
    subtitle: "College Friends",
    title: "Optimized Settlement",
    hubAmount: "owes LKR 4,500",
    hubLabel: "Hasini",
    youAmount: "Get LKR 2,100",
    youLabel: "You",
  },
  "team-outing": {
    automatedLabel: "Automated",
    breadcrumb: "SOCIAL FINANCE / TEAM OUTING SETTLEMENT",
    ctaLabel: "Send Settlement Requests",
    footerNote: "The group clears faster when only the net balances move.",
    optimizedPaymentLabel: "2 payments",
    optimizedSummary: "Instead of 3 payments",
    originalPaymentLabel: "Save LKR 1,250 in extra payments",
    participants: [
      { amount: "LKR 800", label: "Maya", note: "Pays the shared amount", tone: "positive" },
      { amount: "LKR 800", label: "Joel", note: "Pays the remaining balance", tone: "positive" },
    ],
    savingsLabel: "Low fee",
    subtitle: "Team Outing",
    title: "Optimized Settlement",
    hubAmount: "owes LKR 800",
    hubLabel: "Kavindu",
    youAmount: "You owe LKR 800",
    youLabel: "You",
  },
  "office-project": {
    automatedLabel: "Automated",
    breadcrumb: "SOCIAL FINANCE / OFFICE PROJECT SETTLEMENT",
    ctaLabel: "Send Settlement Requests",
    footerNote: "Netting the balances avoids round trips between the whole group.",
    optimizedPaymentLabel: "2 payments",
    optimizedSummary: "Instead of 4 payments",
    originalPaymentLabel: "Save LKR 3,100 in extra payments",
    participants: [
      { amount: "LKR 1,150", label: "Ishan", note: "Pays the first share", tone: "positive" },
      { amount: "LKR 925", label: "Tom", note: "Finishes the remaining balance", tone: "positive" },
    ],
    savingsLabel: "Low fee",
    subtitle: "Office Project",
    title: "Optimized Settlement",
    hubAmount: "owes LKR 6,200",
    hubLabel: "Aruna",
    youAmount: "Get LKR 1,275",
    youLabel: "You",
  },
};

const SPLIT_MEMBERS: SplitMember[] = [
  { amount: "LKR 30.00", enabled: true, name: "Alex", role: "Paid" },
  { amount: "LKR 30.00", enabled: true, name: "Mia", role: "Owes" },
  { amount: "LKR 30.00", enabled: false, name: "Liam", role: "Owes" },
  { amount: "LKR 30.00", enabled: true, name: "Sarah", role: "Owes" },
];

const SOCIAL_METRICS: SocialMetric[] = [
  {
    caption: "You are owed",
    change: "+12% from last month",
    icon: "account-cash-outline",
    tone: "positive",
    value: "LKR 24,680",
  },
  {
    caption: "You owe",
    change: "Next payment in 3 days",
    icon: "cash-minus",
    tone: "negative",
    value: "LKR 18,350",
  },
  {
    caption: "Net balance",
    change: "Positive cash flow",
    icon: "scale-balance",
    tone: "brand",
    value: "LKR 6,330",
  },
  {
    caption: "Active groups",
    change: "Two groups updated today",
    icon: "account-group-outline",
    tone: "neutral",
    value: "8",
  },
];

const EXPENSE_GROUPS: ExpenseGroup[] = [
  {
    balance: "LKR 3,450",
    id: "trip-to-ella",
    members: 6,
    name: "Trip to Ella",
    recurring: "No",
    progress: 50,
    progressLabel: "50%",
    position: "You are owed",
    tone: "positive",
  },
  {
    balance: "LKR 7,250",
    id: "college-friends",
    members: 12,
    name: "College Friends",
    recurring: "Monthly",
    progress: 70,
    progressLabel: "70%",
    position: "You are owed",
    tone: "positive",
  },
  {
    balance: "LKR 1,850",
    id: "team-outing",
    members: 8,
    name: "Team Outing",
    recurring: "No",
    progress: 28,
    progressLabel: "28%",
    position: "You owe",
    tone: "negative",
  },
  {
    balance: "LKR 4,300",
    id: "office-project",
    members: 4,
    name: "Office Project",
    recurring: "Weekly",
    progress: 61,
    progressLabel: "61%",
    position: "You are owed",
    tone: "positive",
  },
];

const GROUP_DETAILS: Record<string, GroupDetail> = {
  "trip-to-ella": {
    breadcrumb: "SOCIAL FINANCE / TRIP TO ELLA",
    id: "trip-to-ella",
    members: [
      {
        dueAmount: "LKR 0",
        name: "Sarah Mitchell",
        paidAmount: "LKR 12,400",
        role: "Organizer",
        status: "Settled",
        tone: "positive",
      },
      {
        dueAmount: "LKR 2,480",
        name: "Alex Chen",
        paidAmount: "LKR 0",
        role: "Member",
        status: "Pending",
        tone: "negative",
      },
      {
        dueAmount: "LKR 2,480",
        name: "Priya Silva",
        paidAmount: "LKR 0",
        role: "Member",
        status: "Pending",
        tone: "negative",
      },
      {
        dueAmount: "LKR 2,480",
        name: "Marcus Weber",
        paidAmount: "LKR 0",
        role: "Member",
        status: "Pending",
        tone: "negative",
      },
      {
        dueAmount: "LKR 2,480",
        name: "Elena Rodriguez",
        paidAmount: "LKR 0",
        role: "Member",
        status: "Pending",
        tone: "negative",
      },
    ],
    nextPrediction: "Based on group spending patterns, your next adventure could be Kandy (Budget: LKR 60k).",
    overview: [
      { label: "Total Spent", value: "LKR 23,220" },
      { label: "Your Share", value: "LKR 4,464" },
      { label: "Status", value: "You are owed LKR 1,240" },
    ],
    progress: 75,
    progressLabel: "3 out of 5 members have fully settled their shares.",
    settleLabel: "Settle Up",
    title: "Adventure Overview",
    totalText: "Dinner at Nine Arch",
    subtitle: "Trip to Ella",
  },
  "college-friends": {
    breadcrumb: "SOCIAL FINANCE / COLLEGE FRIENDS",
    id: "college-friends",
    members: [
      {
        dueAmount: "LKR 0",
        name: "Nimal Perera",
        paidAmount: "LKR 8,500",
        role: "Organizer",
        status: "Settled",
        tone: "positive",
      },
      {
        dueAmount: "LKR 1,200",
        name: "Hasini Fernando",
        paidAmount: "LKR 3,300",
        role: "Member",
        status: "Pending",
        tone: "neutral",
      },
      {
        dueAmount: "LKR 1,200",
        name: "Dylan Brown",
        paidAmount: "LKR 3,300",
        role: "Member",
        status: "Pending",
        tone: "negative",
      },
      {
        dueAmount: "LKR 0",
        name: "Anjali Kumari",
        paidAmount: "LKR 4,500",
        role: "Member",
        status: "Settled",
        tone: "positive",
      },
    ],
    nextPrediction: "Your next reunion could center on a beach day in Mirissa with a LKR 45k budget.",
    overview: [
      { label: "Total Spent", value: "LKR 18,950" },
      { label: "Your Share", value: "LKR 4,740" },
      { label: "Status", value: "You are owed LKR 2,100" },
    ],
    progress: 62,
    progressLabel: "2 out of 4 members have fully settled their shares.",
    settleLabel: "Request Split",
    title: "Group Overview",
    totalText: "Weekend Reunion",
    subtitle: "College Friends",
  },
  "team-outing": {
    breadcrumb: "SOCIAL FINANCE / TEAM OUTING",
    id: "team-outing",
    members: [
      {
        dueAmount: "LKR 800",
        name: "Kavindu Jayasuriya",
        paidAmount: "LKR 0",
        role: "Organizer",
        status: "Pending",
        tone: "negative",
      },
      {
        dueAmount: "LKR 0",
        name: "Maya Thomas",
        paidAmount: "LKR 800",
        role: "Member",
        status: "Settled",
        tone: "positive",
      },
      {
        dueAmount: "LKR 0",
        name: "Rashmi Ali",
        paidAmount: "LKR 800",
        role: "Member",
        status: "Settled",
        tone: "positive",
      },
      {
        dueAmount: "LKR 0",
        name: "Joel David",
        paidAmount: "LKR 800",
        role: "Member",
        status: "Settled",
        tone: "positive",
      },
    ],
    nextPrediction: "Keep it small for the next meetup: a city dinner night with a LKR 12k cap looks likely.",
    overview: [
      { label: "Total Spent", value: "LKR 11,600" },
      { label: "Your Share", value: "LKR 2,900" },
      { label: "Status", value: "You owe LKR 800" },
    ],
    progress: 45,
    progressLabel: "3 out of 4 members have settled.",
    settleLabel: "Pay Now",
    title: "Event Snapshot",
    totalText: "Monthly Outing",
    subtitle: "Team Outing",
  },
  "office-project": {
    breadcrumb: "SOCIAL FINANCE / OFFICE PROJECT",
    id: "office-project",
    members: [
      {
        dueAmount: "LKR 0",
        name: "Aruna Dias",
        paidAmount: "LKR 6,200",
        role: "Lead",
        status: "Settled",
        tone: "positive",
      },
      {
        dueAmount: "LKR 1,150",
        name: "Ishan Wickram",
        paidAmount: "LKR 2,800",
        role: "Member",
        status: "Pending",
        tone: "neutral",
      },
      {
        dueAmount: "LKR 0",
        name: "Nadia Khan",
        paidAmount: "LKR 3,100",
        role: "Member",
        status: "Settled",
        tone: "positive",
      },
      {
        dueAmount: "LKR 0",
        name: "Tom Silva",
        paidAmount: "LKR 2,900",
        role: "Member",
        status: "Settled",
        tone: "positive",
      },
    ],
    nextPrediction: "A smaller budgeting check-in is due next week, with a likely LKR 25k shared spend cap.",
    overview: [
      { label: "Total Spent", value: "LKR 14,100" },
      { label: "Your Share", value: "LKR 3,525" },
      { label: "Status", value: "You are owed LKR 1,275" },
    ],
    progress: 66,
    progressLabel: "3 out of 4 members have fully settled.",
    settleLabel: "Send Reminder",
    title: "Project Overview",
    totalText: "Office Project",
    subtitle: "Office Project",
  },
};

const SETTLEMENT_ACTIVITY: SettlementItem[] = [
  {
    detail: "From College Friends - 2h ago",
    icon: "bank-transfer-in",
    id: "payment-received-1",
    title: "Payment Received",
    tone: "positive",
    value: "+ LKR 1,200",
  },
  {
    detail: "To Team Outing - 6h ago",
    icon: "bank-transfer-out",
    id: "payment-sent-1",
    title: "Payment Sent",
    tone: "negative",
    value: "- LKR 800",
  },
  {
    detail: "From Trip to Ella - Yesterday",
    icon: "bank-transfer-in",
    id: "payment-received-2",
    title: "Payment Received",
    tone: "positive",
    value: "+ LKR 2,500",
  },
];

function metricToneClasses(tone: MetricTone) {
  switch (tone) {
    case "positive":
      return {
        badge: "bg-app-primary-muted",
        change: "text-app-primary-strong",
        icon: "#22C55E",
        value: "text-app-primary",
      };
    case "negative":
      return {
        badge: "bg-app-danger-muted",
        change: "text-app-danger",
        icon: "#EF4444",
        value: "text-app-danger",
      };
    case "brand":
      return {
        badge: "bg-app-brand-faint",
        change: "text-app-brand-strong",
        icon: "#3B82F6",
        value: "text-app-brand-strong",
      };
    default:
      return {
        badge: "bg-app-panel",
        change: "text-app-muted",
        icon: "#767A86",
        value: "text-app-text",
      };
  }
}

function groupToneClasses(tone: GroupTone) {
  if (tone === "positive") {
    return {
      badge: "bg-app-primary-muted text-app-primary-strong",
      bar: "bg-app-primary",
    };
  }

  if (tone === "negative") {
    return {
      badge: "bg-app-danger-muted text-app-danger",
      bar: "bg-app-danger",
    };
  }

  return {
    badge: "bg-app-panel text-app-muted",
    bar: "bg-app-brand",
  };
}

function statusToneClasses(tone: GroupMember["tone"]) {
  switch (tone) {
    case "positive":
      return "bg-app-primary-muted text-app-primary-strong";
    case "negative":
      return "bg-app-danger-muted text-app-danger";
    default:
      return "bg-app-panel text-app-muted";
  }
}

function activityToneClasses(tone: ActivityTone) {
  return tone === "positive"
    ? {
        badge: "bg-app-primary-muted",
        icon: "#22C55E",
        value: "text-app-primary",
      }
    : {
        badge: "bg-app-danger-muted",
        icon: "#EF4444",
        value: "text-app-danger",
      };
}

function settlementToneClasses(tone: SettlementBranch["tone"]) {
  switch (tone) {
    case "positive":
      return {
        accent: "border-app-primary bg-app-primary-muted",
        amount: "text-app-primary",
        icon: "arrow-up-right",
      } as const;
    case "negative":
      return {
        accent: "border-app-danger bg-app-danger-muted",
        amount: "text-app-danger",
        icon: "arrow-down-left",
      } as const;
    default:
      return {
        accent: "border-app-border bg-app-panel",
        amount: "text-app-text",
        icon: "arrow-right",
      } as const;
  }
}

function MetricCard({ item }: { item: SocialMetric }) {
  const classes = metricToneClasses(item.tone);

  return (
    <DashboardCard className="flex-1">
      <View className="gap-4">
        <View className="flex-row items-start justify-between gap-3">
          <View className={`h-12 w-12 items-center justify-center rounded-2xl ${classes.badge}`}>
            <MaterialCommunityIcons name={item.icon} size={22} color={classes.icon} />
          </View>
          <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
            {item.caption}
          </Text>
        </View>

        <View className="gap-1">
          <Text className={`font-display text-2xl font-semibold tracking-tight ${classes.value}`}>
            {item.value}
          </Text>
          <Text className={`font-display text-sm font-medium ${classes.change}`}>{item.change}</Text>
        </View>
      </View>
    </DashboardCard>
  );
}

function SocialFinanceHeaderButton({
  icon,
  tone = "neutral",
  onPress,
}: {
  icon: IconName;
  onPress?: () => void;
  tone?: "neutral" | "accent";
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={
        tone === "accent"
          ? "h-11 w-11 items-center justify-center rounded-2xl bg-app-primary text-app-primary-contrast active:opacity-90"
          : "h-11 w-11 items-center justify-center rounded-2xl border border-app-border bg-app-surface active:bg-app-panel"
      }>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={tone === "accent" ? "#F8FFFA" : "#767A86"}
      />
    </Pressable>
  );
}

function NewTransactionView({
  splitExpense,
  transactionMode,
  onBack,
  onSave,
  onToggleMode,
  onToggleSplitExpense,
}: {
  splitExpense: boolean;
  transactionMode: TransactionMode;
  onBack: () => void;
  onSave: () => void;
  onToggleMode: (mode: TransactionMode) => void;
  onToggleSplitExpense: () => void;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const amountLabel =
    transactionMode === "income" ? "0.00" : splitExpense ? "120.00" : "0.00";

  return (
    <View className="gap-5">
      <View className="flex-row items-center justify-between gap-4">
        <View className="gap-2">
          <Text className="font-display text-xs font-semibold uppercase tracking-[1.8px] text-app-primary-strong">
            SOCIAL FINANCE / NEW TRANSACTION
          </Text>
          <Text className="font-display text-3xl font-semibold tracking-tight text-app-text">
            New Transaction
          </Text>
          <Text className="font-display text-base text-app-muted">
            Record your cash flow with precision and mission control accuracy.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onBack}
          className="flex-row items-center gap-2 rounded-2xl border border-app-border bg-app-surface px-4 py-3 active:bg-app-panel">
          <MaterialCommunityIcons name="arrow-left" size={18} color={colors.textMuted} />
          <Text className="font-display text-sm font-semibold text-app-text">Back</Text>
        </Pressable>
      </View>

      <DashboardCard>
        <View className="gap-6">
          <View className="rounded-[24px] border border-app-border bg-app-panel/20 px-4 py-4">
            <View className="flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <View className="flex-row items-center rounded-2xl bg-app-bg px-1 py-1">
                {(["expense", "income"] as const).map((mode) => {
                  const active = transactionMode === mode;

                  return (
                    <Pressable
                      key={mode}
                      accessibilityRole="button"
                      onPress={() => onToggleMode(mode)}
                      className={
                        active
                          ? "rounded-xl bg-app-primary px-5 py-2"
                          : "rounded-xl px-5 py-2"
                      }>
                      <Text
                        className={
                          active
                            ? "font-display text-sm font-semibold capitalize text-app-primary-contrast"
                            : "font-display text-sm capitalize text-app-muted"
                        }>
                        {mode}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <View className="items-start md:items-end">
                <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                  Transaction amount
                </Text>
                <View className="mt-1 flex-row items-center gap-3">
                  <Text className="font-display text-2xl text-app-muted">$</Text>
                  <Text className="font-display text-4xl font-semibold tracking-tight text-app-primary">
                    {amountLabel}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="gap-2">
            <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
              Merchant or title
            </Text>
            <View className="flex-row items-center gap-3 rounded-[18px] border border-app-border bg-app-panel/30 px-4 py-4">
              <MaterialCommunityIcons name="storefront-outline" size={18} color={colors.textMuted} />
              <Text className="font-display text-sm text-app-muted">
                e.g. Starbucks, Monthly Rent, Amazon...
              </Text>
            </View>
          </View>

          <View className="gap-4 md:flex-row">
            <View className="flex-1 gap-2">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                Date of transaction
              </Text>
              <View className="flex-row items-center gap-3 rounded-[18px] border border-app-border bg-app-panel/30 px-4 py-4">
                <MaterialCommunityIcons name="calendar-blank-outline" size={18} color={colors.textMuted} />
                <Text className="font-display text-sm text-app-text">Jul 16, 2026</Text>
              </View>
            </View>

            <View className="flex-1 gap-2">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                Category
              </Text>
              <Pressable className="flex-row items-center justify-between rounded-[18px] border border-app-border bg-app-panel/30 px-4 py-4">
                <Text className="font-display text-sm text-app-text">
                  {transactionMode === "income" ? "Select Category" : "Food & Dining"}
                </Text>
                <MaterialCommunityIcons name="chevron-down" size={18} color={colors.textMuted} />
              </Pressable>
            </View>
          </View>

          <View className="gap-4 md:flex-row">
            <View className="flex-1 gap-2">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                Source wallet
              </Text>
              <Pressable className="flex-row items-center justify-between rounded-[18px] border border-app-border bg-app-panel/30 px-4 py-4">
                <Text className="font-display text-sm text-app-text">Priority Checking (...862)</Text>
                <MaterialCommunityIcons name="chevron-down" size={18} color={colors.textMuted} />
              </Pressable>
            </View>

            <View className="flex-1 gap-2">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                Recurring transaction
              </Text>
              <Pressable className="flex-row items-center justify-between rounded-[18px] border border-app-border bg-app-panel/30 px-4 py-4">
                <Text className="font-display text-sm text-app-text">One time</Text>
                <MaterialCommunityIcons name="chevron-down" size={18} color={colors.textMuted} />
              </Pressable>
            </View>
          </View>

          <Pressable
            accessibilityRole="switch"
            accessibilityState={{ checked: splitExpense }}
            onPress={onToggleSplitExpense}
            className="flex-row items-center justify-between rounded-[18px] border border-app-border bg-app-panel/20 px-4 py-4">
            <View className="flex-row items-center gap-3">
              <MaterialCommunityIcons name="source-branch" size={18} color={colors.textMuted} />
              <Text className="font-display text-sm font-medium text-app-text">Split expense</Text>
            </View>

            <View
              className={
                splitExpense
                  ? "h-6 w-11 rounded-full bg-app-primary px-1"
                  : "h-6 w-11 rounded-full bg-app-panel px-1"
              }>
              <View
                className={
                  splitExpense
                    ? "ml-auto mt-1 h-4 w-4 rounded-full bg-app-primary-contrast"
                    : "mt-1 h-4 w-4 rounded-full bg-app-text-muted"
                }
              />
            </View>
          </Pressable>

          {splitExpense ? (
            <View className="gap-3 rounded-[24px] border border-app-border bg-app-panel/10 px-4 py-4">
              <View className="flex-row items-center justify-between gap-4">
                <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                  Split details
                </Text>
                <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-primary">
                  50.0% / 6 people
                </Text>
              </View>

              {SPLIT_MEMBERS.map((member) => (
                <View
                  key={member.name}
                  className="flex-row items-center gap-3 rounded-[18px] border border-app-border bg-app-panel/30 px-3 py-3">
                  <View
                    className={
                      member.enabled
                        ? "h-9 w-9 items-center justify-center rounded-full bg-app-primary-muted"
                        : "h-9 w-9 items-center justify-center rounded-full bg-app-panel"
                    }>
                    <Text
                      className={
                        member.enabled
                          ? "font-display text-sm font-semibold text-app-primary-strong"
                          : "font-display text-sm font-semibold text-app-muted"
                      }>
                      {member.name.slice(0, 1)}
                    </Text>
                  </View>

                  <View className="min-w-0 flex-1">
                    <Text className="font-display text-sm font-semibold text-app-text">
                      {member.name}
                    </Text>
                    <Text className="font-display text-xs uppercase tracking-[1.2px] text-app-muted">
                      {member.role}
                    </Text>
                  </View>

                  <View className="min-w-[90px] rounded-xl border border-app-border bg-app-bg px-3 py-2">
                    <Text className="text-right font-display text-sm text-app-text">
                      {member.amount}
                    </Text>
                  </View>

                  <View
                    className={
                      member.enabled
                        ? "h-5 w-9 rounded-full bg-app-primary px-1"
                        : "h-5 w-9 rounded-full bg-app-panel px-1"
                    }>
                    <View
                      className={
                        member.enabled
                          ? "ml-auto mt-0.5 h-3.5 w-3.5 rounded-full bg-app-primary-contrast"
                          : "mt-0.5 h-3.5 w-3.5 rounded-full bg-app-text-muted"
                      }
                    />
                  </View>
                </View>
              ))}

              <View className="flex-row items-center justify-between border-t border-app-border pt-3">
                <Text className="font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-primary">
                  5 members
                </Text>
                <Text className="font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
                  50.0% / 6 people
                </Text>
              </View>
            </View>
          ) : null}

          <View className="gap-4 md:flex-row">
            <View className="flex-1 gap-2">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                Notes
              </Text>
              <View className="min-h-[112px] rounded-[18px] border border-app-border bg-app-panel/30 px-4 py-4">
                <Text className="font-display text-sm text-app-muted">
                  Add a description or reason for this transaction...
                </Text>
              </View>
            </View>

            <View className="flex-1 gap-2">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                Receipt attachment
              </Text>
              <View className="min-h-[112px] items-center justify-center rounded-[18px] border border-dashed border-app-border bg-app-panel/10 px-4 py-4">
                <MaterialCommunityIcons name="file-upload-outline" size={24} color={colors.primaryStrong} />
                <Text className="mt-3 font-display text-sm font-semibold text-app-text">
                  Upload or drop receipt
                </Text>
                <Text className="mt-1 font-display text-xs uppercase tracking-[1.2px] text-app-muted">
                  PNG, JPG or PDF
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row items-center justify-end gap-3 border-t border-app-border pt-4">
            <Pressable
              accessibilityRole="button"
              onPress={onBack}
              className="rounded-xl border border-app-border bg-app-surface px-5 py-3 active:bg-app-panel">
              <Text className="font-display text-sm font-semibold text-app-text">Cancel</Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={onSave}
              className="flex-row items-center gap-2 rounded-xl bg-app-primary px-5 py-3 active:opacity-90">
              <Text className="font-display text-sm font-semibold text-app-primary-contrast">
                Save Transaction
              </Text>
              <MaterialCommunityIcons name="check-circle-outline" size={16} color={colors.primaryContrast} />
            </Pressable>
          </View>
        </View>
      </DashboardCard>
    </View>
  );
}

function OptimizedSettlementView({
  detail,
  guide,
  onBack,
  onSend,
}: {
  detail: GroupDetail;
  guide: SettlementGuide;
  onBack: () => void;
  onSend: () => void;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="gap-5">
      <View className="gap-3 md:flex-row md:items-center md:justify-between">
        <View className="gap-2">
          <Text className="font-display text-xs font-semibold uppercase tracking-[1.8px] text-app-primary-strong">
            {guide.breadcrumb}
          </Text>
          <Text className="font-display text-3xl font-semibold tracking-tight text-app-text">
            {guide.title}
          </Text>
          <Text className="font-display text-base text-app-muted">
            For {detail.totalText}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onBack}
          className="self-start flex-row items-center gap-2 rounded-2xl border border-app-border bg-app-surface px-4 py-3 active:bg-app-panel md:self-auto">
          <MaterialCommunityIcons name="arrow-left" size={18} color={colors.textMuted} />
          <Text className="font-display text-sm font-semibold text-app-text">Back</Text>
        </Pressable>
      </View>

      <View className="gap-4 xl:flex-row">
        <DashboardCard className="xl:flex-1">
          <View className="gap-5">
            <View className="gap-3 md:flex-row md:items-start md:justify-between">
              <View className="gap-2">
                <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
                  Optimized Settlement
                </Text>
                <Text className="font-display text-base text-app-primary">
                  Save LKR 7,800 in extra payments
                </Text>
              </View>

              <View className="flex-row flex-wrap gap-2 self-start">
                <View className="rounded-full border border-app-primary bg-app-primary-muted px-3 py-1">
                  <Text className="font-display text-xs font-semibold uppercase tracking-[1.2px] text-app-primary-strong">
                    {guide.automatedLabel}
                  </Text>
                </View>
                <View className="rounded-full border border-app-border bg-app-panel px-3 py-1">
                  <Text className="font-display text-xs font-semibold uppercase tracking-[1.2px] text-app-muted">
                    {guide.savingsLabel}
                  </Text>
                </View>
              </View>
            </View>

            <View className="items-center rounded-[24px] border border-app-border bg-app-panel/20 px-5 py-6">
              <View className="items-center gap-2">
                <View className="h-16 w-16 items-center justify-center rounded-full border-2 border-app-primary bg-app-panel">
                  <MaterialCommunityIcons name="account" size={26} color={colors.primaryStrong} />
                </View>
                <Text className="font-display text-lg font-semibold text-app-text">{guide.youLabel}</Text>
                <Text className="font-display text-base font-semibold text-app-primary">
                  {guide.youAmount}
                </Text>
              </View>

              <View className="my-3 h-8 w-px border-l border-dashed border-app-primary/60" />

              <View className="items-center gap-2">
                <MaterialCommunityIcons name="arrow-down-bold" size={18} color={colors.primaryStrong} />
                <View className="h-16 w-16 items-center justify-center rounded-full border-2 border-app-border bg-app-surface">
                  <MaterialCommunityIcons name="account-group-outline" size={26} color={colors.textMuted} />
                </View>
                <Text className="font-display text-lg font-semibold text-app-text">{guide.hubLabel}</Text>
                <Text className="font-display text-base font-semibold text-app-danger">
                  {guide.hubAmount}
                </Text>
              </View>

              <View className="my-4 w-full flex-row items-center justify-between">
                <View className="h-px flex-1 border-t border-dashed border-app-primary/60" />
                <MaterialCommunityIcons name="arrow-right-bold" size={16} color={colors.primaryStrong} />
                <View className="h-px flex-1 border-t border-dashed border-app-primary/60" />
              </View>

              <View className="w-full flex-row gap-3">
                {guide.participants.map((participant) => {
                  const tone = settlementToneClasses(participant.tone);

                  return (
                    <View
                      key={participant.label}
                      className="flex-1 items-center gap-2 rounded-[22px] border border-app-border bg-app-bg px-4 py-4">
                      <View className={`h-12 w-12 items-center justify-center rounded-full border ${tone.accent}`}>
                        <MaterialCommunityIcons name={tone.icon} size={18} color={colors.primaryStrong} />
                      </View>
                      <Text className="font-display text-base font-semibold text-app-text">
                        {participant.label}
                      </Text>
                      <Text className={`font-display text-sm font-semibold ${tone.amount}`}>
                        {participant.amount}
                      </Text>
                      <Text className="text-center font-display text-xs leading-5 text-app-muted">
                        {participant.note}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </DashboardCard>

        <DashboardCard className="xl:w-[30%]">
          <View className="gap-6">
            <View className="gap-2">
              <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
                Summary
              </Text>
              <View className="h-px bg-app-border" />
            </View>

            <View className="items-center rounded-[24px] border border-app-border bg-app-panel/20 px-4 py-8">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                {guide.optimizedSummary}
              </Text>
              <Text className="mt-4 font-display text-4xl font-semibold tracking-tight text-app-primary">
                {guide.optimizedPaymentLabel}
              </Text>
            </View>

            <View className="gap-4">
              {[
                {
                  detail: "Calculated for maximum efficiency",
                  title: "Minimal transfers",
                },
                {
                  detail: "Skip redundant bank transactions",
                  title: "Save time & hassle",
                },
                {
                  detail: "Guaranteed group resolution",
                  title: "Everyone settles up",
                },
              ].map((item) => (
                <View key={item.title} className="flex-row items-start gap-3">
                  <MaterialCommunityIcons name="check-circle" size={20} color={colors.primaryStrong} />
                  <View className="flex-1">
                    <Text className="font-display text-base font-semibold text-app-text">
                      {item.title}
                    </Text>
                    <Text className="font-display text-sm text-app-muted">{item.detail}</Text>
                  </View>
                </View>
              ))}
            </View>

            <View className="gap-3 border-t border-app-border pt-4">
              <Pressable
                accessibilityRole="button"
                onPress={onSend}
                className="items-center rounded-2xl bg-app-primary px-5 py-4 active:opacity-90">
                <Text className="font-display text-sm font-semibold text-app-primary-contrast">
                  {guide.ctaLabel}
                </Text>
              </Pressable>
              <Text className="text-center font-display text-xs uppercase tracking-[1.2px] text-app-muted">
                {guide.footerNote}
              </Text>
            </View>
          </View>
        </DashboardCard>
      </View>
    </View>
  );
}

function SettlementFormView({
  detail,
  form,
  onBack,
  onCancel,
}: {
  detail: GroupDetail;
  form: SettlementForm;
  onBack: () => void;
  onCancel: () => void;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="gap-5">
      <View className="gap-3 md:flex-row md:items-center md:justify-between">
        <View className="gap-2">
          <Text className="font-display text-xs font-semibold uppercase tracking-[1.8px] text-app-primary-strong">
            {detail.breadcrumb} / Settle Up
          </Text>
          <Text className="font-display text-3xl font-semibold tracking-tight text-app-text">
            Settle Up
          </Text>
          <Text className="font-display text-base text-app-muted">
            Confirm your payment to balance group expenses.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onBack}
          className="self-start flex-row items-center gap-2 rounded-2xl border border-app-border bg-app-surface px-4 py-3 active:bg-app-panel md:self-auto">
          <MaterialCommunityIcons name="arrow-left" size={18} color={colors.textMuted} />
          <Text className="font-display text-sm font-semibold text-app-text">Back</Text>
        </Pressable>
      </View>

      <DashboardCard>
        <View className="gap-6">
          <View className="gap-3">
            <Text className="font-display text-sm font-semibold uppercase tracking-[1.4px] text-app-danger">
              You are owe {form.amount}
            </Text>

            <View className="rounded-[22px] border border-app-border bg-app-panel/30 px-4 py-4">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                Settlement amount
              </Text>
              <Text className="mt-2 font-display text-3xl font-semibold text-app-text">
                {form.amount}
              </Text>
            </View>
          </View>

          <View className="gap-4 md:flex-row">
            <View className="flex-1 gap-2">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                Source wallet
              </Text>
              <Pressable className="flex-row items-center justify-between rounded-[18px] border border-app-border bg-app-panel/30 px-4 py-4">
                <Text className="font-display text-sm text-app-text">{form.sourceWallet}</Text>
                <MaterialCommunityIcons name="chevron-down" size={18} color={colors.textMuted} />
              </Pressable>
            </View>

            <View className="flex-1 gap-2">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                Settlement date
              </Text>
              <View className="flex-row items-center gap-3 rounded-[18px] border border-app-border bg-app-panel/30 px-4 py-4">
                <MaterialCommunityIcons name="calendar-blank-outline" size={18} color={colors.textMuted} />
                <Text className="font-display text-sm text-app-text">{form.date}</Text>
              </View>
            </View>
          </View>

          <View className="gap-2">
            <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
              Notes
            </Text>
            <View className="rounded-[18px] border border-app-border bg-app-panel/30 px-4 py-4">
              <Text className="font-display text-sm text-app-muted">{form.notes}</Text>
            </View>
          </View>

          <View className="gap-2">
            <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
              Receipt attachment
            </Text>
            <View className="items-center justify-center rounded-[18px] border border-dashed border-app-border bg-app-panel/10 px-4 py-10">
              <MaterialCommunityIcons name="file-upload-outline" size={24} color={colors.textMuted} />
              <Text className="mt-3 font-display text-base text-app-text">
                Click or drag receipt to upload
              </Text>
              <Text className="mt-1 font-display text-xs uppercase tracking-[1.2px] text-app-muted">
                PDF, JPG, PNG, max 10MB
              </Text>
            </View>
          </View>

          <View className="gap-3">
            <Pressable className="items-center rounded-2xl bg-app-primary px-5 py-4 active:opacity-90">
              <Text className="font-display text-sm font-semibold text-app-primary-contrast">
                Confirm Settlement
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              onPress={onCancel}
              className="items-center rounded-2xl border border-app-border bg-app-surface px-5 py-4 active:bg-app-panel">
              <Text className="font-display text-sm font-semibold text-app-text">
                Cancel Transaction
              </Text>
            </Pressable>
          </View>
        </View>
      </DashboardCard>
    </View>
  );
}

function GroupDetailView({
  detail,
  onOpenOptimized,
  onSettle,
  onBack,
}: {
  detail: GroupDetail;
  onOpenOptimized: () => void;
  onSettle: () => void;
  onBack: () => void;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="gap-5">
      <View className="gap-3 md:flex-row md:items-center md:justify-between">
        <View className="gap-2">
          <Text className="font-display text-xs font-semibold uppercase tracking-[1.8px] text-app-primary-strong">
            {detail.breadcrumb}
          </Text>
          <Text className="font-display text-3xl font-semibold tracking-tight text-app-text">
            {detail.totalText}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onBack}
          className="self-start flex-row items-center gap-2 rounded-2xl border border-app-border bg-app-surface px-4 py-3 active:bg-app-panel md:self-auto">
          <MaterialCommunityIcons name="arrow-left" size={18} color={colors.textMuted} />
          <Text className="font-display text-sm font-semibold text-app-text">Back</Text>
        </Pressable>
      </View>

      <DashboardCard>
        <View className="flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <View className="gap-3">
            <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
              {detail.title}
            </Text>
            <Text className="font-display text-base text-app-muted">{detail.subtitle}</Text>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={onSettle}
            className="self-start rounded-2xl bg-app-primary px-5 py-3 active:opacity-90">
            <Text className="font-display text-sm font-semibold text-app-primary-contrast">
              {detail.settleLabel}
            </Text>
          </Pressable>
        </View>

        <View className="mt-6 flex-col gap-4 md:flex-row">
          {detail.overview.map((item) => (
            <View key={item.label} className="flex-1 rounded-[22px] border border-app-border bg-app-panel/20 px-4 py-4">
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                {item.label}
              </Text>
              <Text className="mt-2 font-display text-xl font-semibold tracking-tight text-app-text">
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </DashboardCard>

      <DashboardCard>
        <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
          Expense Breakdown: {detail.totalText}
        </Text>

        <View className="mt-5 gap-3 md:hidden">
          {detail.members.map((member) => (
            <View
              key={member.name}
              className="rounded-[20px] border border-app-border bg-app-panel/20 px-4 py-4">
              <View className="flex-row items-start justify-between gap-3">
                <View className="min-w-0 flex-1 gap-1">
                  <Text className="font-display text-lg font-semibold text-app-text">
                    {member.name}
                  </Text>
                  <Text className="font-display text-sm text-app-muted">{member.role}</Text>
                </View>
                <Text
                  numberOfLines={1}
                  className={`self-start rounded-full px-3 py-1 font-display text-xs font-semibold ${statusToneClasses(member.tone)}`}>
                  {member.status}
                </Text>
              </View>

              <View className="mt-4 flex-row gap-3">
                <View className="flex-1 rounded-2xl border border-app-border bg-app-bg px-3 py-3">
                  <Text className="font-display text-[11px] font-semibold uppercase tracking-[1.2px] text-app-muted">
                    Paid
                  </Text>
                  <Text className="mt-2 font-display text-base text-app-text">{member.paidAmount}</Text>
                </View>
                <View className="flex-1 rounded-2xl border border-app-border bg-app-bg px-3 py-3">
                  <Text className="font-display text-[11px] font-semibold uppercase tracking-[1.2px] text-app-muted">
                    Due
                  </Text>
                  <Text className="mt-2 font-display text-base font-semibold text-app-danger">
                    {member.dueAmount}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View className="mt-5 hidden overflow-hidden rounded-[20px] border border-app-border md:block">
          <View className="flex-row border-b border-app-border bg-app-panel/30 px-4 py-3">
            <Text className="w-[34%] font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
              Member
            </Text>
            <Text className="w-[18%] font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
              Role
            </Text>
            <Text className="w-[18%] font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
              Status
            </Text>
            <Text className="w-[15%] font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
              Paid
            </Text>
            <Text className="flex-1 font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
              Due
            </Text>
          </View>

          {detail.members.map((member) => (
            <View
              key={member.name}
              className="flex-row items-center border-b border-app-border px-4 py-4 last:border-b-0">
              <Text className="w-[34%] font-display text-sm font-semibold text-app-text">
                {member.name}
              </Text>
              <Text className="w-[18%] font-display text-sm text-app-muted">{member.role}</Text>
              <View className="w-[18%]">
                <Text className={`self-start rounded-full px-3 py-1 font-display text-xs font-semibold ${statusToneClasses(member.tone)}`}>
                  {member.status}
                </Text>
              </View>
              <Text className="w-[15%] font-display text-sm text-app-text">{member.paidAmount}</Text>
              <Text className="flex-1 font-display text-sm font-semibold text-app-danger">
                {member.dueAmount}
              </Text>
            </View>
          ))}
        </View>
      </DashboardCard>

      <View className="w-full gap-4 lg:flex-row">
        <Pressable
          accessibilityRole="button"
          onPress={onOpenOptimized}
          className="w-full lg:flex-1">
          <DashboardCard>
            <View className="gap-4 md:flex-row md:items-center">
              <View className="h-16 w-16 items-center justify-center rounded-full border-2 border-app-primary self-start md:self-auto">
                <Text className="font-display text-lg font-semibold text-app-primary">
                  {detail.progress}%
                </Text>
              </View>
              <View className="flex-1 gap-2">
                <View className="flex-row items-center gap-2">
                  <Text className="flex-1 font-display text-2xl font-semibold text-app-text md:text-xl">
                    Settlement Progress
                  </Text>
                  <MaterialCommunityIcons name="arrow-right" size={18} color={colors.primaryStrong} />
                </View>
                <Text className="font-display text-base leading-7 text-app-muted md:leading-6">
                  {detail.progressLabel}
                </Text>
                <Text className="font-display text-xs font-semibold uppercase tracking-[1.2px] text-app-primary">
                  Open optimized settlement
                </Text>
              </View>
            </View>
          </DashboardCard>
        </Pressable>

        <DashboardCard className="w-full lg:flex-1">
          <View className="flex-row items-start justify-between gap-4">
            <View className="flex-1 gap-2">
              <Text className="font-display text-xl font-semibold text-app-text">
                Next Trip Prediction
              </Text>
              <Text className="font-display text-base leading-6 text-app-muted">
                {detail.nextPrediction}
              </Text>
            </View>
            <MaterialCommunityIcons name="chart-line" size={20} color={colors.primaryStrong} />
          </View>
        </DashboardCard>
      </View>
    </View>
  );
}

export default function SocialFinance() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [showSettlementForm, setShowSettlementForm] = useState(false);
  const [showOptimizedSettlement, setShowOptimizedSettlement] = useState(false);
  const [showNewTransactionForm, setShowNewTransactionForm] = useState(false);
  const [transactionMode, setTransactionMode] = useState<TransactionMode>("expense");
  const [splitExpense, setSplitExpense] = useState(false);
  const selectedGroup = selectedGroupId ? GROUP_DETAILS[selectedGroupId] ?? null : null;
  const settlementForm = selectedGroupId ? SETTLEMENT_FORM[selectedGroupId] ?? null : null;
  const settlementGuide = selectedGroupId ? SETTLEMENT_GUIDES[selectedGroupId] ?? null : null;

  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <View className="relative overflow-hidden p-4 md:p-6">
          <View className="absolute -left-10 top-16 h-40 w-40 rounded-full bg-app-primary/10" />
          <View className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-app-brand/10" />

          <View className="relative gap-5">
            <View className="flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <View className="gap-2">
                <Text className="font-display text-3xl font-semibold tracking-tight text-app-text">
                  Social Finance
                </Text>
                <Text className="max-w-2xl font-display text-base leading-6 text-app-muted">
                  Split group expenses, watch balances, and settle payments without losing track.
                </Text>
              </View>

              <View className="flex-row flex-wrap items-center gap-3">
                <View className="hidden min-w-[260px] flex-row items-center gap-3 rounded-2xl border border-app-border bg-app-surface px-4 py-3 md:flex">
                  <MaterialCommunityIcons name="magnify" size={20} color={colors.textMuted} />
                  <Text className="flex-1 font-display text-sm text-app-muted">
                    Search groups or transactions...
                  </Text>
                </View>
                <View className="flex-row items-center gap-3">
                  <SocialFinanceHeaderButton
                    icon="plus"
                    tone="accent"
                    onPress={() => {
                      setShowNewTransactionForm(true);
                      setSelectedGroupId(null);
                      setShowSettlementForm(false);
                      setShowOptimizedSettlement(false);
                    }}
                  />
                  <SocialFinanceHeaderButton icon="bell-outline" />
                  <View className="h-11 w-11 items-center justify-center rounded-2xl border border-app-border bg-app-surface">
                    <MaterialCommunityIcons name="account" size={20} color={colors.primaryStrong} />
                  </View>
                </View>
              </View>
            </View>

            {showNewTransactionForm ? (
              <NewTransactionView
                splitExpense={splitExpense}
                transactionMode={transactionMode}
                onBack={() => setShowNewTransactionForm(false)}
                onSave={() => setShowNewTransactionForm(false)}
                onToggleMode={(mode) => {
                  setTransactionMode(mode);
                  if (mode === "income") {
                    setSplitExpense(false);
                  }
                }}
                onToggleSplitExpense={() => {
                  if (transactionMode === "expense") {
                    setSplitExpense((current) => !current);
                  }
                }}
              />
            ) : selectedGroup ? (
              showOptimizedSettlement && settlementGuide ? (
                <OptimizedSettlementView
                  detail={selectedGroup}
                  guide={settlementGuide}
                  onBack={() => setShowOptimizedSettlement(false)}
                  onSend={() => {
                    setShowOptimizedSettlement(false);
                    setShowSettlementForm(true);
                  }}
                />
              ) : showSettlementForm && settlementForm ? (
                <SettlementFormView
                  detail={selectedGroup}
                  form={settlementForm}
                  onBack={() => setShowSettlementForm(false)}
                  onCancel={() => {
                    setShowSettlementForm(false);
                  }}
                />
              ) : (
                <GroupDetailView
                  detail={selectedGroup}
                  onBack={() => {
                    setSelectedGroupId(null);
                    setShowSettlementForm(false);
                    setShowOptimizedSettlement(false);
                  }}
                  onOpenOptimized={() => {
                    setShowOptimizedSettlement(true);
                    setShowSettlementForm(false);
                  }}
                  onSettle={() => {
                    setShowSettlementForm(true);
                    setShowOptimizedSettlement(false);
                  }}
                />
              )
            ) : (
              <>
                <View className="mx-[-8px] flex-row flex-wrap">
                  {SOCIAL_METRICS.map((item) => (
                    <View key={item.caption} className="w-full p-2 md:w-1/2 xl:w-1/4">
                      <MetricCard item={item} />
                    </View>
                  ))}
                </View>

                <DashboardCard>
                  <View className="flex-row items-start justify-between gap-4">
                    <View className="gap-1">
                      <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
                        Expense Groups
                      </Text>
                      <Text className="font-display text-base text-app-muted">
                        Shared balances across your most active groups
                      </Text>
                    </View>

                    <View className="h-10 w-10 items-center justify-center rounded-2xl border border-app-border bg-app-panel/30">
                      <MaterialCommunityIcons name="chevron-down" size={20} color={colors.textMuted} />
                    </View>
                  </View>

                  <View className="mt-6 hidden flex-row items-center border-b border-app-border pb-3 md:flex">
                    <Text className="w-[26%] font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
                      Expense name
                    </Text>
                    <Text className="w-[10%] font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
                      Members
                    </Text>
                    <Text className="w-[12%] font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
                      Recurring
                    </Text>
                    <Text className="w-[18%] font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
                      Your position
                    </Text>
                    <Text className="w-[14%] font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
                      Balance
                    </Text>
                    <Text className="flex-1 font-display text-xs font-semibold uppercase tracking-[1.3px] text-app-muted">
                      Progress
                    </Text>
                  </View>

                  <View className="mt-4 gap-3">
                    {EXPENSE_GROUPS.map((group) => {
                      const tone = groupToneClasses(group.tone);

                      return (
                        <Pressable
                          key={group.id}
                          accessibilityRole="button"
                          onPress={() => {
                            setSelectedGroupId(group.id);
                            setShowSettlementForm(false);
                          }}
                          className="rounded-[24px] border border-app-border bg-app-panel/20 px-4 py-4 active:bg-app-panel/40">
                          <View className="flex-col gap-4 md:flex-row md:items-center md:gap-0">
                            <View className="md:w-[26%]">
                              <Text className="font-display text-lg font-semibold text-app-text">
                                {group.name}
                              </Text>
                              <Text className="mt-1 font-display text-sm text-app-muted md:hidden">
                                {group.members} members - {group.recurring} - {group.balance}
                              </Text>
                            </View>

                            <Text className="hidden md:block md:w-[10%] font-display text-base text-app-text">
                              {group.members}
                            </Text>

                            <Text className="hidden md:block md:w-[12%] font-display text-base text-app-text">
                              {group.recurring}
                            </Text>

                            <View className="md:w-[18%]">
                              <Text className={`self-start rounded-full px-3 py-1 font-display text-xs font-semibold ${tone.badge}`}>
                                {group.position}
                              </Text>
                            </View>

                            <Text className="font-display text-base font-semibold text-app-text md:w-[14%]">
                              {group.balance}
                            </Text>

                            <View className="flex-1 gap-2">
                              <View className="h-2 overflow-hidden rounded-full bg-app-panel">
                                <View className={`h-full rounded-full ${tone.bar}`} style={{ width: `${group.progress}%` }} />
                              </View>
                              <View className="flex-row items-center justify-between gap-3">
                                <Text className="font-display text-sm text-app-muted">
                                  {group.recurring} settlement
                                </Text>
                                <Text className="font-display text-sm font-semibold text-app-text">
                                  {group.progressLabel}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </Pressable>
                      );
                    })}
                  </View>

                  <View className="mt-5 flex-row items-center justify-between gap-4 border-t border-app-border pt-4">
                    <Text className="font-display text-sm text-app-muted">
                      Showing 1-4 of 13 groups
                    </Text>

                    <View className="flex-row items-center gap-2">
                      {["1", "2", "3"].map((page, index) => {
                        const active = index === 0;

                        return (
                          <View
                            key={page}
                            className={
                              active
                                ? "h-9 min-w-9 items-center justify-center rounded-xl bg-app-primary px-3"
                                : "h-9 min-w-9 items-center justify-center rounded-xl bg-app-panel/35 px-3"
                            }>
                            <Text
                              className={
                                active
                                  ? "font-display text-sm font-semibold text-app-primary-contrast"
                                  : "font-display text-sm font-semibold text-app-muted"
                              }>
                              {page}
                            </Text>
                          </View>
                        );
                      })}
                      <View className="h-9 w-9 items-center justify-center rounded-xl bg-app-panel/35">
                        <MaterialCommunityIcons name="chevron-right" size={18} color={colors.textMuted} />
                      </View>
                    </View>
                  </View>
                </DashboardCard>

                <DashboardCard>
                  <View className="flex-row items-start justify-between gap-4">
                    <View className="gap-1">
                      <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
                        Settlement Activity
                      </Text>
                      <Text className="font-display text-base text-app-muted">
                        Latest payments moving through your groups
                      </Text>
                    </View>

                    <View className="h-10 w-10 items-center justify-center rounded-2xl border border-app-border bg-app-panel/30">
                      <MaterialCommunityIcons name="filter-variant" size={20} color={colors.textMuted} />
                    </View>
                  </View>

                  <View className="mt-6 gap-3">
                    {SETTLEMENT_ACTIVITY.map((item) => {
                      const tone = activityToneClasses(item.tone);

                      return (
                        <View
                          key={item.id}
                          className="flex-row items-center gap-4 rounded-[22px] bg-app-panel/30 px-4 py-4">
                          <View className={`h-12 w-12 items-center justify-center rounded-2xl ${tone.badge}`}>
                            <MaterialCommunityIcons name={item.icon} size={22} color={tone.icon} />
                          </View>

                          <View className="min-w-0 flex-1">
                            <Text className="font-display text-lg font-semibold text-app-text">
                              {item.title}
                            </Text>
                            <Text className="font-display text-sm text-app-muted">{item.detail}</Text>
                          </View>

                          <Text className={`font-display text-lg font-semibold ${tone.value}`}>
                            {item.value}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </DashboardCard>
              </>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
