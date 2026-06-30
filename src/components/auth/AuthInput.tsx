import { Pressable, Text, TextInput, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/components/theme/AppThemeProvider';

type AuthInputProps = {
  autoCapitalize?: 'none' | 'sentences' | 'words';
  autoComplete?: 'email' | 'name' | 'password' | 'off';
  keyboardType?: 'default' | 'email-address';
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  toggleLabel?: string;
  onTogglePress?: () => void;
  value: string;
};

export function AuthInput({
  autoCapitalize = 'none',
  autoComplete = 'off',
  keyboardType = 'default',
  label,
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
        className="min-h-16 rounded-2xl border border-app-border bg-app-panel px-5 font-display text-xl text-app-text"
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors[theme].textSoft}
        secureTextEntry={secureTextEntry}
        value={value}
      />
    </View>
  );
}
