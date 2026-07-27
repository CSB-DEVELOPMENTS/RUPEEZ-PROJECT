import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { Colors, Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { ContextFormData, ContextTone } from "@/types/contexts-switching";

import { ContextPopupButton } from "./ContextPopupButtons";
import { ContextPopupShell } from "./ContextPopupShell";
import { contextToneColor } from "./contextTone";

const COLOR_OPTIONS: ContextTone[] = ["primary", "brand", "teal", "orange", "danger"];

type ContextFormPopupProps = {
  data: ContextFormData;
  errorMessage?: string | null;
  mode: "create" | "edit";
  onBack: () => void;
  onClose: () => void;
  onSubmit: (form: ContextFormData) => void;
  submitting?: boolean;
  visible: boolean;
};

function FormLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text className="font-display text-xs font-semibold uppercase tracking-[1.5px] text-app-muted">
      {children}
    </Text>
  );
}

export function ContextFormPopup({
  data,
  errorMessage,
  mode,
  onBack,
  onClose,
  onSubmit,
  submitting = false,
  visible,
}: ContextFormPopupProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const [form, setForm] = useState(data);
  return (
    <ContextPopupShell visible={visible} onClose={onClose} maxWidthClassName="max-w-2xl">
      <View className="border-b border-app-border px-6 py-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-6">
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={colors.text}
              onPress={onBack}
            />
            <View>
              <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">
                {mode === "edit" ? "Edit Profile" : "New Profile"}
              </Text>
              {mode === "create" ?
                <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                  Step 2 of 2: Customize Profile
                </Text>
              : null}
            </View>
          </View>
          <MaterialCommunityIcons name="close" size={24} color={colors.text} onPress={onClose} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-7 p-6">
          <View className="gap-3">
            <FormLabel>Profile Name</FormLabel>
            <View className="min-h-14 flex-row items-center gap-3 rounded-xl border border-app-border bg-app-bg px-4">
              <TextInput
                className="flex-1 font-display text-lg text-app-text focus:outline-none"
                onChangeText={(value) => setForm((current) => ({ ...current, name: value }))}
                placeholder="Profile name"
                placeholderTextColor={colors.textSoft}
                selectionColor={colors.primary}
                style={{ fontFamily: Fonts.sans }}
                value={form.name}
              />
              {mode === "edit" ?
                <MaterialCommunityIcons name="pencil-outline" size={18} color={colors.textSoft} />
              : null}
            </View>
          </View>

          <View className="gap-3">
            <FormLabel>Currency</FormLabel>
            <View className="min-h-14 flex-row items-center rounded-xl border border-app-border bg-app-bg px-4">
              <Text className="flex-1 font-display text-lg font-semibold text-app-text">
                {form.currencyLabel}
              </Text>
              <MaterialCommunityIcons name="chevron-down" size={24} color={colors.textSoft} />
            </View>
          </View>

          <View className="gap-4">
            <FormLabel>Primary Color</FormLabel>
            <View className="flex-row flex-wrap gap-4">
              {COLOR_OPTIONS.map((tone) => {
                const color = contextToneColor(theme, tone);
                const isSelected = form.selectedTone === tone;

                return (
                  <Pressable
                    key={tone}
                    className={`h-10 w-10 items-center justify-center rounded-full ${
                      isSelected ? "border-2 border-app-primary" : "border border-transparent"
                    }`}
                    onPress={() => setForm((current) => ({ ...current, selectedTone: tone }))}>
                    <View className="h-8 w-8 rounded-full" style={{ backgroundColor: color }} />
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="gap-3 border-t border-app-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        {errorMessage ?
          <Text className="font-display text-sm text-app-danger sm:flex-1">{errorMessage}</Text>
        : null}
        <ContextPopupButton label="Cancel" tone="ghost" onPress={onClose} />
        <View className="sm:min-w-48">
          <ContextPopupButton
            disabled={submitting}
            label={
              submitting ? "Creating..."
              : mode === "edit" ?
                "Save Changes"
              : "Create Profile"
            }
            icon={mode === "edit" ? "check-circle-outline" : undefined}
            onPress={() => onSubmit(form)}
          />
        </View>
      </View>
    </ContextPopupShell>
  );
}
