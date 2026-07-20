import { useState } from "react";
import { View } from "react-native";

import {
  ContextDeletePopup,
  ContextFormPopup,
  ContextManagePopup,
  ContextSuccessPopup,
  ContextTypePopup,
} from "@/components/analytics";
import type { AllContextsPageData, ContextSummary } from "@/types/contexts-switching";

import { ContextInsightBanner } from "./ContextInsightBanner";
import { ContextListPanel } from "./ContextListPanel";
import { ContextPerformanceCard } from "./ContextPerformanceCard";
import { ContextSafeSpendCard } from "./ContextSafeSpendCard";
import { ContextsHeader } from "./ContextsHeader";

type ActiveContextPopup = "create-form" | "create-type" | "delete" | "edit" | "manage" | "success";

type AllContextsSectionsProps = {
  data: AllContextsPageData;
  initialAction?: "manage" | "new";
};

export function AllContextsSections({ data, initialAction }: AllContextsSectionsProps) {
  const [activePopup, setActivePopup] = useState<ActiveContextPopup | null>(() =>
    initialAction === "manage" ? "manage" : initialAction === "new" ? "create-type" : null,
  );
  const [selectedContext, setSelectedContext] = useState<ContextSummary | null>(null);
  const [selectedCreateOption, setSelectedCreateOption] = useState(
    data.popups.createOptions[0]?.id ?? "",
  );

  function openCreateFlow() {
    setActivePopup("create-type");
  }

  function openManagePopup() {
    setActivePopup("manage");
  }

  function closePopup() {
    setActivePopup(null);
    setSelectedContext(null);
  }

  function openEditPopup(context: ContextSummary) {
    setSelectedContext(context);
    setActivePopup("edit");
  }

  function openDeletePopup(context: ContextSummary) {
    setSelectedContext(context);
    setActivePopup("delete");
  }

  return (
    <View className="gap-5">
      <ContextsHeader onCreate={openCreateFlow} onManage={openManagePopup} />

      <View className="gap-5 xl:flex-row">
        <ContextListPanel data={data.contexts} />
        <ContextPerformanceCard data={data.performancePoints} />
      </View>

      <View className="gap-5 md:flex-row md:flex-wrap">
        {data.safeSpendCards.map((card) => (
          <View key={card.contextId} className="md:min-w-[12rem] md:flex-1">
            <ContextSafeSpendCard data={card} />
          </View>
        ))}
      </View>

      <ContextInsightBanner data={data.insight} />

      <ContextManagePopup
        data={data.contexts}
        onClose={closePopup}
        onCreate={openCreateFlow}
        onDelete={openDeletePopup}
        onEdit={openEditPopup}
        visible={activePopup === "manage"}
      />

      <ContextTypePopup
        data={data.popups.createOptions}
        onBack={openManagePopup}
        onClose={closePopup}
        onNext={() => setActivePopup("create-form")}
        onSelect={setSelectedCreateOption}
        selectedId={selectedCreateOption}
        visible={activePopup === "create-type"}
      />

      <ContextFormPopup
        key="create-context-form"
        data={data.popups.createForm}
        mode="create"
        onBack={() => setActivePopup("create-type")}
        onClose={closePopup}
        onSubmit={() => setActivePopup("success")}
        visible={activePopup === "create-form"}
      />

      <ContextFormPopup
        key={selectedContext?.id ?? "edit-context-form"}
        data={{
          ...data.popups.editForm,
          name: selectedContext?.label ?? data.popups.editForm.name,
        }}
        mode="edit"
        onBack={openManagePopup}
        onClose={closePopup}
        onSubmit={openManagePopup}
        visible={activePopup === "edit"}
      />

      <ContextDeletePopup
        data={selectedContext}
        onCancel={openManagePopup}
        onConfirm={closePopup}
        visible={activePopup === "delete"}
      />

      <ContextSuccessPopup
        data={data.popups.success}
        onBack={() => setActivePopup("create-form")}
        onClose={closePopup}
        onGoToContext={closePopup}
        visible={activePopup === "success"}
      />
    </View>
  );
}
