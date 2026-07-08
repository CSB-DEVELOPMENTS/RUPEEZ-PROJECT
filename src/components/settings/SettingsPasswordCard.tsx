import { View } from "react-native";

import type { SettingsPasswordSectionData } from "@/types/settings";

import { SettingsActionButton } from "./SettingsActionButton";
import { SettingsInfoField } from "./SettingsInfoField";
import { SettingsSectionCard } from "./SettingsSectionCard";

export function SettingsPasswordCard({ data }: { data: SettingsPasswordSectionData }) {
  return (
    <SettingsSectionCard icon={data.icon} title={data.title}>
      <View className="gap-5">
        <View className="max-w-2xl">
          <SettingsInfoField data={data.fields[0]} trailingIcon="" />
        </View>

        <View className="gap-5 lg:flex-row">
          <View className="lg:flex-1">
            <SettingsInfoField data={data.fields[1]} trailingIcon="" />
          </View>
          <View className="lg:flex-1">
            <SettingsInfoField data={data.fields[2]} trailingIcon="" />
          </View>
        </View>

        <View className="self-start pt-2">
          <SettingsActionButton {...data.action} />
        </View>
      </View>
    </SettingsSectionCard>
  );
}
