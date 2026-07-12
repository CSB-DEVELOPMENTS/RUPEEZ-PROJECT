import { useState } from "react";
import { View } from "react-native";

import type { SettingsRegionalSectionData } from "@/types/settings";

import { DropDownMenu } from "../common/DropDownMenu";
import { SettingsSectionCard } from "./SettingsSectionCard";

export function SettingsRegionalCard({ data }: { data: SettingsRegionalSectionData }) {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(data.options.map((item) => [item.label, item.value])),
  );

  return (
    <SettingsSectionCard icon={data.icon} title={data.title}>
      <View className="gap-5 overflow-visible lg:flex-row">
        {data.options.map((item) => (
          <View
            key={item.label}
            className={`overflow-visible lg:flex-1 ${activeLabel === item.label ? "z-20" : "z-0"}`}>
            <DropDownMenu
              isOpen={activeLabel === item.label}
              label={item.label}
              onSelect={(nextValue) => {
                setSelectedValues((current) => ({ ...current, [item.label]: nextValue }));
                setActiveLabel(null);
              }}
              onToggle={() =>
                setActiveLabel((current) => (current === item.label ? null : item.label))
              }
              options={item.options}
              value={selectedValues[item.label] ?? item.value}
            />
          </View>
        ))}
      </View>
    </SettingsSectionCard>
  );
}
