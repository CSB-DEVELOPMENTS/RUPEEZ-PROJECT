import type { AllContextsPageData } from "@/types/contexts-switching";

export const ALL_CONTEXTS_PAGE: AllContextsPageData = {
  contexts: [
    {
      id: "personal",
      icon: "account-outline",
      label: "Personal",
      percent: 87,
      subtitle: "Active Lifestyle",
      tone: "primary",
    },
    {
      id: "business",
      icon: "briefcase-outline",
      label: "Business / Freelancer",
      percent: 72,
      subtitle: "Growth Focused",
      tone: "brand",
    },
    {
      id: "student",
      icon: "school-outline",
      label: "Student",
      percent: 41,
      subtitle: "Education Loop",
      tone: "teal",
    },
    {
      id: "side-hustle",
      icon: "rocket-launch-outline",
      label: "Side Hustle Project",
      percent: 32,
      subtitle: "Early Stage",
      tone: "danger",
    },
    {
      id: "rental",
      icon: "home-outline",
      label: "Rental Property",
      percent: 58,
      subtitle: "Passive Income",
      tone: "orange",
    },
  ],
  insight: {
    actionLabel: "Optimize now",
    emphasizedLabel: "Insight:",
    message:
      'Your "Side Hustle Project" expenses spiked by 18% this week. Consider re-allocating LKR 5,000 from your "Personal" safe-to-spend buffer to maintain optimal liquidity.',
  },
  performancePoints: [
    { expenses: 42, income: 105, label: "May 1", net: 12 },
    { expenses: 58, income: 152, label: "May 8", net: 24 },
    { expenses: 88, income: 205, label: "May 15", net: 36 },
    { expenses: 128, income: 252, label: "May 22", net: 56 },
    { expenses: 168, income: 305, label: "May 29", net: 66 },
    { expenses: 222, income: 365, label: "May 31", net: 98 },
  ],
  popups: {
    createForm: {
      currencyCode: "LKR",
      currencyLabel: "LKR - Sri Lankan Rupee",
      name: "Side Hustle Project",
      selectedTone: "brand",
    },
    createOptions: [
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
        tone: "danger",
      },
      {
        description: "For studies & personal allowance",
        icon: "school",
        id: "student",
        label: "Student",
        tone: "danger",
      },
      {
        description: "Create your own context",
        icon: "tune-variant",
        id: "custom",
        label: "Custom",
        tone: "primary",
      },
    ],
    editForm: {
      currencyCode: "LKR",
      currencyLabel: "LKR - Sri Lankan Rupee",
      name: "Business / Freelancer",
      selectedTone: "danger",
    },
    success: {
      checks: ["Your data is 100% isolated", "Profile type is set", "You can customize anytime"],
      contextName: "Side Hustle Project",
    },
  },
  safeSpendCards: [
    { amount: 24680, contextId: "personal", label: "Personal", percent: 87, tone: "primary" },
    { amount: 146250, contextId: "business", label: "Business", percent: 72, tone: "brand" },
    { amount: 8950, contextId: "student", label: "Student", percent: 41, tone: "teal" },
    { amount: 23450, contextId: "side-hustle", label: "Side Hustle", percent: 32, tone: "danger" },
    { amount: 8900, contextId: "rental", label: "Rental Prop.", percent: 58, tone: "orange" },
  ],
};
