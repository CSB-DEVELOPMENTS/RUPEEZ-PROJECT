import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import { Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { SettingsProfileSectionData } from "@/types/settings";

import { SettingsActionButton } from "./SettingsActionButton";
import { SettingsInfoField } from "./SettingsInfoField";
import { SettingsSectionCard } from "./SettingsSectionCard";

export function SettingsProfileSection({ data }: { data: SettingsProfileSectionData }) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <SettingsSectionCard>
      <View className="gap-8">
        <View className="gap-5 border-b border-app-border pb-8 md:flex-row md:items-center md:justify-between">
          <View className="flex-col sm:flex-row items-center gap-4">
            <View className="h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-app-border bg-app-panel">
              {data.identity.imageUri ?
                <Image
                  contentFit="cover"
                  source={{ uri: data.identity.imageUri }}
                  style={{ height: "100%", width: "100%" }}
                />
              : <Text className="font-display text-3xl font-semibold text-app-text">
                  {data.identity.initials}
                </Text>
              }
            </View>

            <View className="gap-2">
              <Text className="font-display text-2xl font-semibold text-app-text">
                {data.identity.title}
              </Text>
              <Text className="font-display text-base text-app-muted">{data.identity.note}</Text>
              <View className="hidden sm:flex flex-row flex-wrap gap-3 pt-1">
                {data.actions.map((action) => (
                  <SettingsActionButton
                    key={action.label}
                    label={action.label}
                    tone={action.tone}
                  />
                ))}
              </View>
            </View>
            <View className="flex-row flex-wrap gap-3 pt-1 sm:hidden">
              {data.actions.map((action) => (
                <SettingsActionButton key={action.label} label={action.label} tone={action.tone} />
              ))}
            </View>
          </View>
        </View>

        <View className="gap-6">
          <View className="flex-row items-center gap-3">
            <MaterialCommunityIcons color={colors.primaryStrong} name="account-outline" size={24} />
            <Text className="font-display text-2xl font-semibold text-app-text">
              {data.sectionTitle}
            </Text>
          </View>

          <View className="gap-5">
            <View className="gap-5 lg:flex-row">
              <View className="lg:flex-1">
                <SettingsInfoField data={data.fields[0]} trailingIcon="" />
              </View>
              <View className="lg:flex-1">
                <SettingsInfoField data={data.fields[1]} />
              </View>
            </View>

            <View className="gap-5 lg:flex-row">
              <View className="lg:flex-1">
                <SettingsInfoField data={data.fields[2]} trailingIcon="" />
              </View>
              <View className="lg:flex-1">
                <SettingsInfoField data={data.fields[3]} trailingIcon="" />
              </View>
            </View>

            <SettingsInfoField data={data.fields[4]} multiline trailingIcon="" />
          </View>
        </View>
        <View className="items-stretch md:items-end">
          <SettingsActionButton {...data.footerAction} />
        </View>
      </View>
    </SettingsSectionCard>
  );
}
