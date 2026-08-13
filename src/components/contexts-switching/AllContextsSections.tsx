import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";

import {
  CREATE_OPTIONS,
  EMPTY_FORM,
  PROFILE_PRIMARY_COLORS,
  PROFILE_TONES,
} from "@/constants/contexts-switching";
import { useAuth } from "@/hooks/auth/useAuth";
import { useToast } from "@/hooks/toast/useToast";
import { getCurrentMonthTransactions } from "@/services/transactionService";
import { getWalletBalances } from "@/services/walletService";
import type {
  ActiveContextPopup,
  ContextFormData,
  ContextInsightData,
  ContextPerformancePoint,
  ContextSummary,
  ContextTone,
} from "@/types/contexts-switching";
import { profileIcon, profileLabel } from "@/utils/profile";
import { getErrorMessage } from "@/utils/error-message";
import { ContextDeletePopup } from "./ContextDeletePopup";
import { ContextFormPopup } from "./ContextFormPopup";
import { ContextInsightBanner } from "./ContextInsightBanner";
import { ContextListPanel } from "./ContextListPanel";
import { ContextManagePopup } from "./ContextManagePopup";
import { ContextPerformanceCard } from "./ContextPerformanceCard";
import { ContextSafeSpendCard } from "./ContextSafeSpendCard";
import { ContextsHeader } from "./ContextsHeader";
import { ContextSuccessPopup } from "./ContextSuccessPopup";
import { ContextTypePopup } from "./ContextTypePopup";

function profileTone(primaryColor: string | null, fallback: ContextTone) {
  const matchingTone = (Object.keys(PROFILE_PRIMARY_COLORS) as ContextTone[]).find(
    (tone) => PROFILE_PRIMARY_COLORS[tone].toLowerCase() === primaryColor?.toLowerCase(),
  );

  return matchingTone ?? fallback;
}

function formatDate(isoString?: string | null): string {
  if (!isoString) return "";

  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

type AllContextsSectionsProps = { initialAction?: "manage" | "new" };

export function AllContextsSections({ initialAction }: AllContextsSectionsProps) {
  const { createProfile, profiles, updateProfile, user } = useAuth();
  const { error: showError, success } = useToast();
  const requiresProfile = profiles.length === 0;
  const [activePopup, setActivePopup] = useState<ActiveContextPopup | null>(() =>
    requiresProfile || initialAction === "new" ? "create-type"
    : initialAction === "manage" ? "manage"
    : null,
  );
  const [selectedContext, setSelectedContext] = useState<ContextSummary | null>(null);
  const [selectedCreateOption, setSelectedCreateOption] = useState(CREATE_OPTIONS[0]?.id ?? "");
  const [createError, setCreateError] = useState<string | null>(null);
  const [creatingProfile, setCreatingProfile] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [createdContextName, setCreatedContextName] = useState("");
  const [walletBalances, setWalletBalances] = useState<Record<string, number>>({});
  const [performancePoints, setPerformancePoints] = useState<ContextPerformancePoint[]>([]);
  const [monthlyTotals, setMonthlyTotals] = useState({ expenses: 0, income: 0 });

  const popupData = useMemo(
    () => ({
      createForm: EMPTY_FORM,
      createOptions: CREATE_OPTIONS,
      editForm: EMPTY_FORM,
      success: {
        checks: ["Your data is 100% isolated", "Profile type is set", "You can customize anytime"],
        contextName: createdContextName,
      },
    }),
    [createdContextName],
  );

  useEffect(() => {
    let cancelled = false;

    async function loadContextData() {
      const profileIds = profiles.map((profile) => profile.profile_id);

      if (!user || profileIds.length === 0) {
        setWalletBalances({});
        setPerformancePoints([]);
        setMonthlyTotals({ expenses: 0, income: 0 });
        return;
      }

      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);

      const [
        { data: balances, error: walletsError },
        { data: transactions, error: transactionsError },
      ] = await Promise.all([
        getWalletBalances(profileIds),
        getCurrentMonthTransactions(profileIds, monthStart),
      ]);

      if (walletsError) {
        showError("Unable to load context wallets", getErrorMessage(walletsError, "Please try again shortly."));
      }
      if (transactionsError) {
        showError("Unable to load context transactions", getErrorMessage(transactionsError, "Please try again shortly."));
      }
      if (cancelled) return;

      const dailyTotals = (transactions ?? []).reduce<
        Record<string, { expenses: number; income: number }>
      >((result, transaction) => {
        const date = formatDate(transaction.transaction_date);
        if (!date) return result;
        const bucket = (result[date] ??= { expenses: 0, income: 0 });
        const amount = Math.abs(transaction.amount);
        if (transaction.transaction_type?.toLowerCase() === "income") bucket.income += amount;
        else bucket.expenses += amount;
        return result;
      }, {});
      const totals = Object.values(dailyTotals).reduce(
        (result, day) => ({
          expenses: result.expenses + day.expenses,
          income: result.income + day.income,
        }),
        { expenses: 0, income: 0 },
      );

      setWalletBalances(balances);
      setMonthlyTotals(totals);
      setPerformancePoints(
        Object.entries(dailyTotals).map(([date, day]) => ({
          expenses: day.expenses / 1000,
          income: day.income / 1000,
          label: date.slice(5),
          net: (day.income - day.expenses) / 1000,
        })),
      );
    }

    void loadContextData();
    return () => {
      cancelled = true;
    };
  }, [profiles, showError, user]);

  const profileContexts = useMemo(() => {
    const totalBalance = profiles.reduce(
      (total, profile) => total + (walletBalances[profile.profile_id] ?? 0),
      0,
    );

    return profiles.map((profile, index) => ({
      id: profile.profile_id,
      icon: profileIcon(profile.profile_type),
      label: profileLabel(profile),
      percent:
        totalBalance > 0 ?
          Math.round(((walletBalances[profile.profile_id] ?? 0) / totalBalance) * 100)
        : 0,
      profileName: profile.profile_name?.trim() || "Untitled Profile",
      profileType: profile.profile_type,
      currencyCode: profile.base_currency,
      primaryColor: profile.primary_color,
      subtitle: `${profile.base_currency} Profile`,
      tone: profileTone(profile.primary_color, PROFILE_TONES[index % PROFILE_TONES.length]),
    }));
  }, [profiles, walletBalances]);

  const insight = useMemo<ContextInsightData>(() => {
    if (profileContexts.length === 0) {
      return {
        actionLabel: "Create profile",
        emphasizedLabel: "Next step:",
        message: "Create your first profile to start tracking its finances.",
      };
    }

    return {
      actionLabel: "View transactions",
      emphasizedLabel: "This month:",
      message: `${monthlyTotals.income.toLocaleString()} income and ${monthlyTotals.expenses.toLocaleString()} expenses across your profiles.`,
    };
  }, [monthlyTotals, profileContexts.length]);

  const safeSpendCards = useMemo(
    () =>
      profileContexts.map((context) => ({
        amount: walletBalances[context.id] ?? 0,
        contextId: context.id,
        label: context.label,
        percent: context.percent,
        primaryColor: context.primaryColor,
        tone: context.tone,
      })),
    [profileContexts, walletBalances],
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

  async function handleCreateSubmit(form: ContextFormData) {
    const profileName = form.name.trim();

    if (!profileName) {
      setCreateError("Enter a profile name before creating it.");
      return;
    }

    setCreateError(null);
    setCreatingProfile(true);

    const { data: profile, error } = await createProfile({
      base_currency: form.currencyCode,
      profile_name: profileName,
      primary_color: PROFILE_PRIMARY_COLORS[form.selectedTone],
      profile_type: selectedCreateOption,
    });

    setCreatingProfile(false);

    if (error) {
      setCreateError(error.message);
      return;
    }

    const createdProfileName = profile?.profile_name ?? profileName;
    setCreatedContextName(createdProfileName);
    success("Context created", `${createdProfileName} is ready to use.`);
    setActivePopup("success");
  }

  async function handleEditSubmit(form: ContextFormData) {
    if (!selectedContext) return;

    const profileName = form.name.trim();

    if (!profileName) {
      setCreateError("Enter a profile name before saving it.");
      return;
    }

    setCreateError(null);
    setUpdatingProfile(true);

    const { error } = await updateProfile(selectedContext.id, {
      base_currency: form.currencyCode,
      primary_color: PROFILE_PRIMARY_COLORS[form.selectedTone],
      profile_name: profileName,
    });

    setUpdatingProfile(false);

    if (error) {
      setCreateError(error.message);
      return;
    }

    success("Context updated", `${profileName} has been saved.`);
    setActivePopup("manage");
    setSelectedContext(null);
  }

  return (
    <View className="gap-5">
      <ContextsHeader onCreate={openCreateFlow} onManage={openManagePopup} />

      <View className="gap-5 xl:flex-row">
        <ContextListPanel data={profileContexts} />
        <ContextPerformanceCard contextCount={profileContexts.length} data={performancePoints} />
      </View>

      <View className="gap-5 md:flex-row md:flex-wrap">
        {safeSpendCards.map((card) => (
          <View key={card.contextId} className="md:min-w-[12rem] md:flex-1">
            <ContextSafeSpendCard data={card} />
          </View>
        ))}
      </View>

      <ContextInsightBanner data={insight} />

      <ContextManagePopup
        data={profileContexts}
        onClose={closePopup}
        onCreate={openCreateFlow}
        onDelete={openDeletePopup}
        onEdit={openEditPopup}
        visible={activePopup === "manage"}
      />

      <ContextTypePopup
        data={popupData.createOptions}
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
        data={popupData.createForm}
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
          ...popupData.editForm,
          name: selectedContext?.profileName ?? popupData.editForm.name,
          currencyCode: selectedContext?.currencyCode ?? popupData.editForm.currencyCode,
          selectedTone: selectedContext?.tone ?? popupData.editForm.selectedTone,
        }}
        mode="edit"
        onBack={openManagePopup}
        onClose={closePopup}
        onSubmit={handleEditSubmit}
        submitting={updatingProfile}
        visible={activePopup === "edit"}
      />

      <ContextDeletePopup
        data={selectedContext}
        onCancel={openManagePopup}
        onConfirm={closePopup}
        visible={activePopup === "delete"}
      />

      <ContextSuccessPopup
        data={popupData.success}
        onBack={() => setActivePopup("create-form")}
        onClose={closePopup}
        onGoToContext={closePopup}
        visible={activePopup === "success"}
      />
    </View>
  );
}
