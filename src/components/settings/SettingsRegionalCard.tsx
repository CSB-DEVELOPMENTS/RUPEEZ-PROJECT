import { View } from "react-native";

import type { SettingsRegionalSectionData } from "@/types/settings";

import { SettingsInfoField } from "./SettingsInfoField";
import { SettingsSectionCard } from "./SettingsSectionCard";

export function SettingsRegionalCard({ data }: { data: SettingsRegionalSectionData }) {
  return (
    <SettingsSectionCard icon={data.icon} title={data.title}>
      <View className="gap-5 lg:flex-row">
        {data.options.map((item) => (
          <View key={item.label} className="lg:flex-1">
            <SettingsInfoField data={item} />
          </View>
        ))}
      </View>
    </SettingsSectionCard>
  );
}
