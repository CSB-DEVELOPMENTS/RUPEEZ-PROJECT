import { ContextCreateOption, ContextTone } from "@/types/contexts-switching";

export const PROFILE_TONES: ContextTone[] = ["primary", "brand", "teal", "orange", "danger"];

export const PROFILE_PRIMARY_COLORS: Record<ContextTone, string> = {
  primary: "#22C55E",
  brand: "#3B82F6",
  teal: "#14B8A6",
  orange: "#F97316",
  danger: "#EF4444",
};

export const CREATE_OPTIONS: ContextCreateOption[] = [
  {
    description: "For daily life & personal expenses",
    icon: "account",
    id: "personal",
    label: "Personal",
    tone: "primary",
  },
  {
    description: "For business, income & expenses",
    icon: "briefcase",
    id: "business",
    label: "Business / Freelancer",
    tone: "brand",
  },
  {
    description: "For studies & personal allowance",
    icon: "school",
    id: "student",
    label: "Student",
    tone: "teal",
  },
  {
    description: "Create your own context",
    icon: "tune-variant",
    id: "custom",
    label: "Custom",
    tone: "primary",
  },
];

export const EMPTY_FORM: {
  currencyCode: string;
  currencyLabel: string;
  name: string;
  selectedTone: ContextTone;
} = {
  currencyCode: "LKR",
  currencyLabel: "LKR - Sri Lankan Rupee",
  name: "",
  selectedTone: "primary",
};
