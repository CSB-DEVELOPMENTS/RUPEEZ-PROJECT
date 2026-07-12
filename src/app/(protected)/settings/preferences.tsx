import {
  SettingsNotificationsCard,
  SettingsPageShell,
  SettingsRegionalCard,
} from "@/components/settings";
import { SETTINGS_PREFERENCES_PAGE } from "@/constants/settings";
import { View } from "react-native";

export default function SettingsPreferencesScreen() {
  return (
    <SettingsPageShell intro={SETTINGS_PREFERENCES_PAGE.intro}>
      <View className="z-20">
        <SettingsRegionalCard data={SETTINGS_PREFERENCES_PAGE.regional} />
      </View>

      <SettingsNotificationsCard data={SETTINGS_PREFERENCES_PAGE.notifications} />
    </SettingsPageShell>
  );
}
