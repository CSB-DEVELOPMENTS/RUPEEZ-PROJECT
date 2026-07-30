import { ScrollView, Text, View } from "react-native";

import type { SettingsPageIntro } from "@/types/settings";

type SettingsPageShellProps = { children: React.ReactNode; intro: SettingsPageIntro };

export function SettingsPageShell({ children, intro }: SettingsPageShellProps) {
  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 md:px-8 lg:px-10">
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
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
