import type {
  DashboardCalendarActivity,
  DashboardCalendarDay,
  DashboardCategory,
  DashboardOverviewData,
  DashboardPortfolioAsset,
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

export const DASHBOARD_TRANSACTIONS: DashboardTransaction[] = [
  {
    amount: "-2,450.00",
    category: "Food",
    merchant: "Keells Super",
    note: "Today",
    tone: "expense",
  },
  {
    amount: "-1,150.00",
    category: "Transport",
    merchant: "Uber Ride",
    note: "Today",
    tone: "expense",
  },
  {
    amount: "+180,000.00",
    category: "Income",
    merchant: "Monthly Salary",
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
