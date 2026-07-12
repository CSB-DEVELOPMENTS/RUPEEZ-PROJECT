export type CategoryDistributionItem = {
  amountLabel: string;
  label: string;
  momLabel: string;
  progress: number;
  trendTone: "negative" | "neutral" | "positive";
  varianceLabel: string;
};

export type CategoryInsightCardData = {
  caption: string;
  detail: string;
  icon: "alert" | "check";
  title: string;
  tone: "negative" | "positive";
  valueLabel: string;
};

export type TopCategoriesPageData = {
  dateRange: string;
  distribution: { exportLabel: string; items: CategoryDistributionItem[]; title: string };
  insights: CategoryInsightCardData[];
  searchPlaceholder: string;
  subtitle: string;
  summaryLabel: string;
  summaryValue: string;
  title: string;
};

export type SankeyFlowTone = "brand" | "danger" | "neutral" | "positive" | "teal";

export type SankeyFlowTarget = { id: string; label: string; value: number };

export type SankeyFlowGroup = {
  id: string;
  label: string;
  shareLabel: string;
  targets: SankeyFlowTarget[];
  tone: SankeyFlowTone;
  value: number;
};

export type SankeySummaryCardData = {
  accentTone: SankeyFlowTone;
  emphasisLabel?: string;
  id: string;
  isHighlighted?: boolean;
  label: string;
  valueLabel: string;
};

export type SankeyFlowPageData = {
  subtitle: string;
  summaryCards: SankeySummaryCardData[];
  title: string;
  totalIncomeLabel: string;
  groups: SankeyFlowGroup[];
};

export type FinancialHealthMetric = { label: string; progress: number; scoreLabel: string };

export type FinancialHealthActivityImpact = {
  id: string;
  detail: string;
  icon: "credit-card-outline" | "trending-up";
  pointsLabel: string;
  title: string;
  tone: "negative" | "positive";
};

export type FinancialHealthTrendPoint = { label: string; value: number };

export type FinancialHealthAllocationItem = {
  id: string;
  label: string;
  share: number;
  value: number;
};

export type FinancialHealthPageData = {
  activityImpacts: FinancialHealthActivityImpact[];
  assetAllocation: FinancialHealthAllocationItem[];
  netWorthTrend: FinancialHealthTrendPoint[];
  score: { metrics: FinancialHealthMetric[]; statusLabel: string; total: number; value: number };
  subtitle: string;
  title: string;
};

export type ReportExportItem = {
  description: string;
  formatLabel: string;
  icon:
    | "chart-arc"
    | "file-chart-outline"
    | "file-document-outline"
    | "receipt-text-outline"
    | "scale-balance";
  id: string;
  title: string;
};

export type ReportsExportPageData = { items: ReportExportItem[]; subtitle: string; title: string };
