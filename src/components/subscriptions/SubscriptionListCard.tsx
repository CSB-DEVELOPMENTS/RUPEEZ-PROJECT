import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text, View } from "react-native";

import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { subscriptionToneClass } from "@/components/dashboard/DashboardSections";
import { SubscriptionActionsMenu } from "@/components/subscriptions/SubscriptionActionsMenu";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { ActiveSubscriptionItem } from "@/types/dashboard";

function footerToneClasses(isActive: boolean) {
  return isActive ?
      {
        pill: "bg-app-primary/20",
        switchTrack: "bg-app-primary",
        switchThumb: "bg-app-primary-contrast",
        text: "text-app-text",
      }
    : {
        pill: "bg-app-panel/70",
        switchTrack: "bg-app-border",
        switchThumb: "bg-app-surface",
        text: "text-app-muted",
      };
}

type SubscriptionListCardProps = {
  data: ActiveSubscriptionItem;
  isMenuOpen: boolean;
  onDelete: (subscription: ActiveSubscriptionItem) => void;
  onEdit: (subscription: ActiveSubscriptionItem) => void;
  onMenuToggle: () => void;
  onMenuClose: () => void;
};

export function SubscriptionListCard({
  data,
  isMenuOpen,
  onDelete,
  onEdit,
  onMenuToggle,
  onMenuClose,
}: SubscriptionListCardProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const statusTone = footerToneClasses(data.isActive);

  return (
    <DashboardCard className={`relative overflow-visible p-0 ${isMenuOpen ? "z-50" : "z-0"}`}>
      {isMenuOpen ?
        <Pressable className="absolute inset-0 z-10" onPress={onMenuClose} />
      : null}

      <View className="gap-6 px-5 py-5 md:px-6 md:py-6">
        <View className="flex-row items-start justify-between gap-4">
          <View className="min-w-0 flex-1 flex-row items-start gap-4">
            <View
              className={`h-12 w-12 items-center justify-center rounded-2xl ${subscriptionToneClass(data.tone)}`}>
              <Text className="font-display text-lg font-semibold">
                {data.name.slice(0, 1).toUpperCase()}
              </Text>
            </View>

            <View className="min-w-0 flex-1 gap-1">
              <Text className="font-display text-xl font-semibold text-app-text">{data.name}</Text>
              <Text className="font-display text-base text-app-muted">{data.plan}</Text>
            </View>
          </View>

          {/* <View className="rounded-2xl bg-app-panel/70 px-3 py-2">
            <Text className="font-display text-xs font-semibold uppercase tracking-[1.2px] text-app-muted">
              {data.category}
            </Text>
          </View> */}
        </View>

        <View className="gap-3 md:justify-between">
          <View className="gap-1">
            <Text className="font-display text-3xl font-semibold tracking-tight text-app-text">
              {data.amountLabel}
            </Text>
            <Text className="font-display text-base text-app-muted">{data.billingCycleLabel}</Text>
          </View>

          <View className="gap-1 md:items-end">
            <Text className="font-display text-sm uppercase tracking-[1.2px] text-app-muted">
              Renewal
            </Text>
            <Text className="font-display text-base font-semibold text-app-text">
              {data.renewalLabel}
            </Text>
          </View>
        </View>
      </View>

      <View className="border-t border-app-border px-5 py-4 md:px-6">
        <View className="flex-row items-center justify-between gap-4">
          <View className={`flex-row items-center gap-3 rounded-full px-3 py-2 ${statusTone.pill}`}>
            <View className={`h-6 w-11 rounded-full px-1 py-1 ${statusTone.switchTrack}`}>
              <View
                className={`h-4 w-4 rounded-full ${statusTone.switchThumb} ${
                  data.isActive ? "ml-auto" : "mr-auto"
                }`}
              />
            </View>
            <Text
              className={`font-display text-sm font-semibold uppercase tracking-[1.5px] ${statusTone.text}`}>
              {data.statusLabel}
            </Text>
          </View>

          <View className="relative">
            <Pressable
              accessibilityLabel={`Open actions for ${data.name}`}
              className="rounded-full p-2"
              onPress={onMenuToggle}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={20}
                color={data.isActive ? colors.textMuted : colors.textSoft}
              />
            </Pressable>

            <SubscriptionActionsMenu
              visible={isMenuOpen}
              onDelete={() => {
                onMenuClose();
                onDelete(data);
              }}
              onEdit={() => {
                onMenuClose();
                onEdit(data);
              }}
            />
          </View>
        </View>
      </View>
    </DashboardCard>
  );
}
