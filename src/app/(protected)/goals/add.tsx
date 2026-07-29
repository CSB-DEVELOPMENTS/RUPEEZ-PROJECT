import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, useWindowDimensions, View } from "react-native";

import { Colors, Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type Participant = {
  name: string;
  email: string;
  initials: string;
  accentClassName: string;
};

const participants: Participant[] = [
  {
    name: "James Wilson",
    email: "james.w@wealthos.com",
    initials: "JW",
    accentClassName: "bg-app-brand/20",
  },
  {
    name: "Sarah Chen",
    email: "s.chen@fintech.io",
    initials: "SC",
    accentClassName: "bg-app-primary-muted",
  },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text className="font-display text-xs font-bold uppercase tracking-[1.4px] text-app-muted">
      {children}
    </Text>
  );
}

function GoalInput({
  keyboardType,
  placeholder,
  prefix,
  rightIcon,
}: {
  keyboardType?: "default" | "numeric" | "email-address";
  placeholder: string;
  prefix?: string;
  rightIcon?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="h-14 flex-row items-center gap-3 rounded-[10px] border border-app-border bg-app-bg px-4 md:h-[58px]">
      {prefix ? (
        <Text className="font-display text-base font-bold uppercase text-app-muted">{prefix}</Text>
      ) : null}
      <TextInput
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={colors.textSoft}
        className="min-w-0 flex-1 font-display text-base text-app-text outline-none"
        style={{ fontFamily: Fonts.sans }}
      />
      {rightIcon ? (
        <MaterialCommunityIcons name={rightIcon} size={22} color={colors.textMuted} />
      ) : null}
    </View>
  );
}

function SharedGoalToggle() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const [shared, setShared] = useState(true);

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel="Shared goal"
      accessibilityState={{ checked: shared }}
      onPress={() => setShared((current) => !current)}
      className="h-[60px] flex-row items-center justify-between rounded-[10px] border border-app-border bg-app-bg px-4 md:h-[58px]">
      <View className="flex-row items-center gap-3">
        <MaterialCommunityIcons name="share-variant-outline" size={23} color={colors.textMuted} />
        <Text className="font-display text-base text-app-text md:text-lg">Shared Goal</Text>
      </View>

      <View
        className={`h-6 w-12 justify-center rounded-full px-0.5 ${
          shared ? "items-end bg-app-primary" : "items-start bg-app-panel-strong"
        }`}>
        <View className="h-5 w-5 rounded-full bg-white" />
      </View>
    </Pressable>
  );
}

function ParticipantRow({ participant }: { participant: Participant }) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="min-h-[72px] flex-row items-center gap-4 rounded-[10px] border border-app-border bg-black/40 px-4">
      <View
        className={`h-10 w-10 items-center justify-center rounded-full ${participant.accentClassName}`}>
        <Text className="font-display text-xs font-bold text-app-text">{participant.initials}</Text>
      </View>
      <View className="min-w-0 flex-1">
        <Text className="font-display text-base font-bold text-app-text">{participant.name}</Text>
        <Text numberOfLines={1} className="mt-0.5 font-display text-sm text-app-muted">
          {participant.email}
        </Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Remove ${participant.name}`}
        className="h-9 w-9 items-center justify-center rounded-full active:bg-app-panel">
        <MaterialCommunityIcons name="close" size={22} color={colors.textMuted} />
      </Pressable>
    </View>
  );
}

export default function AddGoalScreen() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [participantEmail, setParticipantEmail] = useState("");
  const isDesktop = width >= 768;

  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full max-w-[1008px] px-4 pb-8 pt-2 md:px-8 md:pb-10 lg:px-10">
        <View className="overflow-hidden rounded-[14px] border border-app-border bg-app-surface shadow-showcase-soft-dark">
          <View className="border-b border-app-border bg-app-bg-accent px-8 py-9 md:px-9">
            <View className="flex-row items-center gap-5">
              <View className="h-12 w-12 items-center justify-center rounded-[10px] bg-app-primary-muted">
                <MaterialCommunityIcons
                  name="rocket-launch-outline"
                  size={29}
                  color={colors.primary}
                />
              </View>
              <View className="min-w-0 flex-1">
                <Text className="font-display text-xl font-bold text-app-text md:text-2xl">
                  Goal Configuration
                </Text>
                <Text className="mt-1 max-w-xl font-display text-sm leading-5 text-app-muted">
                  Configure your target parameters and collaborative settings.
                </Text>
              </View>
            </View>
          </View>

          <View className="px-8 py-8 md:px-9">
            <View className="gap-8 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-8">
              <View className="gap-3">
                <FieldLabel>Goal Name</FieldLabel>
                <GoalInput placeholder="e.g. Coastal Residence Fund" />
              </View>

              <View className="gap-3">
                <FieldLabel>Target Amount</FieldLabel>
                <GoalInput keyboardType="numeric" placeholder="0.00" prefix="LKR" />
              </View>

              <View className="gap-3">
                <FieldLabel>Target Date / Deadline</FieldLabel>
                <GoalInput placeholder="mm/dd/yyyy" rightIcon="calendar-month-outline" />
              </View>

              <View className="justify-end">
                <SharedGoalToggle />
              </View>
            </View>

            <View className="my-8 h-px bg-app-border" />

            <View className="gap-3">
              <FieldLabel>Add Participants</FieldLabel>
              <View className="flex-row gap-2">
                <View className="h-14 min-w-0 flex-1 justify-center rounded-[10px] border border-app-border bg-app-bg px-4 md:h-[58px]">
                  <TextInput
                    keyboardType="email-address"
                    value={participantEmail}
                    onChangeText={setParticipantEmail}
                    placeholder="colleague@wealthos.com"
                    placeholderTextColor={colors.textSoft}
                    className="font-display text-base text-app-text outline-none"
                    style={{ fontFamily: Fonts.sans }}
                  />
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Add participant"
                  className="h-14 w-14 items-center justify-center rounded-[10px] bg-app-panel-strong active:bg-app-panel md:h-[58px] md:w-20">
                  {isDesktop ? (
                    <Text className="font-display text-base font-bold text-app-text">Add</Text>
                  ) : (
                    <MaterialCommunityIcons
                      name="account-plus-outline"
                      size={25}
                      color={colors.text}
                    />
                  )}
                </Pressable>
              </View>
            </View>

            <View className="mt-3">
              <FieldLabel>Already Added</FieldLabel>
              <View className="mt-3 gap-3">
                {participants.map((participant) => (
                  <ParticipantRow key={participant.email} participant={participant} />
                ))}
              </View>
            </View>

            <View className="mt-4 flex-row items-start gap-2">
              <MaterialCommunityIcons
                name="information-outline"
                size={15}
                color={colors.textMuted}
              />
              <Text className="min-w-0 flex-1 font-display text-xs leading-5 text-app-muted">
                Participants will receive an invitation to view and contribute to this goal.
              </Text>
            </View>
          </View>

          <View className="px-8 pb-8 pt-12 md:px-9 md:pb-12 md:pt-14">
            <View className="gap-3 md:flex-row md:justify-end md:gap-4">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Create goal"
                className="h-[54px] items-center justify-center rounded-[10px] bg-app-primary px-8 shadow-showcase-phone active:bg-app-primary-strong md:w-40">
                <Text className="font-display text-base font-bold text-app-primary-contrast">
                  Create Goal
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Cancel creating goal"
                onPress={() => router.back()}
                className="h-[54px] items-center justify-center rounded-[10px] border border-app-border px-8 active:bg-app-panel md:-order-1 md:w-32">
                <Text className="font-display text-base font-bold text-app-muted">Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
