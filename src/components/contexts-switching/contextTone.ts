import { Colors } from "@/constants/theme";
import type { ContextTone } from "@/types/contexts-switching";

export function contextToneClasses(tone: ContextTone) {
  switch (tone) {
    case "brand":
      return {
        bg: "bg-app-brand/15",
        border: "border-app-brand",
        text: "text-app-brand",
      };
    case "danger":
      return {
        bg: "bg-app-danger/15",
        border: "border-app-danger",
        text: "text-app-danger",
      };
    case "orange":
      return {
        bg: "bg-app-chart-orange/15",
        border: "border-app-chart-orange",
        text: "text-app-chart-orange",
      };
    case "teal":
      return {
        bg: "bg-app-chart-teal/15",
        border: "border-app-chart-teal",
        text: "text-app-chart-teal",
      };
    default:
      return {
        bg: "bg-app-primary/15",
        border: "border-app-primary",
        text: "text-app-primary",
      };
  }
}

export function contextToneColor(theme: "dark" | "light", tone: ContextTone) {
  const colors = Colors[theme];

  switch (tone) {
    case "brand":
      return colors.brand;
    case "danger":
      return colors.danger;
    case "orange":
      return colors.chartOrange;
    case "teal":
      return colors.chartTeal;
    default:
      return colors.primary;
  }
}
