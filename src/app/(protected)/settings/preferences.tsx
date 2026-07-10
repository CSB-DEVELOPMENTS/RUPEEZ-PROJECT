import {
  SettingsNotificationsCard,
  SettingsPageShell,
  SettingsRegionalCard,
} from "@/components/settings";
import { SETTINGS_PREFERENCES_PAGE } from "@/constants/settings";

export default function SettingsPreferencesScreen() {
  return (
    <SettingsPageShell
      footerAction={SETTINGS_PREFERENCES_PAGE.footerAction}
      intro={SETTINGS_PREFERENCES_PAGE.intro}>
      <SettingsRegionalCard data={SETTINGS_PREFERENCES_PAGE.regional} />
      <SettingsNotificationsCard data={SETTINGS_PREFERENCES_PAGE.notifications} />
    </SettingsPageShell>
  );
}
