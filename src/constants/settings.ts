import type {
  SettingsOverviewPageData,
  SettingsPreferencesPageData,
  SettingsSecurityPageData,
} from "@/types/settings";

export const SETTINGS_OVERVIEW_PAGE: SettingsOverviewPageData = {
  intro: {
    breadcrumbs: [{ label: "Settings", href: "/settings" }],
    description:
      "Manage your account credentials, personal information, and regional preferences from one place.",
    title: "Profile & Security",
  },
  profile: {
    identity: {
      initials: "MS",
      note: "JPG, GIF or PNG. Max size of 800K.",
      title: "Profile Picture",
    },
    actions: [
      { label: "Change Photo", tone: "primary" },
      { label: "Remove", tone: "outline" },
    ],
    sectionTitle: "Personal Information",
    fields: [
      { label: "Full Name", value: "Marcus Sterling" },
      {
        helperText: "Primary login email cannot be changed without verification.",
        isLocked: true,
        label: "Email Address",
        value: "m.sterling@mission-control.io",
      },
      { label: "Phone Number", value: "+1 (555) 892-0431" },
      { label: "Primary Investment Entity", value: "Sterling Global Ventures LLC" },
      {
        label: "Mailing Address",
        value: "42 Wall Street, Suite 1200\nNew York, NY 10005\nUnited States",
      },
    ],
  },
  shortcuts: [
    {
      badge: "Enabled",
      cta: { href: "/settings/security", label: "Manage Security Settings", tone: "secondary" },
      description:
        "Adding an extra layer of security to your investment portal using biometric or SMS codes.",
      icon: "shield-check-outline",
      title: "Two-Factor Authentication",
      tone: "primary",
    },
    {
      cta: { href: "/settings/preferences", label: "Change Preferences", tone: "secondary" },
      description:
        "Set your default currency for portfolio valuations and adjust your local time zone.",
      icon: "earth",
      meta: "USD ($) • UTC-5 (New York)",
      title: "Regional & Currency",
      tone: "brand",
    },
  ],
  footerAction: { icon: "content-save-outline", label: "Update Profile", tone: "primary" },
  dangerZone: {
    action: { label: "Deactivate Mission Control", tone: "danger" },
    description:
      "Permanently deactivate your Mission Control account. This action will freeze all active automated flows and revoke access to historical wealth reporting. This cannot be undone.",
    title: "Danger Zone",
  },
};

export const SETTINGS_PREFERENCES_PAGE: SettingsPreferencesPageData = {
  intro: {
    breadcrumbs: [
      { href: "/settings", label: "Settings" },
      { label: "Preferences", href: "/settings/preferences" },
    ],
    description:
      "Customize your regional settings, notification triggers, and display preferences for your workspace.",
    title: "Preferences",
  },
  regional: {
    icon: "earth",
    title: "Currency & Regional",
    options: [
      { label: "Default Currency", value: "USD ($) - US Dollar" },
      { label: "Timezone", value: "UTC-5 (New York)" },
    ],
  },
  notifications: {
    icon: "bell-outline",
    title: "Notification Preferences",
    channels: [
      { enabled: true, label: "Email Notifications" },
      { enabled: true, label: "Push Notifications" },
      { enabled: false, label: "SMS Alerts" },
    ],
    alertCategories: [
      {
        description: "Get notified of all account movements",
        enabled: true,
        label: "Transaction Alerts",
      },
      {
        description: "Summary of your portfolio performance",
        enabled: true,
        label: "Weekly Reports",
      },
      {
        description: "Critical updates regarding account access",
        enabled: true,
        label: "Security Alerts",
      },
    ],
  },
  footerAction: { icon: "content-save-outline", label: "Update Profile", tone: "primary" },
};

export const SETTINGS_SECURITY_PAGE: SettingsSecurityPageData = {
  intro: {
    breadcrumbs: [
      { href: "/settings", label: "Settings" },
      { label: "Security", href: "/settings/security" },
    ],
    description: "Manage your authentication methods, password, and account security protocols.",
    title: "Security Settings",
  },
  password: {
    action: { label: "Change Password", tone: "outline" },
    fields: [
      { label: "Current Password", value: "••••••••" },
      { label: "New Password", value: "••••••••" },
      { label: "Confirm New Password", value: "••••••••" },
    ],
    icon: "lock-outline",
    title: "Password",
  },
  twoFactor: {
    action: { label: "Configure 2FA", tone: "primary" },
    description: "Add an extra layer of security to your account using biometric or SMS codes.",
    icon: "shield-check-outline",
    status: "Currently Enabled",
    title: "Two-Factor Authentication",
  },
};
