import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Switch, Text, TextInput, View } from "react-native";

import { Colors, Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { ActiveSubscriptionItem } from "@/types/dashboard";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type EditSubscriptionModalProps = {
  subscription: ActiveSubscriptionItem | null;
  visible: boolean;
  onClose: () => void;
  onSave: (subscription: ActiveSubscriptionItem) => void;
};

type SubscriptionFormState = Pick<
  ActiveSubscriptionItem,
  "amountLabel" | "billingCycleLabel" | "isActive" | "name" | "plan" | "renewalLabel"
>;

const emptyFormState: SubscriptionFormState = {
  amountLabel: "",
  billingCycleLabel: "",
  isActive: true,
  name: "",
  plan: "",
  renewalLabel: "",
};

const appCssColor = (token: string) => `rgb(var(${token}))`;

function ModalField({
  label,
  onChangeText,
  placeholder,
  value,
}: {
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
}) {
  return (
    <View className="gap-2">
      <Text className="font-display text-xs font-semibold uppercase tracking-[1.5px] text-app-muted">
        {label}
      </Text>
      <TextInput
        className="min-h-14 rounded-2xl border border-app-border bg-app-panel/55 px-4 py-3 text-base text-app-text"
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={appCssColor("--app-text-soft")}
        style={{ fontFamily: Fonts.sans }}
        value={value}
      />
    </View>
  );
}

export function EditSubscriptionModal({
  subscription,
  visible,
  onClose,
  onSave,
}: EditSubscriptionModalProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const [formState, setFormState] = useState<SubscriptionFormState>(emptyFormState);

  useEffect(() => {
    const setSubscription = () => {
      if (!subscription) {
        setFormState(emptyFormState);
        return;
      }

      setFormState({
        amountLabel: subscription.amountLabel,
        billingCycleLabel: subscription.billingCycleLabel,
        isActive: subscription.isActive,
        name: subscription.name,
        plan: subscription.plan,
        renewalLabel: subscription.renewalLabel,
      });
    };
    setSubscription();
  }, [subscription]);

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <Pressable className={`${theme} flex-1 bg-black/45 px-5 py-8`} onPress={onClose}>
        <View className="flex-1 justify-center">
          <Pressable
            className="mx-auto max-h-full w-full max-w-2xl rounded-[32px] border border-app-border bg-app-bg p-5 shadow-showcase-soft md:p-6 hover:cursor-default"
            onPress={() => {}}>
            <ScrollView showsVerticalScrollIndicator={false} className="bg-app-bg">
              <View className="gap-6 bg-app-bg">
                <View className="flex-row items-start justify-between gap-4">
                  <View className="min-w-0 flex-1 gap-2">
                    <Text className="font-display text-2xl font-semibold text-app-text">
                      Edit Subscription
                    </Text>
                    <Text className="font-display text-base text-app-muted">
                      Update the plan details and renewal information for this subscription.
                    </Text>
                  </View>

                  <Pressable className="rounded-full p-2" onPress={onClose}>
                    <MaterialCommunityIcons name="close" size={20} color={colors.text} />
                  </Pressable>
                </View>

                <View className="gap-4">
                  <ModalField
                    label="Subscription name"
                    onChangeText={(value) =>
                      setFormState((current) => ({ ...current, name: value }))
                    }
                    placeholder="Netflix"
                    value={formState.name}
                  />
                  <ModalField
                    label="Amount"
                    onChangeText={(value) =>
                      setFormState((current) => ({ ...current, amountLabel: value }))
                    }
                    placeholder="LKR 2,290.00"
                    value={formState.amountLabel}
                  />
                  <ModalField
                    label="Billing cycle"
                    onChangeText={(value) =>
                      setFormState((current) => ({ ...current, billingCycleLabel: value }))
                    }
                    placeholder="Monthly"
                    value={formState.billingCycleLabel}
                  />

                  <View className="flex-row items-center justify-between rounded-[24px] border border-app-border bg-app-panel/40 px-4 py-4">
                    <View className="min-w-0 flex-1 gap-1 pr-4">
                      <Text className="font-display text-base font-semibold text-app-text">
                        Subscription status
                      </Text>
                      <Text className="font-display text-sm text-app-muted">
                        Toggle whether this subscription is currently active.
                      </Text>
                    </View>

                    <Switch
                      onValueChange={(value) =>
                        setFormState((current) => ({ ...current, isActive: value }))
                      }
                      thumbColor={
                        formState.isActive ?
                          appCssColor("--app-primary-contrast")
                        : appCssColor("--app-surface")
                      }
                      trackColor={{
                        false: appCssColor("--app-border"),
                        true: appCssColor("--app-primary"),
                      }}
                      value={formState.isActive}
                    />
                  </View>
                </View>

                <View className="flex-col gap-3 sm:flex-row sm:justify-end">
                  <Pressable
                    className="min-h-12 items-center justify-center rounded-2xl border border-app-border px-5 py-3"
                    onPress={onClose}>
                    <Text className="font-display text-base font-semibold text-app-text">
                      Cancel
                    </Text>
                  </Pressable>

                  <Pressable
                    className="min-h-12 items-center justify-center rounded-2xl bg-app-primary px-5 py-3"
                    disabled={!subscription}
                    onPress={() => {
                      if (!subscription) {
                        return;
                      }

                      onSave({
                        ...subscription,
                        ...formState,
                        statusLabel: formState.isActive ? "Active" : "Inactive",
                      });
                    }}>
                    <Text className="font-display text-base font-semibold text-app-primary-contrast">
                      Save changes
                    </Text>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
