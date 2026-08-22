import type { BreadcrumbItem } from "@/types/navigation";

const PROTECTED_ROUTE_BREADCRUMBS: Record<string, BreadcrumbItem[]> = {
  "/accounts": [{ href: "/accounts", label: "Accounts" }],
  "/add-asset": [
    { href: "/asset-portfolio", label: "Assets" },
    { href: "/add-asset", label: "Add New" },
  ],
  "/analytics": [{ href: "/analytics", label: "Analytics" }],
  "/analytics/financial-health": [
    { href: "/analytics", label: "Analytics" },
    { href: "/analytics/financial-health", label: "Financial Health" },
  ],
  "/analytics/report-export": [
    { href: "/analytics", label: "Analytics" },
    { href: "/analytics/report-export", label: "Reports & Export" },
  ],
  "/asset-portfolio": [
    { href: "/wealth", label: "Wealth" },
    { href: "/asset-portfolio", label: "Asset Portfolio" },
  ],
  "/calendar-heatmap": [{ href: "/calendar-heatmap", label: "Calendar" }],
  "/cash-flow": [{ href: "/cash-flow", label: "Flow" }],
  "/crypto-assets": [
    { href: "/wealth", label: "Wealth" },
    { href: "/crypto-assets", label: "Crypto Assets" },
  ],
  "/dashboard": [{ href: "/dashboard", label: "Dashboard" }],
  "/goals": [{ href: "/goals", label: "Goals" }],
  "/goals/add": [
    { href: "/goals", label: "Goals" },
    { href: "/goals", label: "Create New Goal" },
  ],
  "/millionaire-box": [{ href: "/millionaire-box", label: "Millionaire Box" }],
  "/millionaire-box/activity": [
    { href: "/millionaire-box", label: "Millionaire Box" },
    { href: "/millionaire-box/activity", label: "Activity" },
  ],
  "/millionaire-box/allocate": [
    { href: "/millionaire-box", label: "Millionaire Box" },
    { href: "/millionaire-box/allocate", label: "Allocate Funds" },
  ],
  "/recent-transactions": [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/recent-transactions", label: "Recent Transactions" },
  ],
  "/safe-to-spend": [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/safe-to-spend", label: "Safe to Spend" },
  ],
  "/settings": [{ href: "/settings", label: "Settings" }],
  "/settings/preferences": [
    { href: "/settings", label: "Settings" },
    { href: "/settings/preferences", label: "Preferences" },
  ],
  "/settings/security": [
    { href: "/settings", label: "Settings" },
    { href: "/settings/security", label: "Security" },
  ],
  "/social-finance": [{ href: "/social-finance", label: "Social Finance" }],
  "/subscriptions": [{ href: "/subscriptions", label: "Subscriptions" }],
  "/top-categories": [
    { href: "/analytics", label: "Analytics" },
    { href: "/top-categories", label: "Top Categories" },
  ],
  "/wealth": [{ href: "/wealth", label: "Wealth" }],
};

function formatSegmentLabel(segment: string) {
  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getGoalRouteBreadcrumbs(segments: string[]) {
  if (segments[0] !== "goals" || !segments[1] || segments[1] === "add") {
    return null;
  }

  const goalHref = `/goals/${segments[1]}` as BreadcrumbItem["href"];
  const breadcrumbs: BreadcrumbItem[] = [
    { href: "/goals", label: "Goals" },
    { href: goalHref, label: formatSegmentLabel(segments[1]) },
  ];

  if (segments[2] === "contribute") {
    breadcrumbs.push({
      href: `${goalHref}/contribute` as BreadcrumbItem["href"],
      label: "Add Contribution",
    });
  }

  return breadcrumbs;
}

export function getProtectedRouteBreadcrumbs(pathname: string) {
  const configuredBreadcrumbs = PROTECTED_ROUTE_BREADCRUMBS[pathname];

  if (configuredBreadcrumbs) {
    return configuredBreadcrumbs;
  }

  const segments = pathname.split("/").filter(Boolean);
  const goalRouteBreadcrumbs = getGoalRouteBreadcrumbs(segments);

  if (goalRouteBreadcrumbs) {
    return goalRouteBreadcrumbs;
  }

  return segments.map((segment, index) => ({
    href: `/${segments.slice(0, index + 1).join("/")}` as BreadcrumbItem["href"],
    label: formatSegmentLabel(segment),
  }));
}
