import { ScrollView, Text, View } from "react-native";

import type { SettingsFooterAction, SettingsPageIntro } from "@/types/settings";

import { SettingsActionButton } from "./SettingsActionButton";

type SettingsPageShellProps = {
  children: React.ReactNode;
  footerAction?: SettingsFooterAction;
  intro: SettingsPageIntro;
};

export function SettingsPageShell({ children, footerAction, intro }: SettingsPageShellProps) {
  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <View className="relative overflow-hidden p-4 md:p-6">
          <View className="absolute -left-12 top-16 h-40 w-40 rounded-full bg-app-primary/10" />
          <View className="absolute -right-10 top-8 h-52 w-52 rounded-full bg-app-brand/10" />

          <View className="relative gap-5">
            <View className="max-w-3xl gap-3">
              <View className="gap-2">
                <Text className="font-display text-3xl font-semibold tracking-tight text-app-text md:text-5xl">
                  {intro.title}
                </Text>
                <Text className="font-display text-lg leading-7 text-app-muted md:text-xl">
                  {intro.description}
                </Text>
              </View>
            </View>

            {children}

            {footerAction ?
              <View className="items-stretch md:items-end">
                <SettingsActionButton {...footerAction} />
              </View>
            : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
