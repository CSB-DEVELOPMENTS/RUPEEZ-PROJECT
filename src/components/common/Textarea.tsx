import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, TextInput, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type TextareaProps = {
  disabled?: boolean;
  helperText?: string;
  label: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  value: string;
};

export function Textarea({
  disabled = false,
  helperText,
  label,
  onChangeText,
  placeholder,
  value,
}: TextareaProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className="gap-2">
      <Text className="font-display text-xs font-semibold uppercase tracking-[1.8px] text-app-muted">
        {label}
      </Text>
      <View className="min-h-[5.25rem] rounded-[20px] border border-app-border bg-app-panel/70 px-4 py-4">
        <View className="flex-row items-start gap-3">
          <TextInput
            className={`flex-1 font-display text-lg leading-7 focus:outline-none ${disabled ? "text-app-muted" : "text-app-text"}`}
            editable={!disabled}
            multiline
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.textSoft}
            selectionColor={colors.primary}
            style={{ minHeight: 84, textAlignVertical: "top" }}
            value={value}
          />
          {disabled ?
            <MaterialCommunityIcons color={colors.textSoft} name={"lock" as never} size={18} />
          : null}
        </View>
      </View>
      {helperText ?
        <Text className="font-display text-sm leading-5 text-app-muted">{helperText}</Text>
      : null}
    </View>
  );
}
