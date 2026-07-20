import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { Colors, Fonts } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { ContextFormData, ContextTone } from "@/types/contexts-switching";

import { contextToneColor } from "../contexts-switching/contextTone";
import { ContextPopupButton } from "./ContextPopupButtons";
import { ContextPopupShell } from "./ContextPopupShell";

const COLOR_OPTIONS: ContextTone[] = ["primary", "brand", "teal", "orange", "danger"];

type ContextFormPopupProps = {
  data: ContextFormData;
  mode: "create" | "edit";
  onBack: () => void;
  onClose: () => void;
  onSubmit: () => void;
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
  mode,
  onBack,
  onClose,
  onSubmit,
  visible,
}: ContextFormPopupProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const [form, setForm] = useState(data);
  const [categoryDraft, setCategoryDraft] = useState("");

  function addCategory() {
    const nextCategory = categoryDraft.trim();

    if (!nextCategory) {
      return;
    }

    setForm((current) => ({
      ...current,
      categories: [...current.categories, nextCategory],
    }));
    setCategoryDraft("");
  }

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
                {mode === "edit" ? "Edit Context" : "New Context"}
              </Text>
              {mode === "create" ? (
                <Text className="font-display text-xs font-semibold uppercase tracking-[1.4px] text-app-muted">
                  Step 2 of 2: Customize Context
                </Text>
              ) : null}
            </View>
          </View>
          <MaterialCommunityIcons name="close" size={24} color={colors.text} onPress={onClose} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-7 p-6">
          <View className="gap-3">
            <FormLabel>Context Name</FormLabel>
            <View className="min-h-14 flex-row items-center gap-3 rounded-xl border border-app-border bg-app-bg px-4">
              <TextInput
                className="flex-1 font-display text-lg text-app-text focus:outline-none"
                onChangeText={(value) => setForm((current) => ({ ...current, name: value }))}
                placeholder="Context name"
                placeholderTextColor={colors.textSoft}
                selectionColor={colors.primary}
                style={{ fontFamily: Fonts.sans }}
                value={form.name}
              />
              {mode === "edit" ? (
                <MaterialCommunityIcons name="pencil-outline" size={18} color={colors.textSoft} />
              ) : null}
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
                    <View
                      className="h-8 w-8 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="gap-4">
            <View className="flex-row items-center justify-between gap-4">
              <FormLabel>
                {mode === "edit" ? "Default Categories" : "Default Categories (Select to remove)"}
              </FormLabel>
              {mode === "edit" ? (
                <Pressable className="flex-row items-center gap-1" onPress={addCategory}>
                  <MaterialCommunityIcons name="plus-circle-outline" size={16} color={colors.primary} />
                  <Text className="font-display text-xs font-semibold uppercase tracking-[1.2px] text-app-primary">
                    Add Category
                  </Text>
                </Pressable>
              ) : null}
            </View>

            <View className="flex-row flex-wrap gap-2">
              {form.categories.map((category) => (
                <Pressable
                  key={category}
                  className="flex-row items-center gap-2 rounded-full border border-app-border bg-app-panel/60 px-3 py-2"
                  onPress={() =>
                    setForm((current) => ({
                      ...current,
                      categories: current.categories.filter((item) => item !== category),
                    }))
                  }>
                  <Text className="font-display text-base text-app-text">{category}</Text>
                  <MaterialCommunityIcons name="close" size={16} color={colors.text} />
                </Pressable>
              ))}
            </View>

            {mode === "edit" ? (
              <View className="flex-row gap-2">
                <TextInput
                  className="min-h-12 flex-1 rounded-xl border border-app-border bg-app-bg px-4 font-display text-base text-app-text focus:outline-none"
                  onChangeText={setCategoryDraft}
                  onSubmitEditing={addCategory}
                  placeholder="New category name..."
                  placeholderTextColor={colors.textSoft}
                  selectionColor={colors.primary}
                  style={{ fontFamily: Fonts.sans }}
                  value={categoryDraft}
                />
                <Pressable
                  className="min-h-12 items-center justify-center rounded-xl bg-app-panel-strong px-4"
                  onPress={addCategory}>
                  <Text className="font-display text-xs font-semibold uppercase text-app-text">Add</Text>
                </Pressable>
              </View>
            ) : (
              <Pressable
                className="self-start rounded-full border border-app-primary/45 px-4 py-3"
                onPress={addCategory}>
                <Text className="font-display text-base text-app-primary">+ Add Category</Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>

      <View className="gap-3 border-t border-app-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <ContextPopupButton label="Cancel" tone="ghost" onPress={onClose} />
        <View className="sm:min-w-48">
          <ContextPopupButton
            label={mode === "edit" ? "Save Changes" : "Create Context"}
            icon={mode === "edit" ? "check-circle-outline" : undefined}
            onPress={onSubmit}
          />
        </View>
      </View>
    </ContextPopupShell>
  );
}
