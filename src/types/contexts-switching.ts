import type MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { ComponentProps } from "react";

export type ContextTone = "brand" | "danger" | "orange" | "primary" | "teal";

export type ContextSummary = {
  id: string;
  label: string;
  percent: number;
  subtitle: string;
  tone: ContextTone;
  icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
};

export type ContextPerformancePoint = {
  expenses: number;
  income: number;
  label: string;
  net: number;
};

export type ContextSafeSpendCardData = {
  amount: number;
  contextId: string;
  label: string;
  percent: number;
  tone: ContextTone;
};

export type ContextInsightData = { actionLabel: string; emphasizedLabel: string; message: string };

export type AllContextsPageData = {
  contexts: ContextSummary[];
  insight: ContextInsightData;
  performancePoints: ContextPerformancePoint[];
  safeSpendCards: ContextSafeSpendCardData[];
};
