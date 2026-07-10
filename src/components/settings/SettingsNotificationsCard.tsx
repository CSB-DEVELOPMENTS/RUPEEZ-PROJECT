import { Text, View } from "react-native";

import type { SettingsNotificationSectionData } from "@/types/settings";

import { SettingsSectionCard } from "./SettingsSectionCard";
import { SettingsToggle } from "./SettingsToggle";

export function SettingsNotificationsCard({ data }: { data: SettingsNotificationSectionData }) {
  return (
    <SettingsSectionCard icon={data.icon} title={data.title}>
      <View className="gap-8">
        <View className="gap-4 xl:flex-row">
          {data.channels.map((item) => (
            <SettingsToggle
              key={item.label}
              enabled={item.enabled}
              label={item.label}
              variant="card"
            />
          ))}
        </View>

        <View className="border-t border-app-border pt-8">
          <Text className="mb-5 font-display text-xs font-semibold uppercase tracking-[1.8px] text-app-muted">
            Alert Categories
          </Text>
          <View className="gap-5">
            {data.alertCategories.map((item) => (
              <SettingsToggle
                key={item.label}
                description={item.description}
                enabled={item.enabled}
                label={item.label}
              />
            ))}
          </View>
        </View>
      </View>
    </SettingsSectionCard>
  );
}
