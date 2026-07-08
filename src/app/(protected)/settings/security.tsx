import {
  SettingsPageShell,
  SettingsPasswordCard,
  SettingsTwoFactorCard,
} from "@/components/settings";
import { SETTINGS_SECURITY_PAGE } from "@/constants/settings";

export default function SettingsSecurityScreen() {
  return (
    <SettingsPageShell intro={SETTINGS_SECURITY_PAGE.intro}>
      <SettingsPasswordCard data={SETTINGS_SECURITY_PAGE.password} />
      <SettingsTwoFactorCard data={SETTINGS_SECURITY_PAGE.twoFactor} />
    </SettingsPageShell>
  );
}
