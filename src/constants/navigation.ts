import type { BreadcrumbItem } from "@/types/navigation";

const PROTECTED_ROUTE_BREADCRUMBS: Record<string, BreadcrumbItem[]> = {
  "/accounts": [{ href: "/accounts", label: "Accounts" }],
  "/analytics": [{ href: "/analytics", label: "Analytics" }],
  "/calendar-heatmap": [{ href: "/calendar-heatmap", label: "Calendar" }],
  "/cash-flow": [{ href: "/cash-flow", label: "Flow" }],
  "/crypto-assets": [
    { href: "/wealth", label: "Wealth" },
    { href: "/crypto-assets", label: "Crypto Assets" },
  ],
  "/dashboard": [{ href: "/dashboard", label: "Dashboard" }],
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

export function getProtectedRouteBreadcrumbs(pathname: string) {
  const configuredBreadcrumbs = PROTECTED_ROUTE_BREADCRUMBS[pathname];

  if (configuredBreadcrumbs) {
    return configuredBreadcrumbs;
  }

  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => ({
    href: `/${segments.slice(0, index + 1).join("/")}` as BreadcrumbItem["href"],
    label: formatSegmentLabel(segment),
  }));
}
