import { Pressable, Text, TextInput, View } from "react-native";

import { Colors, Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type AuthInputProps = {
  autoCapitalize?: "none" | "sentences" | "words";
  autoComplete?: "email" | "name" | "password" | "off";
  error?: string;
  keyboardType?: "default" | "email-address";
  label: string;
  onBlur?: () => void;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  toggleLabel?: string;
  onTogglePress?: () => void;
  value: string;
};

export function AuthInput({
  autoCapitalize = "none",
  autoComplete = "off",
  error,
  keyboardType = "default",
  label,
  onBlur,
  onChangeText,
  placeholder,
  secureTextEntry,
  toggleLabel,
  onTogglePress,
  value,
}: AuthInputProps) {
  const { theme } = useAppTheme();

  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between">
        <Text className="font-display text-base font-semibold uppercase tracking-[1px] text-app-muted">
          {label}
        </Text>
        {toggleLabel ? (
          <Pressable onPress={onTogglePress}>
            <Text className="font-display text-sm font-semibold uppercase tracking-[1px] text-app-primary-strong">
              {toggleLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>

      <TextInput
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        className={`min-h-16 rounded-2xl border bg-app-panel px-5 text-xl text-app-text ${
          error ? "border-app-danger" : "border-app-border"
        }`}
        keyboardType={keyboardType}
        onBlur={onBlur}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors[theme].textSoft}
        secureTextEntry={secureTextEntry}
        style={{ fontFamily: Fonts.sans }}
        value={value}
      />
      {error ? (
        <Text className="font-display text-sm leading-5 text-app-danger">{error}</Text>
      ) : null}
    </View>
  );
}
