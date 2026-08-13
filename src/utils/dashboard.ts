import { DASHBOARD_STATS } from "@/constants/dashboard";
import type { DashboardTransactionRecord } from "@/services/transactionService";
import type {
  DashboardCalendarDay,
  DashboardOverviewData,
  DashboardStatTone,
  DashboardTransaction,
} from "@/types/dashboard";

export const DASHBOARD_DAYS_TO_SHOW = 30;

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function transactionDate(transaction: DashboardTransactionRecord) {
  const value = transaction.transaction_date ?? transaction.created_at;
  const parsedDate = value ? new Date(value) : null;

  return parsedDate && !Number.isNaN(parsedDate.getTime()) ? parsedDate : null;
}

function transactionTone(transaction: DashboardTransactionRecord): DashboardTransaction["tone"] {
  return transaction.transaction_type?.toLowerCase() === "income" ? "income" : "expense";
}

function formatCurrency(value: number) {
  return `LKR ${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
}

function calendarTone(activities: DashboardTransaction[]): DashboardStatTone | undefined {
  const net = activities.reduce(
    (total, activity) => total + (activity.tone === "income" ? activity.amount : -activity.amount),
    0,
  );

  if (net > 0) return "positive";
  if (net < 0) return "negative";
  return activities.length > 0 ? "neutral" : undefined;
}

function createCalendarDays(
  monthDate: Date,
  transactionsByDate: Record<string, DashboardTransaction[]>,
) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();
  const cells: DashboardCalendarDay[] = [];

  for (let index = firstWeekday - 1; index >= 0; index -= 1) {
    const date = new Date(year, month - 1, previousMonthDays - index);
    cells.push({
      activities: [],
      activityCount: 0,
      date: dateKey(date),
      dayLabel: `${date.getDate()}`,
      isCurrentMonth: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const activities = transactionsByDate[dateKey(date)] ?? [];
    cells.push({
      activities,
      activityCount: activities.length,
      date: dateKey(date),
      dayLabel: `${day}`,
      isCurrentMonth: true,
      tone: calendarTone(activities),
      totalLabel:
        activities.length ?
          `${activities.length} transaction${activities.length === 1 ? "" : "s"}`
        : undefined,
    });
  }

  const trailingDays = (7 - (cells.length % 7)) % 7;
  for (let day = 1; day <= trailingDays; day += 1) {
    const date = new Date(year, month + 1, day);
    cells.push({
      activities: [],
      activityCount: 0,
      date: dateKey(date),
      dayLabel: `${day}`,
      isCurrentMonth: false,
    });
  }

  return cells;
}

export function dashboardData(transactions: DashboardTransactionRecord[], endDate: Date) {
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - (DASHBOARD_DAYS_TO_SHOW - 1));
  startDate.setHours(0, 0, 0, 0);
  const dashboardTransactions = transactions.flatMap<DashboardTransaction>((transaction) => {
    const date = transactionDate(transaction);
    if (!date) return [];

    return [{
      amount: Math.abs(transaction.amount),
      category: transaction.category ?? "Uncategorized",
      date: dateKey(date),
      id: transaction.transaction_id,
      note: date.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
      title: transaction.description ?? transaction.category ?? "Transaction",
      tone: transactionTone(transaction),
    }];
  });
  const transactionsByDate = dashboardTransactions.reduce<Record<string, DashboardTransaction[]>>(
    (result, transaction) => {
      if (transaction.date) (result[transaction.date] ??= []).push(transaction);
      return result;
    },
    {},
  );
  const points = Array.from({ length: DASHBOARD_DAYS_TO_SHOW }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    const dailyTransactions = transactionsByDate[dateKey(date)] ?? [];

    return {
      expense:
        dailyTransactions
          .filter((transaction) => transaction.tone === "expense")
          .reduce((total, transaction) => total + transaction.amount, 0) / 1000,
      income:
        dailyTransactions
          .filter((transaction) => transaction.tone === "income")
          .reduce((total, transaction) => total + transaction.amount, 0) / 1000,
      label: `${date.getDate()}`,
    };
  });
  const income = dashboardTransactions
    .filter((transaction) => transaction.tone === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);
  const expenses = dashboardTransactions
    .filter((transaction) => transaction.tone === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);
  const overview: DashboardOverviewData = {
    detailHref: "/cash-flow",
    expenseTotal: formatCurrency(expenses),
    incomeTotal: formatCurrency(income),
    periodLabel: "Last 30 days",
    points,
  };
  const stats = DASHBOARD_STATS.map((stat) => {
    if (stat.caption === "Monthly income") {
      return { ...stat, detail: "Last 30 days", title: formatCurrency(income), trend: undefined };
    }

    if (stat.caption === "Monthly expenses") {
      return { ...stat, detail: "Last 30 days", title: formatCurrency(expenses), trend: undefined };
    }

    return stat;
  });

  return {
    calendarDays: createCalendarDays(endDate, transactionsByDate),
    dateRange: `${startDate.toLocaleDateString("en-US", { day: "numeric", month: "short" })} - ${endDate.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}`,
    monthLabel: endDate.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    overview,
    recentTransactions: dashboardTransactions.slice(0, 5),
    stats,
  };
}
