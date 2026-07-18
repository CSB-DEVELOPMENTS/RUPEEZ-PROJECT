import { useState } from "react";
import { ScrollView, View } from "react-native";

import {
  EXPENSE_GROUPS,
  GROUP_DETAILS,
  SETTLEMENT_ACTIVITY,
  SETTLEMENT_FORM,
  SETTLEMENT_GUIDES,
  SOCIAL_METRICS,
} from "@/constants/social-finance";
import { SocialFinanceGroupDetailView } from "@/components/social-finance/SocialFinanceGroupDetailView";
import { SocialFinanceNewTransactionView } from "@/components/social-finance/SocialFinanceNewTransactionView";
import { SocialFinanceOptimizedSettlementView } from "@/components/social-finance/SocialFinanceOptimizedSettlementView";
import { SocialFinanceOverview } from "@/components/social-finance/SocialFinanceOverview";
import { SocialFinancePageHeader } from "@/components/social-finance/SocialFinancePageHeader";
import { SocialFinanceSettlementFormView } from "@/components/social-finance/SocialFinanceSettlementFormView";
import type { TransactionMode } from "@/types/social-finance";

export function SocialFinanceScreen() {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [showSettlementForm, setShowSettlementForm] = useState(false);
  const [showOptimizedSettlement, setShowOptimizedSettlement] = useState(false);
  const [showNewTransactionForm, setShowNewTransactionForm] = useState(false);
  const [transactionMode, setTransactionMode] = useState<TransactionMode>("expense");
  const [splitExpense, setSplitExpense] = useState(false);

  const selectedGroup = selectedGroupId ? GROUP_DETAILS[selectedGroupId] ?? null : null;
  const settlementForm = selectedGroupId ? SETTLEMENT_FORM[selectedGroupId] ?? null : null;
  const settlementGuide = selectedGroupId ? SETTLEMENT_GUIDES[selectedGroupId] ?? null : null;

  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <View className="relative overflow-hidden p-4 md:p-6">
          <View className="absolute -left-10 top-16 h-40 w-40 rounded-full bg-app-primary/10" />
          <View className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-app-brand/10" />

          <View className="relative gap-5">
            <SocialFinancePageHeader
              onOpenNewTransaction={() => {
                setShowNewTransactionForm(true);
                setSelectedGroupId(null);
                setShowSettlementForm(false);
                setShowOptimizedSettlement(false);
              }}
            />

            {showNewTransactionForm ? (
              <SocialFinanceNewTransactionView
                splitExpense={splitExpense}
                transactionMode={transactionMode}
                onBack={() => setShowNewTransactionForm(false)}
                onSave={() => setShowNewTransactionForm(false)}
                onToggleMode={(mode) => {
                  setTransactionMode(mode);
                  if (mode === "income") {
                    setSplitExpense(false);
                  }
                }}
                onToggleSplitExpense={() => {
                  if (transactionMode === "expense") {
                    setSplitExpense((current) => !current);
                  }
                }}
              />
            ) : selectedGroup ? (
              showOptimizedSettlement && settlementGuide ? (
                <SocialFinanceOptimizedSettlementView
                  detail={selectedGroup}
                  guide={settlementGuide}
                  onBack={() => setShowOptimizedSettlement(false)}
                  onSend={() => {
                    setShowOptimizedSettlement(false);
                    setShowSettlementForm(true);
                  }}
                />
              ) : showSettlementForm && settlementForm ? (
                <SocialFinanceSettlementFormView
                  detail={selectedGroup}
                  form={settlementForm}
                  onBack={() => setShowSettlementForm(false)}
                  onCancel={() => setShowSettlementForm(false)}
                />
              ) : (
                <SocialFinanceGroupDetailView
                  detail={selectedGroup}
                  onBack={() => {
                    setSelectedGroupId(null);
                    setShowSettlementForm(false);
                    setShowOptimizedSettlement(false);
                  }}
                  onOpenOptimized={() => {
                    setShowOptimizedSettlement(true);
                    setShowSettlementForm(false);
                  }}
                  onSettle={() => {
                    setShowSettlementForm(true);
                    setShowOptimizedSettlement(false);
                  }}
                />
              )
            ) : (
              <SocialFinanceOverview
                activity={SETTLEMENT_ACTIVITY}
                groups={EXPENSE_GROUPS}
                metrics={SOCIAL_METRICS}
                onSelectGroup={(groupId) => {
                  setSelectedGroupId(groupId);
                  setShowSettlementForm(false);
                  setShowOptimizedSettlement(false);
                }}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
