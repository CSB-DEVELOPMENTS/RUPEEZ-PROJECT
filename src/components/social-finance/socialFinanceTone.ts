import type {
  ActivityTone,
  GroupMemberTone,
  GroupTone,
  MetricTone,
  SettlementBranchTone,
} from "@/types/social-finance";

export function metricToneClasses(tone: MetricTone) {
  switch (tone) {
    case "positive":
      return {
        badge: "bg-app-primary-muted",
        change: "text-app-primary-strong",
        icon: "#22C55E",
        value: "text-app-primary",
      };
    case "negative":
      return {
        badge: "bg-app-danger-muted",
        change: "text-app-danger",
        icon: "#EF4444",
        value: "text-app-danger",
      };
    case "brand":
      return {
        badge: "bg-app-brand-faint",
        change: "text-app-brand-strong",
        icon: "#3B82F6",
        value: "text-app-brand-strong",
      };
    default:
      return {
        badge: "bg-app-panel",
        change: "text-app-muted",
        icon: "#767A86",
        value: "text-app-text",
      };
  }
}

export function groupToneClasses(tone: GroupTone) {
  if (tone === "positive") {
    return {
      badge: "bg-app-primary-muted text-app-primary-strong",
      bar: "bg-app-primary",
    };
  }

  if (tone === "negative") {
    return {
      badge: "bg-app-danger-muted text-app-danger",
      bar: "bg-app-danger",
    };
  }

  return {
    badge: "bg-app-panel text-app-muted",
    bar: "bg-app-brand",
  };
}

export function statusToneClasses(tone: GroupMemberTone) {
  switch (tone) {
    case "positive":
      return "bg-app-primary-muted text-app-primary-strong";
    case "negative":
      return "bg-app-danger-muted text-app-danger";
    default:
      return "bg-app-panel text-app-muted";
  }
}

export function activityToneClasses(tone: ActivityTone) {
  return tone === "positive"
    ? {
        badge: "bg-app-primary-muted",
        icon: "#22C55E",
        value: "text-app-primary",
      }
    : {
        badge: "bg-app-danger-muted",
        icon: "#EF4444",
        value: "text-app-danger",
      };
}

export function settlementToneClasses(tone: SettlementBranchTone) {
  switch (tone) {
    case "positive":
      return {
        accent: "border-app-primary bg-app-primary-muted",
        amount: "text-app-primary",
        icon: "arrow-up-right",
      } as const;
    case "negative":
      return {
        accent: "border-app-danger bg-app-danger-muted",
        amount: "text-app-danger",
        icon: "arrow-down-left",
      } as const;
    default:
      return {
        accent: "border-app-border bg-app-panel",
        amount: "text-app-text",
        icon: "arrow-right",
      } as const;
  }
}
