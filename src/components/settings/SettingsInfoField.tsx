import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import { SettingsOptionField, SettingsProfileField } from "@/types/settings";

type SettingsInfoFieldProps = {
  data: SettingsOptionField | SettingsProfileField;
  multiline?: boolean;
  trailingIcon?: string;
};

export function SettingsInfoField({ data, multiline, trailingIcon }: SettingsInfoFieldProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const locked = "isLocked" in data ? data.isLocked : false;
  const iconName =
    trailingIcon === undefined ?
      locked ? "lock"
      : "chevron-down"
    : trailingIcon;

  return (
    <View className="gap-2">
      <Text className="font-display text-xs font-semibold uppercase tracking-[1.8px] text-app-muted">
        {data.label}
      </Text>
      <View
        className={`rounded-[20px] border border-app-border bg-app-panel/70 px-4 py-4 ${
          multiline ? "min-h-[5.25rem] justify-start" : "min-h-[3.5rem] justify-center"
        }`}>
        <View className="flex-row items-start gap-3">
          <Text className="flex-1 font-display text-lg leading-7 text-app-text">{data.value}</Text>
          {iconName ?
            <MaterialCommunityIcons color={colors.textSoft} name={iconName as never} size={18} />
          : null}
        </View>
      </View>
      {"helperText" in data && data.helperText ?
        <Text className="font-display text-sm leading-5 text-app-muted">{data.helperText}</Text>
      : null}
    </View>
  );
}
