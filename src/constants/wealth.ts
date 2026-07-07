import type { CryptoPortfolioPageData } from "@/types/wealth";

export const CRYPTO_PORTFOLIO_PAGE: CryptoPortfolioPageData = {
  allocation: {
    items: [
      { colorClassName: "bg-app-primary", label: "Bitcoin (BTC)", valueLabel: "56%" },
      { colorClassName: "bg-app-brand", label: "Ethereum (ETH)", valueLabel: "30%" },
      { colorClassName: "bg-app-primary/70", label: "Solana (SOL)", valueLabel: "10%" },
      { colorClassName: "bg-app-brand/70", label: "USD Coin (USDC)", valueLabel: "4%" },
    ],
    title: "Allocation",
    totalAssetsLabel: "4",
  },
  dateRange: "May 12 - May 18, 2025",
  holdings: {
    items: [
      {
        changeLabel: "+2.4%",
        changeTone: "positive",
        holdingsLabel: "1.25 BTC",
        name: "Bitcoin",
        priceLabel: "$64,230.00",
        symbol: "BTC",
        valueLabel: "$80,287.50",
      },
      {
        changeLabel: "+12.4%",
        changeTone: "positive",
        holdingsLabel: "12.5 ETH",
        name: "Ethereum",
        priceLabel: "$3,450.20",
        symbol: "ETH",
        valueLabel: "$43,127.50",
      },
      {
        changeLabel: "-1.2%",
        changeTone: "negative",
        holdingsLabel: "100 SOL",
        name: "Solana",
        priceLabel: "$145.80",
        symbol: "SOL",
        valueLabel: "$14,580.00",
      },
      {
        changeLabel: "0.0%",
        changeTone: "neutral",
        holdingsLabel: "4,855.24 USDC",
        name: "USD Coin",
        priceLabel: "$1.00",
        symbol: "USDC",
        valueLabel: "$4,855.24",
      },
    ],
    title: "Asset Holdings",
  },
  searchPlaceholder: "Search assets...",
  stats: [
    {
      caption: "Total Balance",
      detail: "+ 5.2% ($7,428.20) 24h",
      tone: "positive",
      type: "balance",
      value: "$142,850.24",
    },
    {
      assetName: "Ethereum",
      assetSymbol: "ETH",
      caption: "Top Performer (24H)",
      changeLabel: "+12.4%",
      detail: "Best move across your holdings",
      tone: "positive",
      type: "performer",
    },
    {
      actionLabel: "Trade Now",
      caption: "Quick Actions",
      detail: "Solana (SOL) is approaching your target sell price of $150.",
      tone: "neutral",
      type: "quickAction",
    },
  ],
  subtitle: "Real-time overview of your decentralized holdings.",
  title: "Crypto Assets",
};
