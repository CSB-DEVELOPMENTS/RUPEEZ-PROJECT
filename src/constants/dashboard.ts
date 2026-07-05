import type {
  CashFlowHeroData,
  DashboardCalendarActivity,
  DashboardCalendarDay,
  DashboardCategory,
  DashboardOverviewData,
  DashboardPortfolioAsset,
  DashboardSafeSpendFlowItem,
  DashboardSafeSpendObligation,
  DashboardSafeSpendStat,
  DashboardSafeSpendSummary,
  DashboardStat,
  DashboardSubscriptionAvatar,
  DashboardTransaction,
} from "@/types/dashboard";

export const DASHBOARD_GREETING = "Good morning, Tharindu";
export const DASHBOARD_OVERVIEW_COPY = "Here's your financial overview for the week.";
export const DASHBOARD_DATE_RANGE = "May 12 - May 18, 2025";

export const DASHBOARD_STATS: DashboardStat[] = [
  {
    caption: "Safe to spend",
    detail: "After bills this month",
    href: "/safe-to-spend",
    title: "LKR 48,750.00",
    tone: "positive",
    trend: "72%",
    variant: "progress",
  },
  {
    caption: "Total balance",
    detail: "Across 5 accounts",
    title: "LKR 268,750.00",
    tone: "neutral",
    variant: "trend",
  },
  {
    caption: "Monthly income",
    detail: "Steady rhythm this week",
    title: "LKR 180,000.00",
    tone: "positive",
    trend: "+12%",
    variant: "trend",
  },
  {
    caption: "Monthly expenses",
    detail: "Slightly lower than forecast",
    title: "LKR 96,250.00",
    tone: "negative",
    trend: "-8%",
    variant: "trend",
  },
];

export const DASHBOARD_OVERVIEW: DashboardOverviewData = {
  detailHref: "/cash-flow",
  expenseTotal: "LKR 96,250.00",
  incomeTotal: "LKR 180,000.00",
  periodLabel: "May 2025",
  points: [
    { expense: 18, income: 34, label: "1" },
    { expense: 22, income: 41, label: "5" },
    { expense: 19, income: 38, label: "10" },
    { expense: 31, income: 57, label: "15" },
    { expense: 24, income: 48, label: "20" },
    { expense: 29, income: 61, label: "25" },
    { expense: 27, income: 54, label: "30" },
  ],
};

export const DASHBOARD_OVERVIEW_FULL: DashboardOverviewData = {
  periodLabel: "May 2025",
  points: [
    { expense: 18, income: 34, label: "1" },
    { expense: 22, income: 41, label: "5" },
    { expense: 19, income: 38, label: "10" },
    { expense: 31, income: 57, label: "15" },
    { expense: 24, income: 48, label: "20" },
    { expense: 29, income: 61, label: "25" },
    { expense: 27, income: 54, label: "30" },
  ],
  fileterRanges: ["1M", "3M", "6M", "YTD"],
};

export const DASHBOARD_TRANSACTIONS: DashboardTransaction[] = [
  {
    id: "1",
    amount: 2450,
    category: "Food",
    title: "Keells Super",
    note: "Today",
    tone: "expense",
  },
  {
    id: "2",
    amount: -1150,
    category: "Transport",
    title: "Uber Ride",
    note: "Today",
    tone: "expense",
  },
  {
    id: "3",
    amount: 180000,
    category: "Income",
    title: "Monthly Salary",
    note: "Yesterday",
    tone: "income",
  },
];

export const DASHBOARD_CATEGORIES: DashboardCategory[] = [
  { label: "Food & Groceries", tone: "positive", value: "34%" },
  { label: "Transport", tone: "neutral", value: "18%" },
  { label: "Shopping", tone: "soft", value: "14%" },
];

function resolveCalendarTone(activities: DashboardCalendarActivity[]) {
  const totalIncomeValue = activities.reduce((total, activity) => {
    if (activity.type === "income" && activity.amount) {
      return total + activity.amount;
    }
    return total;
  }, 0);
  const totalExpenseValue = activities.reduce((total, activity) => {
    if (activity.type === "expense" && activity.amount) {
      return total + activity.amount;
    }
    return total;
  }, 0);
  const totalValue = totalIncomeValue - totalExpenseValue;

  if (totalValue > 0) {
    return "positive" as const;
  } else if (totalValue < 0) {
    return "negative" as const;
  } else if (totalValue === 0 && activities.length > 0) {
    return "neutral" as const;
  }

  return undefined;
}

function createMonthCalendarDays(
  year: number,
  monthIndex: number, // 0-based month index (0 = January, 11 = December)
  entries: Record<string, DashboardCalendarActivity[]>,
) {
  const firstDay = new Date(Date.UTC(year, monthIndex, 1));
  const firstWeekday = (firstDay.getUTCDay() + 6) % 7;
  const daysInMonth = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  const previousMonthDays = new Date(Date.UTC(year, monthIndex, 0)).getUTCDate();
  const cells: DashboardCalendarDay[] = [];

  for (let index = firstWeekday - 1; index >= 0; index -= 1) {
    const day = previousMonthDays - index;
    const date = new Date(Date.UTC(year, monthIndex - 1, day));

    cells.push({
      activities: [],
      activityCount: 0,
      date: date.toISOString().slice(0, 10),
      dayLabel: `${day}`,
      isCurrentMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(Date.UTC(year, monthIndex, day));
    const isoDate = date.toISOString().slice(0, 10);
    const activities = entries[isoDate] ?? [];

    cells.push({
      activities,
      activityCount: activities.length,
      date: isoDate,
      dayLabel: `${day}`,
      isCurrentMonth: true,
      tone: resolveCalendarTone(activities),
      totalLabel:
        activities.length > 0
          ? `${activities.length} activit${activities.length === 1 ? "y" : "ies"}`
          : undefined,
    });
  }

  const trailingDays = (7 - (cells.length % 7)) % 7;

  for (let day = 1; day <= trailingDays; day += 1) {
    const date = new Date(Date.UTC(year, monthIndex + 1, day));

    cells.push({
      activities: [],
      activityCount: 0,
      date: date.toISOString().slice(0, 10),
      dayLabel: `${day}`,
      isCurrentMonth: false,
    });
  }

  return cells;
}

export function getDashboardCalendarMonthLabel(year: number, monthIndex: number) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(Date.UTC(year, monthIndex, 1)));
}

const JULY_2026_ACTIVITY_ENTRIES: Record<string, DashboardCalendarActivity[]> = {
  "2026-07-02": [
    {
      amount: 2450.0,
      category: "Food",
      id: "grocery-run",
      label: "Keells grocery run",
      time: "6:10 PM",
      type: "expense",
    },
  ],
  "2026-07-04": [
    {
      amount: 1850.0,
      category: "Bills",
      id: "wifi-bill",
      label: "Wi-Fi bill paid",
      time: "8:30 AM",
      type: "expense",
    },
    {
      amount: 850.0,
      category: "Transport",
      id: "fuel-top-up",
      label: "Fuel top-up",
      time: "7:45 PM",
      type: "expense",
    },
  ],
  "2026-07-11": [
    {
      amount: 4200.0,
      category: "Shopping",
      id: "home-needs",
      label: "Household essentials",
      time: "2:20 PM",
      type: "expense",
    },
  ],
  "2026-07-13": [
    {
      amount: 180000.0,
      category: "Income",
      id: "salary-credit",
      label: "Salary credited",
      time: "9:00 AM",
      type: "income",
    },
  ],
  "2026-07-17": [
    {
      amount: 2100.0,
      category: "Food",
      id: "family-lunch",
      label: "Family lunch",
      time: "12:30 PM",
      type: "expense",
    },
    {
      amount: 1350.0,
      category: "Transport",
      id: "weekend-ride",
      label: "Weekend ride",
      time: "4:15 PM",
      type: "expense",
    },
    {
      amount: 750.0,
      category: "Entertainment",
      id: "movie-night",
      label: "Movie night snacks",
      time: "8:40 PM",
      type: "expense",
    },
  ],
  "2026-07-18": [
    {
      amount: 3500.0,
      category: "Health",
      id: "pharmacy",
      label: "Pharmacy pickup",
      time: "10:05 AM",
      type: "expense",
    },
  ],
  "2026-07-19": [
    {
      amount: 1250.0,
      category: "Transport",
      id: "office-commute",
      label: "Office commute",
      time: "8:05 AM",
      type: "expense",
    },
    {
      amount: 650.0,
      category: "Coffee",
      id: "team-coffee",
      label: "Team coffee stop",
      time: "3:35 PM",
      type: "expense",
    },
  ],
  "2026-07-20": [
    {
      amount: 9800.0,
      category: "Savings",
      id: "savings-transfer",
      label: "Savings transfer",
      time: "7:15 AM",
      type: "income",
    },
  ],
  "2026-07-24": [
    {
      amount: 2900.0,
      category: "Dining",
      id: "dinner-out",
      label: "Dinner with friends",
      time: "8:10 PM",
      type: "expense",
    },
  ],
  "2026-07-28": [
    {
      amount: 1100.0,
      category: "Subscriptions",
      id: "music-renewal",
      label: "Music subscription renewal",
      time: "6:45 AM",
      type: "expense",
    },
    {
      amount: 680.0,
      category: "Transport",
      id: "late-ride",
      label: "Late ride home",
      time: "9:15 PM",
      type: "expense",
    },
  ],
};

export const DASHBOARD_CALENDAR_MONTH_LABEL = getDashboardCalendarMonthLabel(2026, 6);
export const DASHBOARD_CALENDAR_DAYS = createMonthCalendarDays(2026, 6, JULY_2026_ACTIVITY_ENTRIES);
export const DASHBOARD_CALENDAR_DEFAULT_DETAIL_DATE = "2026-07-17";
export const CALENDAR_HEATMAP_TITLE = "Flow Heatmap";
export const CALENDAR_HEATMAP_FILTER_PLACEHOLDER = "Filter transactions...";

export const DASHBOARD_PORTFOLIO: DashboardPortfolioAsset[] = [
  {
    change: "+4.21%",
    chipTone: "primary",
    subtitle: "BTC",
    symbol: "BTC",
    value: "LKR 45,250.00",
  },
  {
    change: "+7.32%",
    chipTone: "brand",
    subtitle: "ETH",
    symbol: "ETH",
    value: "LKR 38,780.00",
  },
];

export const DASHBOARD_SUBSCRIPTIONS: DashboardSubscriptionAvatar[] = [
  { label: "N", tone: "negative" },
  { label: "S", tone: "positive" },
  { label: "A", tone: "brand" },
  { label: "+2", tone: "neutral" },
];

export const DASHBOARD_WEEK_DAYS = ["M", "T", "W", "T", "F", "S", "S"] as const;

export const SAFE_TO_SPEND_TITLE = "Safe to Spend";
export const SAFE_TO_SPEND_SUBTITLE = "Daily operational budget based on remaining cash flow.";

export const CASH_FLOW_HERO: CashFlowHeroData = {
  periodLabel: "May 12 - May 18, 2025",
  title: "Total Cash Flow",
  totalValue: "+LKR 84,250.00",
  totals: [
    {
      label: "Income",
      tone: "positive",
      value: "LKR 180,000.00",
    },
    {
      label: "Expenses",
      tone: "negative",
      value: "-LKR 95,750.00",
    },
  ],
};

export const CASH_FLOW_INFLOW: DashboardTransaction[] = [
  {
    id: "1",
    amount: 85000,
    category: "Salary",
    date: "May 15, 2025",
    icon: "briefcase",
    title: "TechCorp Salary",
    tone: "income",
  },
  {
    id: "2",
    amount: 12500,
    date: "May 12, 2025",
    icon: "chart",
    category: "Investments",
    title: "Dividend Yield",
    tone: "income",
  },
  {
    id: "3",
    amount: 8500,
    date: "May 10, 2025",
    icon: "crypto",
    category: "Crypto",
    title: "Crypto Stake",
    tone: "income",
  },
  {
    id: "4",
    amount: 18500,
    date: "May 05, 2025",
    icon: "invoice",
    category: "Freelance",
    title: "Freelance Invoice",
    tone: "income",
  },
];

export const CASH_FLOW_OUTFLOW: DashboardTransaction[] = [
  {
    id: "1",
    amount: 32000,
    date: "May 01, 2025",
    icon: "home",
    category: "Mortgage",
    title: "Mortgage Payment",
    tone: "expense",
  },
  {
    id: "2",
    amount: 8500,
    date: "May 03, 2025",
    icon: "car",
    category: "Transport",
    title: "Tesla Lease",
    tone: "expense",
  },
  {
    id: "3",
    amount: 4200,
    date: "May 14, 2025",
    icon: "food",
    category: "Food & Dining",
    title: "Dining & Leisure",
    tone: "expense",
  },
  {
    id: "4",
    amount: 3800,
    date: "May 10, 2025",
    icon: "bill",
    category: "Utilities",
    title: "Utilities & Internet",
    tone: "expense",
  },
];

export const SAFE_TO_SPEND_SUMMARY: DashboardSafeSpendSummary = {
  availableNow: "LKR 14,250.00",
  dailyTarget: "LKR 20,000.00",
  percentRemaining: 71,
  resetIn: "Resets in 14h 22m",
  title: "Today's allowance",
};

export const SAFE_TO_SPEND_STATS: DashboardSafeSpendStat[] = [
  {
    detail: "12% below average",
    title: "Spent today",
    value: "LKR 5,750.00",
  },
  {
    detail: "Locked from daily budget",
    title: "Reserved for bills",
    value: "LKR 84,000.00",
  },
];

export const SAFE_TO_SPEND_OBLIGATIONS: DashboardSafeSpendObligation[] = [
  {
    amount: "LKR 12,400.00",
    dueLabel: "Due tomorrow",
    name: "Electric Utility",
  },
  {
    amount: "LKR 8,950.00",
    dueLabel: "Jul 05",
    name: "Auto Insurance",
  },
  {
    amount: "LKR 6,500.00",
    dueLabel: "Jul 08",
    name: "Internet Service",
  },
];

export const SAFE_TO_SPEND_FLOW_ITEMS: DashboardSafeSpendFlowItem[] = [
  {
    amount: "+LKR 320,000.00",
    label: "Direct Deposit",
    note: "Yesterday",
    tone: "income",
  },
  {
    amount: "-LKR 5,750.00",
    label: "Arpico Supercentre",
    note: "Today, 10:42 AM",
    tone: "expense",
  },
];
