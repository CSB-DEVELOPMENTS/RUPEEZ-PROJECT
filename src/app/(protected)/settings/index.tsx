import { View } from "react-native";

import {
  SettingsDangerZone,
  SettingsFeatureCard,
  SettingsPageShell,
  SettingsProfileSection,
} from "@/components/settings";
import { SETTINGS_OVERVIEW_PAGE } from "@/constants/settings";

export default function SettingsOverviewScreen() {
  return (
    <SettingsPageShell intro={SETTINGS_OVERVIEW_PAGE.intro}>
      <SettingsProfileSection data={SETTINGS_OVERVIEW_PAGE.profile} />

      <View className="gap-4 xl:flex-row">
        {SETTINGS_OVERVIEW_PAGE.shortcuts.map((item) => (
          <View key={item.title} className="xl:flex-1">
            <SettingsFeatureCard data={item} />
          </View>
        ))}
      </View>

      <SettingsDangerZone data={SETTINGS_OVERVIEW_PAGE.dangerZone} />
    </SettingsPageShell>
  );
}
