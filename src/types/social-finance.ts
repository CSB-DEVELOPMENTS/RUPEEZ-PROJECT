import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { ComponentProps } from "react";

export type MetricTone = "positive" | "negative" | "neutral" | "brand";
export type GroupTone = "positive" | "negative" | "neutral";
export type ActivityTone = "positive" | "negative";
export type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

export type SocialMetric = {
  caption: string;
  change: string;
  icon: IconName;
  tone: MetricTone;
  value: string;
};

export type ExpenseGroup = {
  balance: string;
  id: string;
  members: number;
  name: string;
  recurring: string;
  progress: number;
  progressLabel: string;
  position: string;
  tone: GroupTone;
};

export type GroupMemberTone = "positive" | "negative" | "neutral";

export type GroupMember = {
  dueAmount: string;
  name: string;
  paidAmount: string;
  role: string;
  status: string;
  tone: GroupMemberTone;
};

export type GroupOverviewItem = {
  label: string;
  value: string;
};

export type GroupDetail = {
  breadcrumb: string;
  id: string;
  members: GroupMember[];
  nextPrediction: string;
  overview: GroupOverviewItem[];
  progress: number;
  progressLabel: string;
  settleLabel: string;
  subtitle: string;
  title: string;
  totalText: string;
};

export type SettlementForm = {
  amount: string;
  date: string;
  notes: string;
  sourceWallet: string;
};

export type SettlementBranchTone = "positive" | "negative" | "neutral";

export type SettlementBranch = {
  amount: string;
  label: string;
  note: string;
  tone: SettlementBranchTone;
};

export type SettlementGuide = {
  automatedLabel: string;
  breadcrumb: string;
  ctaLabel: string;
  footerNote: string;
  hubAmount: string;
  hubLabel: string;
  optimizedPaymentLabel: string;
  optimizedSummary: string;
  originalPaymentLabel: string;
  participants: SettlementBranch[];
  savingsLabel: string;
  subtitle: string;
  title: string;
  youAmount: string;
  youLabel: string;
};

export type SettlementItem = {
  detail: string;
  icon: IconName;
  id: string;
  title: string;
  tone: ActivityTone;
  value: string;
};

export type TransactionMode = "expense" | "income";

export type SplitMember = {
  amount: string;
  enabled: boolean;
  name: string;
  role: string;
};

export type SocialFinanceBenefit = {
  detail: string;
  title: string;
};
