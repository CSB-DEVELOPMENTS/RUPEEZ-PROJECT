import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { TextInputProps } from "react-native";
import { Text, TextInput, View } from "react-native";

import { Colors, Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type InputFieldProps = {
  disabled?: boolean;
  helperText?: string;
  label: string;
  onBlur?: TextInputProps["onBlur"];
  onChangeText?: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  value: string;
  error?: string;
};

export function InputField({
  disabled = false,
  helperText,
  label,
  onBlur,
  onChangeText,
  placeholder,
  secureTextEntry,
  value,
  error,
}: InputFieldProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="gap-2">
      <Text className="font-display text-xs font-semibold uppercase tracking-[1.8px] text-app-muted">
        {label}
      </Text>
      <View className="min-h-[3.5rem] justify-center rounded-[20px] border border-app-border bg-app-panel/70 px-4 py-4">
        <View className="flex-row items-center gap-3">
          <TextInput
            className={`flex-1 font-display text-lg leading-7 focus:outline-none ${disabled ? "text-app-muted" : "text-app-text"}`}
            editable={!disabled}
            onChangeText={onChangeText}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor={colors.textSoft}
            selectionColor={colors.primary}
            secureTextEntry={secureTextEntry}
            value={value}
            style={{ fontFamily: Fonts.sans }}
          />
          {disabled ?
            <MaterialCommunityIcons color={colors.textSoft} name={"lock" as never} size={18} />
          : null}
        </View>
      </View>
      {helperText ?
        <Text className="font-display text-sm leading-5 text-app-muted">{helperText}</Text>
      : null}
      {error ?
        <Text className="font-display text-sm leading-5 text-app-danger">{error}</Text>
      : null}
    </View>
  );
}
