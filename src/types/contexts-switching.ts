import type MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { ComponentProps } from "react";

export type ContextTone = "brand" | "danger" | "orange" | "primary" | "teal";

export type ActiveContextPopup =
  | "create-form"
  | "create-type"
  | "delete"
  | "edit"
  | "manage"
  | "success";

export type ContextSummary = {
  id: string;
  label: string;
  percent: number;
  subtitle: string;
  tone: ContextTone;
  icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
  profileName?: string;
  profileType?: string;
  primaryColor?: string;
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
  primaryColor?: string;
};

export type ContextInsightData = { actionLabel: string; emphasizedLabel: string; message: string };

export type ContextCreateOption = {
  description: string;
  icon: ComponentProps<typeof MaterialCommunityIcons>["name"];
  id: string;
  label: string;
  tone: ContextTone;
};

export type ContextFormData = {
  currencyCode: string;
  currencyLabel: string;
  name: string;
  selectedTone: ContextTone;
};

export type ContextSuccessData = { checks: string[]; contextName: string };

export type ContextPopupsData = {
  createForm: ContextFormData;
  createOptions: ContextCreateOption[];
  editForm: ContextFormData;
  success: ContextSuccessData;
};

export type AllContextsPageData = {
  contexts: ContextSummary[];
  insight: ContextInsightData;
  performancePoints: ContextPerformancePoint[];
  popups: ContextPopupsData;
  safeSpendCards: ContextSafeSpendCardData[];
};
