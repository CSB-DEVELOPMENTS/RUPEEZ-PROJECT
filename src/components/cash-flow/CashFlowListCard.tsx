import type { ReactNode } from "react";
import { Text, View } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

import type {
  CashFlowEntryIcon,
  DashboardTransaction,
  DashboardTransactionTone,
} from "@/types/dashboard";
import { DashboardCard } from "../dashboard/DashboardCard";
import TransactionCard, { listToneColor } from "./TransactionCard";

function IconShell({ children, tone }: { children: ReactNode; tone: DashboardTransactionTone }) {
  return (
    <View
      className={`h-11 w-11 items-center justify-center rounded-2xl ${
        tone === "income" ? "bg-app-primary/15" : "bg-app-danger/10"
      }`}>
      {children}
    </View>
  );
}

function CashFlowEntryGlyph({
  icon,
  tone,
}: {
  icon?: CashFlowEntryIcon;
  tone: DashboardTransactionTone;
}) {
  const stroke = tone === "income" ? "#22C55E" : "#F87171";

  switch (icon) {
    case "briefcase":
      return (
        <IconShell tone={tone}>
          <Svg height={18} viewBox="0 0 24 24" width={18} fill="none">
            <Rect x="4" y="7" width="16" height="11" rx="2" stroke={stroke} strokeWidth="1.8" />
            <Path
              d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"
              stroke={stroke}
              strokeWidth="1.8"
            />
          </Svg>
        </IconShell>
      );
    case "chart":
      return (
        <IconShell tone={tone}>
          <Svg height={18} viewBox="0 0 24 24" width={18} fill="none">
            <Path
              d="M5 16l4-4 3 3 6-7"
              stroke={stroke}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
            <Path
              d="M17 8h3v3"
              stroke={stroke}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </Svg>
        </IconShell>
      );
    case "crypto":
      return (
        <IconShell tone={tone}>
          <Svg height={18} viewBox="0 0 24 24" width={18} fill="none">
            <Path
              d="M12 4v16M9 7.5h4a2.5 2.5 0 1 1 0 5H10.5a2.5 2.5 0 1 0 0 5H15"
              stroke={stroke}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </Svg>
        </IconShell>
      );
    case "invoice":
      return (
        <IconShell tone={tone}>
          <Svg height={18} viewBox="0 0 24 24" width={18} fill="none">
            <Rect x="5" y="6" width="14" height="12" rx="2" stroke={stroke} strokeWidth="1.8" />
            <Path d="M8 10h8M8 14h5" stroke={stroke} strokeLinecap="round" strokeWidth="1.8" />
          </Svg>
        </IconShell>
      );
    case "home":
      return (
        <IconShell tone={tone}>
          <Svg height={18} viewBox="0 0 24 24" width={18} fill="none">
            <Path
              d="M5 11.5L12 6l7 5.5V18a1 1 0 0 1-1 1h-3.5v-5h-5v5H6a1 1 0 0 1-1-1v-6.5z"
              stroke={stroke}
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </Svg>
        </IconShell>
      );
    case "car":
      return (
        <IconShell tone={tone}>
          <Svg height={18} viewBox="0 0 24 24" width={18} fill="none">
            <Path
              d="M7 15h10l-1.2-4.2A2 2 0 0 0 13.9 9H10.1a2 2 0 0 0-1.9 1.8L7 15z"
              stroke={stroke}
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
            <Path
              d="M6 15v2.5M18 15v2.5M8 18h8"
              stroke={stroke}
              strokeLinecap="round"
              strokeWidth="1.8"
            />
            <Path
              d="M8.5 12.5h.01M15.5 12.5h.01"
              stroke={stroke}
              strokeLinecap="round"
              strokeWidth="2.4"
            />
          </Svg>
        </IconShell>
      );
    case "food":
      return (
        <IconShell tone={tone}>
          <Svg height={18} viewBox="0 0 24 24" width={18} fill="none">
            <Path
              d="M7 4v7M10 4v7M8.5 11v9M16 4v19M13.5 4v6a2.5 2.5 0 0 0 2.5 2.5V4"
              stroke={stroke}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </Svg>
        </IconShell>
      );
    case "bill":
    default:
      return (
        <IconShell tone={tone}>
          <Svg height={18} viewBox="0 0 24 24" width={18} fill="none">
            <Path d="M7 5h10v14H7z" stroke={stroke} strokeWidth="1.8" />
            <Path
              d="M9 9h6M9 12.5h6M9 16h4"
              stroke={stroke}
              strokeLinecap="round"
              strokeWidth="1.8"
            />
          </Svg>
        </IconShell>
      );
  }
}

function listDirectionLabel(tone: DashboardTransactionTone) {
  return tone === "income" ? "+" : "-";
}

export function CashFlowListCard({
  title,
  tone,
  data,
}: {
  title: string;
  tone: DashboardTransactionTone;
  data: DashboardTransaction[];
}) {
  return (
    <DashboardCard>
      <View className="mb-5 flex-row items-center gap-3">
        <Text className={`font-display text-2xl font-semibold ${listToneColor(tone)}`}>
          {listDirectionLabel(tone)}
        </Text>
        <Text className="font-display text-2xl font-semibold text-app-text md:text-3xl">
          {title}
        </Text>
      </View>

      <View className="gap-2">
        {data.map((item) => (
          <TransactionCard key={item.id} item={item} />
        ))}
      </View>
    </DashboardCard>
  );
}
