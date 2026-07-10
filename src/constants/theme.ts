import "@/global.css";

import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#1D1F25",
    background: "#FBFAF8",
    backgroundAccent: "#F3F7F2",
    surface: "#FFFFFF",
    panel: "#F5F1F5",
    border: "#DCDFe4",
    textMuted: "#767A86",
    textSoft: "#8F939E",
    primary: "#22C55E",
    primaryStrong: "#0B7D37",
    primaryContrast: "#F8FFFA",
    primaryMuted: "#E1F7E8",
    brand: "#3B82F6",
    brandStrong: "#1D4ED8",
    brandSoft: "#93C5FD",
    brandFaint: "#DBEAFE",
    danger: "#EF4444",
    dangerMuted: "#FEE2E2",
    chartTrack: "#DCDFE4",
    chartGreen: "#22C55E",
    chartBlue: "#3B82F6",
    chartPurple: "#8B5CF6",
    chartOrange: "#F97316",
    chartTeal: "#14B8A6",
    chartPink: "#EC4899",
    chartYellow: "#EAB308",
    chartIndigo: "#6366F1",
    chartRed: "#EF4444",
    chartPalette: [
      "#22C55E",
      "#3B82F6",
      "#8B5CF6",
      "#F97316",
      "#14B8A6",
      "#EC4899",
      "#EAB308",
      "#6366F1",
      "#EF4444",
    ],
  },
  dark: {
    text: "#E7ECFF",
    background: "#020604",
    backgroundAccent: "#040E09",
    surface: "#090E12",
    panel: "#181F2E",
    border: "#263344",
    textMuted: "#9AA3B8",
    textSoft: "#727D92",
    primary: "#22C55E",
    primaryStrong: "#4ADE80",
    primaryContrast: "#041009",
    primaryMuted: "#0D2415",
    brand: "#3B82F6",
    brandStrong: "#2563EB",
    brandSoft: "#60A5FA",
    brandFaint: "#1E40AF",
    danger: "#F87171",
    dangerMuted: "#7F1D1D",
    chartTrack: "#263344",
    chartGreen: "#22C55E",
    chartBlue: "#3B82F6",
    chartPurple: "#8B5CF6",
    chartOrange: "#F97316",
    chartTeal: "#14B8A6",
    chartPink: "#EC4899",
    chartYellow: "#EAB308",
    chartIndigo: "#6366F1",
    chartRed: "#EF4444",
    chartPalette: [
      "#22C55E",
      "#3B82F6",
      "#8B5CF6",
      "#F97316",
      "#14B8A6",
      "#EC4899",
      "#EAB308",
      "#6366F1",
      "#EF4444",
    ],
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
