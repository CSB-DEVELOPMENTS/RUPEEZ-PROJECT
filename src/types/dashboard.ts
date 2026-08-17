import { Href } from "expo-router";

export type DashboardStatTone = "negative" | "neutral" | "positive";

export type DashboardLegendTone = DashboardStatTone | "soft";

export type DashboardStat = {
  caption: string;
  detail: string;
  href?: Href;
  title: string;
  tone: DashboardStatTone;
  trend?: string;
};

export type DashboardTransactionTone = "expense" | "income" | "transfer";

export type CashFlowEntryIcon =
  | "briefcase"
  | "chart"
  | "crypto"
  | "invoice"
  | "home"
  | "car"
  | "food"
  | "bill"
  | "cart"
  | "bank"
  | "transfer";

export type DashboardTransaction = {
  id: string;
  amount: number;
  account?: string;
  category: string;
  title: string;
  tone: DashboardTransactionTone;
  note?: string;
  date?: string;
  icon?: CashFlowEntryIcon;
  time?: string;
};

export type TransactionsPageData = {
  dateRange: string;
  filters: string[];
  pagination: { currentPage: number; pageSize: number; totalItems: number; totalPages: number };
  searchPlaceholder: string;
  subtitle: string;
  title: string;
  transactions: DashboardTransaction[];
};

export type DashboardCategory = { label: string; value: string };

export type DashboardCashFlowPoint = { expense: number; income: number; label: string };

export type DashboardOverviewData = {
  detailHref?: "/cash-flow";
  expenseTotal?: string;
  incomeTotal?: string;
  points: DashboardCashFlowPoint[];
  periodLabel: string;
  fileterRanges?: string[];
};

export type CashFlowMetricTone = "negative" | "neutral" | "positive";

export type CashFlowHeroMetric = { label: string; tone: CashFlowMetricTone; value: string };

export type CashFlowHeroData = {
  periodLabel: string;
  title: string;
  totalValue: string;
  totals: CashFlowHeroMetric[];
};

export type DashboardCalendarDay = {
  activities: DashboardTransaction[];
  activityCount: number;
  date: string;
  dayLabel: string;
  isCurrentMonth: boolean;
  tone?: DashboardLegendTone;
  totalLabel?: string;
};

export type DashboardPortfolioAsset = {
  change: string;
  chipTone: "brand" | "primary";
  subtitle: string;
  symbol: string;
  value: string;
};

export type DashboardSubscriptionAvatar = {
  label: string;
  tone: "brand" | "neutral" | "negative" | "positive";
};

export type DashboardSubscriptionsOverviewData = {
  activeCountLabel: string;
  detailHref?: "/subscriptions";
  items: DashboardSubscriptionAvatar[];
  summaryValue: string;
};

export type SubscriptionSummaryCardData = {
  detail: string;
  eyebrow: string;
  id: string;
  meta?: string;
  tone: DashboardSubscriptionAvatar["tone"];
  value: string;
};

export type ActiveSubscriptionItem = {
  amountLabel: string;
  billingCycleLabel: string;
  id: string;
  isActive: boolean;
  name: string;
  plan: string;
  renewalLabel: string;
  statusLabel: string;
  tone: DashboardSubscriptionAvatar["tone"];
};

export type ActiveSubscriptionsPageData = {
  dateRange: string;
  searchPlaceholder: string;
  subtitle: string;
  summaryCards: SubscriptionSummaryCardData[];
  subscriptions: ActiveSubscriptionItem[];
  title: string;
};

export type DashboardSafeSpendSummary = {
  availableNow: string;
  dailyTarget: string;
  percentRemaining: number;
  resetIn: string;
  title: string;
};

export type DashboardSafeSpendStat = { detail: string; title: string; value: string };

export type DashboardSafeSpendObligation = { amount: string; dueLabel: string; name: string };

export type DashboardSafeSpendFlowItem = {
  amount: string;
  label: string;
  note: string;
  tone: "expense" | "income";
};
