import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { data as currencyData } from "currency-codes";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, View } from "react-native";
import { z } from "zod";

import { InputField } from "@/components/common/InputField";
import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { ContextFormData } from "@/types/contexts-switching";

import { COLOR_OPTIONS } from "@/constants/contexts-switching";
import { DropDownMenu } from "../common/DropDownMenu";
import { ContextPopupButton } from "./ContextPopupButtons";
import { ContextPopupShell } from "./ContextPopupShell";
import { contextToneColor } from "./contextTone";

const CURRENCY_OPTIONS = currencyData
  .map(({ code, currency }) => ({ code, label: `${code} - ${currency}` }))
  .sort((left, right) => left.label.localeCompare(right.label));

const contextFormSchema = z.object({
  currencyCode: z.string().min(1, "Currency is required."),
  currencyLabel: z.string().min(1, "Currency is required."),
  name: z.string().trim().min(1, "Profile name is required."),
  selectedTone: z.enum(COLOR_OPTIONS, {
    errorMap: () => ({ message: "Primary color is required." }),
  }),
});

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
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<ContextFormData>({
    defaultValues: data,
    mode: "onBlur",
    resolver: zodResolver(contextFormSchema),
  });

  useEffect(() => {
    reset(data);
  }, [data, reset]);

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

      <ScrollView
        className={isCurrencyOpen ? "z-30 overflow-visible" : "z-0"}
        showsVerticalScrollIndicator={false}>
        <View className="gap-7 p-6 z-30">
          <Controller
            control={control}
            name="name"
            render={({ field: { onBlur, onChange, value } }) => (
              <InputField
                error={errors.name?.message}
                label="Profile Name"
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Profile name"
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="currencyCode"
            render={({ field: { onChange, value } }) => (
              <Controller
                control={control}
                name="currencyLabel"
                render={({ field: { onChange: onLabelChange } }) => (
                  <View className="gap-3">
                    <DropDownMenu
                      isOpen={isCurrencyOpen}
                      label="Currency"
                      onSelect={(nextValue) => {
                        const selectedCurrency = CURRENCY_OPTIONS.find(
                          (option) => option.label === nextValue,
                        );

                        if (!selectedCurrency) return;

                        onChange(selectedCurrency.code);
                        onLabelChange(selectedCurrency.label);
                        setIsCurrencyOpen(false);
                      }}
                      onToggle={() => setIsCurrencyOpen((current) => !current)}
                      options={CURRENCY_OPTIONS.map((option) => option.label)}
                      value={
                        CURRENCY_OPTIONS.find((option) => option.code === value)?.label
                        ?? data.currencyLabel
                      }
                    />
                    {errors.currencyCode || errors.currencyLabel ?
                      <Text className="font-display text-sm text-app-danger">
                        {errors.currencyCode?.message ?? errors.currencyLabel?.message}
                      </Text>
                    : null}
                  </View>
                )}
              />
            )}
          />

          <View className="gap-4">
            <FormLabel>Primary Color</FormLabel>
            <View className="flex-row flex-wrap gap-4">
              <Controller
                control={control}
                name="selectedTone"
                render={({ field: { onChange, value } }) => (
                  <>
                    {COLOR_OPTIONS.map((tone) => {
                      const color = contextToneColor(theme, tone);
                      const isSelected = value === tone;

                      return (
                        <Pressable
                          key={tone}
                          className={`h-10 w-10 items-center justify-center rounded-full ${
                            isSelected ? "border-2 border-app-primary" : "border border-transparent"
                          }`}
                          onPress={() => onChange(tone)}>
                          <View
                            className="h-8 w-8 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        </Pressable>
                      );
                    })}
                  </>
                )}
              />
            </View>
            {errors.selectedTone ?
              <Text className="font-display text-sm text-app-danger">
                {errors.selectedTone.message}
              </Text>
            : null}
          </View>
        </View>
      </ScrollView>

      <View className="gap-3 border-t border-app-border px-6 py-5 sm:flex-row sm:items-center sm:justify-end">
        <View className="sm:min-w-48">
          <ContextPopupButton
            disabled={submitting || isDirty === false}
            label={
              submitting ?
                mode === "edit" ?
                  "Saving..."
                : "Creating..."
              : mode === "edit" ?
                "Save Changes"
              : "Create Profile"
            }
            icon={mode === "edit" ? "check-circle-outline" : undefined}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </ContextPopupShell>
  );
}
