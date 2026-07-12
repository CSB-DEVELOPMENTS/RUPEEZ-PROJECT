import { Fragment } from "react";
import { ScrollView, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { SankeyFlowGroup, SankeyFlowTarget, SankeyFlowTone } from "@/types/analytics";
import { formatTransactionAmount } from "../cash-flow/TransactionCard";

const FLOW_WIDTH = 980;
const FLOW_HEIGHT = 600;
const ROOT_CARD = { height: 92, width: 190, x: 70, y: 222 };
const GROUP_CARD = { height: 84, width: 202, x: 410 };
const TARGET_LABEL_X = 748;
const TARGET_FLOW_END_X = 726;
const GROUP_Y_POSITIONS = [34, 146, 258, 370, 482];

function toneColorSet(colors: (typeof Colors)[keyof typeof Colors], tone: SankeyFlowTone) {
  switch (tone) {
    case "brand":
      return { accent: colors.brand, stroke: `${colors.brand}B3` };
    case "danger":
      return { accent: colors.chartPink, stroke: `${colors.chartPink}A6` };
    case "teal":
      return { accent: colors.chartTeal, stroke: `${colors.chartTeal}B3` };
    case "positive":
      return { accent: colors.primary, stroke: `${colors.primary}B3` };
    default:
      return { accent: colors.textSoft, stroke: `${colors.textSoft}99` };
  }
}

function flowWidth(value: number, maxWidth: number, minWidth: number) {
  return Math.max(minWidth, Math.min(maxWidth, value / 8000));
}

function curvePath(startX: number, startY: number, endX: number, endY: number) {
  const controlOffset = Math.max(72, Math.abs(endX - startX) * 0.42);

  return `M ${startX} ${startY} C ${startX + controlOffset} ${startY}, ${endX - controlOffset} ${endY}, ${endX} ${endY}`;
}

function targetOffsets(count: number) {
  if (count <= 1) {
    return [0];
  }

  const spread = count === 2 ? 22 : 34;
  const midpoint = (count - 1) / 2;

  return Array.from({ length: count }, (_, index) => (index - midpoint) * spread);
}

function FlowNode({
  accentColor,
  eyebrow,
  shareLabel,
  valueLabel,
  width,
  x,
  y,
}: {
  accentColor: string;
  eyebrow: string;
  shareLabel?: string;
  valueLabel: string;
  width: number;
  x: number;
  y: number;
}) {
  return (
    <View
      className="absolute rounded-[24px] border border-app-border bg-app-surface px-5 py-2 shadow-showcase-soft dark:shadow-showcase-soft-dark"
      style={{
        // height: eyebrow === "Income" ? ROOT_CARD.height : GROUP_CARD.height,
        left: x,
        top: y,
        width,
        elevation: 3,
        zIndex: 3,
      }}>
      <View
        className="absolute bottom-0 left-0 top-0 w-1 rounded-l-[24px]"
        style={{ backgroundColor: accentColor }}
      />
      <Text className="font-display text-xs font-semibold uppercase tracking-[1.5px] text-app-muted">
        {eyebrow}
      </Text>
      <Text className="mt-2 font-display text-2xl font-semibold tracking-tight text-app-text">
        {valueLabel}
      </Text>
      {shareLabel ?
        <Text className="mt-1 font-display text-base font-semibold" style={{ color: accentColor }}>
          {shareLabel}
        </Text>
      : null}
    </View>
  );
}

function TargetLabel({
  accentColor,
  target,
  x,
  y,
}: {
  accentColor: string;
  target: SankeyFlowTarget;
  x: number;
  y: number;
}) {
  return (
    <View
      className="absolute flex-row items-center justify-between"
      style={{ elevation: 3, left: x, top: y - 16, width: 200, zIndex: 3 }}>
      <Text className="font-display text-lg text-app-text">{target.label}</Text>
      <Text className="font-display text-lg font-semibold" style={{ color: accentColor }}>
        {formatTransactionAmount(target.value)}
      </Text>
    </View>
  );
}

export function SankeyFlowCard({
  groups,
  totalIncomeLabel,
}: {
  groups: SankeyFlowGroup[];
  totalIncomeLabel: string;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const rootCenterY = ROOT_CARD.y + ROOT_CARD.height / 2;

  return (
    <DashboardCard className="overflow-hidden p-0">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          className="relative bg-app-surface"
          style={{ height: FLOW_HEIGHT, width: FLOW_WIDTH }}>
          <View className="absolute -left-12 top-8 h-40 w-40 rounded-full bg-app-brand/10" />
          <View className="absolute -right-8 bottom-6 h-48 w-48 rounded-full bg-app-primary/10" />

          <Svg
            className="absolute left-0 top-0"
            height={FLOW_HEIGHT}
            pointerEvents="none"
            style={{ elevation: 1, zIndex: 1 }}
            width={FLOW_WIDTH}>
            {groups.map((group, index) => {
              const groupY =
                GROUP_Y_POSITIONS[index] ?? GROUP_Y_POSITIONS[GROUP_Y_POSITIONS.length - 1];
              const groupCenterY = groupY + GROUP_CARD.height / 2;
              const palette = toneColorSet(colors, group.tone);

              return (
                <Path
                  key={group.id}
                  d={curvePath(
                    ROOT_CARD.x + ROOT_CARD.width,
                    rootCenterY,
                    GROUP_CARD.x,
                    groupCenterY,
                  )}
                  fill="none"
                  opacity={0.9}
                  stroke={palette.stroke}
                  strokeLinecap="round"
                  strokeWidth={flowWidth(group.value, 28, 8)}
                />
              );
            })}

            {groups.flatMap((group, index) => {
              const groupY =
                GROUP_Y_POSITIONS[index] ?? GROUP_Y_POSITIONS[GROUP_Y_POSITIONS.length - 1];
              const groupCenterY = groupY + GROUP_CARD.height / 2;
              const offsets = targetOffsets(group.targets.length);
              const palette = toneColorSet(colors, group.tone);

              return group.targets.map((target, targetIndex) => {
                const targetY = groupCenterY + offsets[targetIndex];

                return (
                  <Path
                    key={target.id}
                    d={curvePath(
                      GROUP_CARD.x + GROUP_CARD.width,
                      groupCenterY,
                      TARGET_FLOW_END_X,
                      targetY,
                    )}
                    fill="none"
                    opacity={0.88}
                    stroke={palette.stroke}
                    strokeLinecap="round"
                    strokeWidth={flowWidth(target.value, 20, 5)}
                  />
                );
              });
            })}
          </Svg>

          <View
            className="absolute left-0 top-0"
            pointerEvents="box-none"
            style={{ elevation: 2, height: FLOW_HEIGHT, width: FLOW_WIDTH, zIndex: 2 }}>
            <FlowNode
              accentColor={colors.chartIndigo}
              eyebrow="Income"
              valueLabel={totalIncomeLabel}
              width={ROOT_CARD.width}
              x={ROOT_CARD.x}
              y={ROOT_CARD.y}
            />

            {groups.map((group, index) => {
              const groupY =
                GROUP_Y_POSITIONS[index] ?? GROUP_Y_POSITIONS[GROUP_Y_POSITIONS.length - 1];
              const groupCenterY = groupY + GROUP_CARD.height / 2;
              const offsets = targetOffsets(group.targets.length);
              const palette = toneColorSet(colors, group.tone);

              return (
                <Fragment key={group.id}>
                  <FlowNode
                    accentColor={palette.accent}
                    eyebrow={group.label}
                    shareLabel={group.shareLabel}
                    valueLabel={formatTransactionAmount(group.value)}
                    width={GROUP_CARD.width}
                    x={GROUP_CARD.x}
                    y={groupY}
                  />

                  {group.targets.map((target, targetIndex) => (
                    <TargetLabel
                      key={target.id}
                      accentColor={palette.accent}
                      target={target}
                      x={TARGET_LABEL_X}
                      y={groupCenterY + offsets[targetIndex]}
                    />
                  ))}
                </Fragment>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </DashboardCard>
  );
}
