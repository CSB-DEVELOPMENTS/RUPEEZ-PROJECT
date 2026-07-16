import { useState } from "react";
import { View } from "react-native";

import { InputField } from "@/components/common/InputField";
import type { SettingsPasswordSectionData } from "@/types/settings";

import { SettingsActionButton } from "./SettingsActionButton";
import { SettingsSectionCard } from "./SettingsSectionCard";

export function SettingsPasswordCard({ data }: { data: SettingsPasswordSectionData }) {
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(data.fields.map((field) => [field.label, field.value])),
  );

  function updateFieldValue(label: string, value: string) {
    setFieldValues((current) => ({ ...current, [label]: value }));
  }

  return (
    <SettingsSectionCard icon={data.icon} title={data.title}>
      <View className="gap-5">
        <View className="max-w-2xl">
          <InputField
            label={data.fields[0].label}
            onChangeText={(value) => updateFieldValue(data.fields[0].label, value)}
            secureTextEntry
            value={fieldValues[data.fields[0].label] ?? data.fields[0].value}
          />
        </View>

        <View className="gap-5 lg:flex-row">
          <View className="lg:flex-1">
            <InputField
              label={data.fields[1].label}
              onChangeText={(value) => updateFieldValue(data.fields[1].label, value)}
              secureTextEntry
              value={fieldValues[data.fields[1].label] ?? data.fields[1].value}
            />
          </View>
          <View className="lg:flex-1">
            <InputField
              label={data.fields[2].label}
              onChangeText={(value) => updateFieldValue(data.fields[2].label, value)}
              secureTextEntry
              value={fieldValues[data.fields[2].label] ?? data.fields[2].value}
            />
          </View>
        </View>

        <View className="self-start pt-2">
          <SettingsActionButton {...data.action} />
        </View>
      </View>
    </SettingsSectionCard>
  );
}
