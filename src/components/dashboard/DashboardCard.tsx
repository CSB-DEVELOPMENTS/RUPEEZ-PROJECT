import type { PropsWithChildren } from "react";
import { View } from "react-native";

type DashboardCardProps = PropsWithChildren<{
  className?: string;
}>;

export function DashboardCard({ children, className = "" }: DashboardCardProps) {
  return (
    <View
      className={`rounded-[30px] border border-app-border bg-app-surface p-5 shadow-showcase-soft dark:shadow-showcase-soft-dark md:p-6 ${className}`}>
      {children}
    </View>
  );
}
