import { ScrollView, View } from "react-native";

import { CashFlowHero } from "@/components/cash-flow/CashFlowHero";
import { CashFlowListCard } from "@/components/cash-flow/CashFlowListCard";
import { DashboardOverviewCard } from "@/components/dashboard/DashboardSections";
import {
  CASH_FLOW_HERO,
  CASH_FLOW_INFLOW,
  CASH_FLOW_OUTFLOW,
  DASHBOARD_OVERVIEW_FULL,
} from "@/constants/dashboard";

export default function CashFlowScreen() {
  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <View className="relative overflow-hidden p-4 md:p-6">
          <View className="absolute -left-10 top-16 h-40 w-40 rounded-full bg-app-primary/10" />
          <View className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-app-brand/10" />

          <View className="relative gap-5">
            <CashFlowHero data={CASH_FLOW_HERO} />
            <DashboardOverviewCard data={DASHBOARD_OVERVIEW_FULL} />

            <View className="gap-4 xl:flex-row">
              <View className="xl:flex-1">
                <CashFlowListCard title="Inflow" tone="income" data={CASH_FLOW_INFLOW} />
              </View>
              <View className="xl:flex-1">
                <CashFlowListCard title="Outflow" tone="expense" data={CASH_FLOW_OUTFLOW} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
