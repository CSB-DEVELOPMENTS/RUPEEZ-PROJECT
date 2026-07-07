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
