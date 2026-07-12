import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image } from "expo-image";
import { useState } from "react";
import { Text, View } from "react-native";

import { InputField } from "@/components/common/InputField";
import { Textarea } from "@/components/common/Textarea";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { SettingsProfileSectionData } from "@/types/settings";

import { SettingsActionButton } from "./SettingsActionButton";
import { SettingsSectionCard } from "./SettingsSectionCard";

export function SettingsProfileSection({ data }: { data: SettingsProfileSectionData }) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(data.fields.map((field) => [field.label, field.value])),
  );

  function updateFieldValue(label: string, value: string) {
    setFieldValues((current) => ({ ...current, [label]: value }));
  }

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
                <InputField
                  disabled={data.fields[0].isLocked}
                  helperText={data.fields[0].helperText}
                  label={data.fields[0].label}
                  onChangeText={(value) => updateFieldValue(data.fields[0].label, value)}
                  value={fieldValues[data.fields[0].label] ?? data.fields[0].value}
                />
              </View>
              <View className="lg:flex-1">
                <InputField
                  disabled={data.fields[1].isLocked}
                  helperText={data.fields[1].helperText}
                  label={data.fields[1].label}
                  onChangeText={(value) => updateFieldValue(data.fields[1].label, value)}
                  value={fieldValues[data.fields[1].label] ?? data.fields[1].value}
                />
              </View>
            </View>

            <View className="gap-5 lg:flex-row">
              <View className="lg:flex-1">
                <InputField
                  disabled={data.fields[2].isLocked}
                  helperText={data.fields[2].helperText}
                  label={data.fields[2].label}
                  onChangeText={(value) => updateFieldValue(data.fields[2].label, value)}
                  value={fieldValues[data.fields[2].label] ?? data.fields[2].value}
                />
              </View>
              <View className="lg:flex-1">
                <InputField
                  disabled={data.fields[3].isLocked}
                  helperText={data.fields[3].helperText}
                  label={data.fields[3].label}
                  onChangeText={(value) => updateFieldValue(data.fields[3].label, value)}
                  value={fieldValues[data.fields[3].label] ?? data.fields[3].value}
                />
              </View>
            </View>

            <Textarea
              disabled={data.fields[4].isLocked}
              helperText={data.fields[4].helperText}
              label={data.fields[4].label}
              onChangeText={(value) => updateFieldValue(data.fields[4].label, value)}
              value={fieldValues[data.fields[4].label] ?? data.fields[4].value}
            />
          </View>
        </View>
        <View className="items-stretch md:items-end">
          <SettingsActionButton {...data.footerAction} />
        </View>
      </View>
    </SettingsSectionCard>
  );
}
