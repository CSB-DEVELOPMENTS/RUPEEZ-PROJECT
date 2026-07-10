import type { Href } from "expo-router";

export type SettingsFooterAction = {
  href?: Href;
  icon?: string;
  label: string;
  tone?: "danger" | "outline" | "primary" | "secondary";
};

export type SettingsPageIntro = {
  description: string;
  title: string;
};

export type SettingsOptionField = { label: string; value: string };

export type SettingsToggleItem = { description?: string; enabled: boolean; label: string };

export type SettingsProfileAction = { label: string; tone?: "outline" | "primary" };

export type SettingsProfileIdentity = {
  imageUri?: string;
  initials: string;
  note: string;
  title: string;
};

export type SettingsProfileField = {
  helperText?: string;
  isLocked?: boolean;
  label: string;
  value: string;
};

export type SettingsProfileSectionData = {
  actions: SettingsProfileAction[];
  fields: SettingsProfileField[];
  identity: SettingsProfileIdentity;
  sectionTitle: string;
};

export type SettingsFeatureCardData = {
  badge?: string;
  cta: SettingsFooterAction;
  description: string;
  icon: string;
  meta?: string;
  title: string;
  tone?: "brand" | "primary";
};

export type SettingsDangerZoneData = {
  action: SettingsFooterAction;
  description: string;
  title: string;
};

export type SettingsOverviewPageData = {
  dangerZone: SettingsDangerZoneData;
  footerAction: SettingsFooterAction;
  intro: SettingsPageIntro;
  profile: SettingsProfileSectionData;
  shortcuts: SettingsFeatureCardData[];
};

export type SettingsRegionalSectionData = {
  icon: string;
  options: SettingsOptionField[];
  title: string;
};

export type SettingsNotificationSectionData = {
  alertCategories: SettingsToggleItem[];
  channels: SettingsToggleItem[];
  icon: string;
  title: string;
};

export type SettingsPreferencesPageData = {
  footerAction: SettingsFooterAction;
  intro: SettingsPageIntro;
  notifications: SettingsNotificationSectionData;
  regional: SettingsRegionalSectionData;
};

export type SettingsPasswordField = { label: string; value: string };

export type SettingsPasswordSectionData = {
  action: SettingsFooterAction;
  fields: SettingsPasswordField[];
  icon: string;
  title: string;
};

export type SettingsSecurityPanelData = {
  action: SettingsFooterAction;
  description: string;
  icon: string;
  status: string;
  title: string;
};

export type SettingsSecurityPageData = {
  intro: SettingsPageIntro;
  password: SettingsPasswordSectionData;
  twoFactor: SettingsSecurityPanelData;
};
