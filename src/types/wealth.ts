export type CryptoSummaryCardData = {
  caption: string;
  detail: string;
  tone: "negative" | "neutral" | "positive";
  type: "balance" | "performer" | "quickAction";
  value?: string;
  actionLabel?: string;
  assetName?: string;
  assetSymbol?: string;
  changeLabel?: string;
};

export type CryptoHolding = {
  changeLabel: string;
  changeTone: "negative" | "neutral" | "positive";
  holdingsLabel: string;
  name: string;
  priceLabel: string;
  symbol: string;
  valueLabel: string;
};

export type CryptoAllocationItem = { label: string; valueLabel: string };

export type CryptoPortfolioPageData = {
  allocation: { items: CryptoAllocationItem[]; title: string; totalAssetsLabel: string };
  dateRange: string;
  holdings: { items: CryptoHolding[]; title: string };
  searchPlaceholder: string;
  stats: CryptoSummaryCardData[];
  subtitle: string;
  title: string;
};
