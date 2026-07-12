import type {
  FinancialHealthPageData,
  ReportsExportPageData,
  SankeyFlowPageData,
  TopCategoriesPageData,
} from "@/types/analytics";

export const TOP_CATEGORIES_PAGE: TopCategoriesPageData = {
  dateRange: "May 12 - May 18, 2025",
  distribution: {
    items: [
      {
        amountLabel: "$1,785.00",
        label: "Housing",
        momLabel: "42%",
        progress: 42,
        trendTone: "positive",
        varianceLabel: "2.1%",
      },
      {
        amountLabel: "$1,062.50",
        label: "Food & Dining",
        momLabel: "25%",
        progress: 25,
        trendTone: "negative",
        varianceLabel: "8.4%",
      },
      {
        amountLabel: "$637.50",
        label: "Transport",
        momLabel: "15%",
        progress: 15,
        trendTone: "positive",
        varianceLabel: "1.5%",
      },
      {
        amountLabel: "$425.00",
        label: "Bills & Utilities",
        momLabel: "10%",
        progress: 10,
        trendTone: "neutral",
        varianceLabel: "0.0%",
      },
      {
        amountLabel: "$340.00",
        label: "Other",
        momLabel: "8%",
        progress: 8,
        trendTone: "neutral",
        varianceLabel: "0.0%",
      },
    ],
    exportLabel: "Export",
    title: "Distribution Map",
  },
  insights: [
    {
      caption: "Highest Variance",
      detail: "Dining out frequency increased by 40% this period.",
      icon: "alert",
      title: "Food & Dining",
      tone: "negative",
      valueLabel: "+$320.00 vs last month",
    },
    {
      caption: "On Track",
      detail: "under budget",
      icon: "check",
      title: "Transport Budget",
      tone: "positive",
      valueLabel: "-$45.00",
    },
  ],
  searchPlaceholder: "Search transactions...",
  subtitle: "Analytics Overview",
  summaryLabel: "Total Spent (May)",
  summaryValue: "$4,250.00",
  title: "Category Breakdown",
};

export const SANKEY_FLOW_PAGE: SankeyFlowPageData = {
  groups: [
    {
      id: "needs",
      label: "Needs",
      shareLabel: "39%",
      targets: [
        { id: "housing", label: "Housing", value: 80000 },
        { id: "food", label: "Food", value: 61000 },
        { id: "transport", label: "Transport", value: 32000 },
        { id: "utilities", label: "Utilities", value: 17000 },
      ],
      tone: "brand",
      value: 190000,
    },
    {
      id: "wants",
      label: "Wants",
      shareLabel: "15%",
      targets: [{ id: "others", label: "Others", value: 72000 }],
      tone: "neutral",
      value: 72000,
    },
    {
      id: "savings",
      label: "Savings",
      shareLabel: "29%",
      targets: [
        { id: "emergency", label: "Emergency", value: 80000 },
        { id: "goals", label: "Goals", value: 63000 },
      ],
      tone: "positive",
      value: 143000,
    },
    {
      id: "investments",
      label: "Investments",
      shareLabel: "13%",
      targets: [
        { id: "stocks", label: "Stocks", value: 45000 },
        { id: "crypto", label: "Crypto", value: 20000 },
      ],
      tone: "teal",
      value: 65000,
    },
    {
      id: "give",
      label: "Give",
      shareLabel: "3%",
      targets: [{ id: "charity", label: "Charity", value: 15000 }],
      tone: "danger",
      value: 15000,
    },
  ],
  subtitle: "Visualizing LKR 485,000 distribution for current month",
  summaryCards: [
    { accentTone: "brand", id: "total-income", label: "Total Income", valueLabel: "LKR 485,000" },
    {
      accentTone: "positive",
      emphasisLabel: "(43%)",
      id: "savings-and-investments",
      isHighlighted: true,
      label: "Savings & Investments",
      valueLabel: "LKR 208,000",
    },
    {
      accentTone: "danger",
      id: "total-expense",
      label: "Total Expense",
      valueLabel: "LKR 312,000",
    },
  ],
  title: "Sankey Flow (Money Flow)",
  totalIncomeLabel: "LKR 485,000",
};

export const FINANCIAL_HEALTH_PAGE: FinancialHealthPageData = {
  activityImpacts: [
    {
      detail: "Automated transfer executed",
      icon: "trending-up",
      id: "monthly-savings",
      pointsLabel: "+5 pts",
      title: "Increased Monthly Savings",
      tone: "positive",
    },
    {
      detail: "Statement balance exceeded target",
      icon: "credit-card-outline",
      id: "credit-utilization",
      pointsLabel: "-2 pts",
      title: "High Credit Utilization",
      tone: "negative",
    },
  ],
  assetAllocation: [
    { id: "cash", label: "Cash", share: 24, value: 184000 },
    { id: "stocks", label: "Stocks", share: 38, value: 29100 },
    { id: "retirement", label: "Retirement", share: 22, value: 16800 },
    { id: "crypto", label: "Crypto", share: 10, value: 7600 },
    { id: "other", label: "Other", share: 6, value: 4600 },
  ],
  netWorthTrend: [
    { label: "Jan", value: 54 },
    { label: "Feb", value: 57 },
    { label: "Mar", value: 56 },
    { label: "Apr", value: 61 },
    { label: "May", value: 64 },
    { label: "Jun", value: 68 },
  ],
  score: {
    metrics: [
      { label: "Savings Rate", progress: 70, scoreLabel: "70/100" },
      { label: "Spend vs Income", progress: 80, scoreLabel: "80/100" },
      { label: "Debt Management", progress: 75, scoreLabel: "75/100" },
      { label: "Investments", progress: 65, scoreLabel: "65/100" },
      { label: "Financial Stability", progress: 85, scoreLabel: "85/100" },
    ],
    statusLabel: "Good",
    total: 1000,
    value: 780,
  },
  subtitle: "Your comprehensive wealth and stability overview.",
  title: "Financial Health",
};

export const REPORTS_EXPORT_PAGE: ReportsExportPageData = {
  items: [
    {
      description: "Summary of your finances",
      formatLabel: "PDF",
      icon: "file-document-outline",
      id: "monthly-report",
      title: "Monthly Report",
    },
    {
      description: "Spending by categories",
      formatLabel: "PDF / Excel",
      icon: "chart-arc",
      id: "category-report",
      title: "Category Report",
    },
    {
      description: "Income vs Expense",
      formatLabel: "PDF / Excel",
      icon: "file-chart-outline",
      id: "cashflow-report",
      title: "Cashflow Report",
    },
    {
      description: "Assets, Liabilities & Growth",
      formatLabel: "PDF",
      icon: "scale-balance",
      id: "net-worth-report",
      title: "Net Worth Report",
    },
    {
      description: "For tax filing purposes",
      formatLabel: "Excel",
      icon: "receipt-text-outline",
      id: "tax-report",
      title: "Tax Report",
    },
  ],
  subtitle: "Create and export professional reports",
  title: "Reports & Export",
};
