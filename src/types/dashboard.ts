export type DashboardStatTone = "negative" | "neutral" | "positive";

export type DashboardLegendTone = DashboardStatTone | "soft";

export type DashboardStat = {
  caption: string;
  detail: string;
  title: string;
  tone: DashboardStatTone;
  trend?: string;
  variant?: "progress" | "trend";
};

export type DashboardTransactionTone = "expense" | "income";

export type DashboardTransaction = {
  amount: string;
  category: string;
  merchant: string;
  note: string;
  tone: DashboardTransactionTone;
};

export type DashboardCategory = {
  label: string;
  tone: DashboardLegendTone;
  value: string;
};

export type DashboardCashFlowPoint = {
  expense: number;
  income: number;
  label: string;
};

export type DashboardOverviewData = {
  expenseTotal: string;
  incomeTotal: string;
  points: DashboardCashFlowPoint[];
  periodLabel: string;
};

export type DashboardCalendarActivity = {
  amount: number;
  category?: string;
  id: string;
  label: string;
  time?: string;
  type?: "expense" | "income";
};

export type DashboardCalendarDay = {
  activities: DashboardCalendarActivity[];
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
