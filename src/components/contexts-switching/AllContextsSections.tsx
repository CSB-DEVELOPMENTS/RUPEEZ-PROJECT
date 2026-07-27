import { useMemo, useState } from "react";
import { View } from "react-native";

import { useAuth } from "@/hooks/auth/useAuth";
import type {
  ActiveContextPopup,
  AllContextsPageData,
  ContextSummary,
  ContextTone,
} from "@/types/contexts-switching";
import { profileLabel } from "@/utils/profile";
import {
  ContextDeletePopup,
  ContextFormPopup,
  ContextManagePopup,
  ContextSuccessPopup,
  ContextTypePopup,
} from "./";

import { ContextInsightBanner } from "./ContextInsightBanner";
import { ContextListPanel } from "./ContextListPanel";
import { ContextPerformanceCard } from "./ContextPerformanceCard";
import { ContextSafeSpendCard } from "./ContextSafeSpendCard";
import { ContextsHeader } from "./ContextsHeader";

const PROFILE_TONES: ContextTone[] = ["primary", "brand", "teal", "orange", "danger"];
const PROFILE_ICONS: ContextSummary["icon"][] = [
  "account-outline",
  "briefcase-outline",
  "school-outline",
  "rocket-launch-outline",
  "home-outline",
];
const PROFILE_PRIMARY_COLORS: Record<ContextTone, string> = {
  primary: "#22C55E",
  brand: "#3B82F6",
  teal: "#14B8A6",
  orange: "#F97316",
  danger: "#EF4444",
};

type AllContextsSectionsProps = { data: AllContextsPageData; initialAction?: "manage" | "new" };

export function AllContextsSections({ data, initialAction }: AllContextsSectionsProps) {
  const { createProfile, profiles } = useAuth();
  const requiresProfile = false; //need to add this logic: profiles.length === 0;
  const [activePopup, setActivePopup] = useState<ActiveContextPopup | null>(() =>
    requiresProfile || initialAction === "new" ? "create-type"
    : initialAction === "manage" ? "manage"
    : null,
  );
  const [selectedContext, setSelectedContext] = useState<ContextSummary | null>(null);
  const [selectedCreateOption, setSelectedCreateOption] = useState(
    data.popups.createOptions[0]?.id ?? "",
  );
  const [createError, setCreateError] = useState<string | null>(null);
  const [creatingProfile, setCreatingProfile] = useState(false);
  const [createdContextName, setCreatedContextName] = useState(data.popups.success.contextName);

  const profileContexts = useMemo(
    () =>
      profiles.map((profile, index) => ({
        id: profile.profile_id,
        icon: PROFILE_ICONS[index % PROFILE_ICONS.length],
        label: profileLabel(profile),
        percent: 0,
        profileName: profile.profile_name?.trim() || "Untitled Profile",
        profileType: profile.profile_type,
        primaryColor: profile.primary_color,
        subtitle: `${profile.base_currency} Profile`,
        tone: PROFILE_TONES[index % PROFILE_TONES.length],
      })),
    [profiles],
  );

  const pageData = useMemo(
    () => ({
      ...data,
      contexts: profileContexts,
      popups: {
        ...data.popups,
        success: { ...data.popups.success, contextName: createdContextName },
      },
      safeSpendCards: profileContexts.map((context) => ({
        amount: 0,
        contextId: context.id,
        label: context.label,
        percent: context.percent,
        primaryColor: context.primaryColor,
        tone: context.tone,
      })),
    }),
    [createdContextName, data, profileContexts],
  );

  function openCreateFlow() {
    setCreateError(null);
    setActivePopup("create-type");
  }

  function openManagePopup() {
    setActivePopup(requiresProfile ? "create-type" : "manage");
  }

  function closePopup() {
    if (requiresProfile) {
      setActivePopup("create-type");
      return;
    }

    setActivePopup(null);
    setSelectedContext(null);
    setCreateError(null);
  }

  function openEditPopup(context: ContextSummary) {
    setSelectedContext(context);
    setActivePopup("edit");
  }

  function openDeletePopup(context: ContextSummary) {
    setSelectedContext(context);
    setActivePopup("delete");
  }

  async function handleCreateSubmit(form: AllContextsPageData["popups"]["createForm"]) {
    const profileName = form.name.trim();

    if (!profileName) {
      setCreateError("Enter a profile name before creating it.");
      return;
    }

    setCreateError(null);
    setCreatingProfile(true);

    const { data: profile, error } = await createProfile({
      base_currency: "LKR",
      profile_name: profileName,
      primary_color: PROFILE_PRIMARY_COLORS[form.selectedTone],
      profile_type: selectedCreateOption,
    });

    setCreatingProfile(false);

    if (error) {
      setCreateError(error.message);
      return;
    }

    setCreatedContextName(profile?.profile_name ?? profileName);
    setActivePopup("success");
  }

  return (
    <View className="gap-5">
      <ContextsHeader onCreate={openCreateFlow} onManage={openManagePopup} />

      <View className="gap-5 xl:flex-row">
        <ContextListPanel data={pageData.contexts} />
        <ContextPerformanceCard data={pageData.performancePoints} />
      </View>

      <View className="gap-5 md:flex-row md:flex-wrap">
        {pageData.safeSpendCards.map((card) => (
          <View key={card.contextId} className="md:min-w-[12rem] md:flex-1">
            <ContextSafeSpendCard data={card} />
          </View>
        ))}
      </View>

      <ContextInsightBanner data={pageData.insight} />

      <ContextManagePopup
        data={pageData.contexts}
        onClose={closePopup}
        onCreate={openCreateFlow}
        onDelete={openDeletePopup}
        onEdit={openEditPopup}
        visible={activePopup === "manage"}
      />

      <ContextTypePopup
        data={pageData.popups.createOptions}
        onBack={() => {
          if (!requiresProfile) openManagePopup();
        }}
        onClose={closePopup}
        onNext={() => setActivePopup("create-form")}
        onSelect={setSelectedCreateOption}
        selectedId={selectedCreateOption}
        visible={activePopup === "create-type"}
      />

      <ContextFormPopup
        key="create-context-form"
        data={pageData.popups.createForm}
        errorMessage={createError}
        mode="create"
        onBack={() => setActivePopup("create-type")}
        onClose={closePopup}
        onSubmit={handleCreateSubmit}
        submitting={creatingProfile}
        visible={activePopup === "create-form"}
      />

      <ContextFormPopup
        key={selectedContext?.id ?? "edit-context-form"}
        data={{
          ...pageData.popups.editForm,
          name: selectedContext?.profileName ?? pageData.popups.editForm.name,
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
        data={pageData.popups.success}
        onBack={() => setActivePopup("create-form")}
        onClose={closePopup}
        onGoToContext={closePopup}
        visible={activePopup === "success"}
      />
    </View>
  );
}
