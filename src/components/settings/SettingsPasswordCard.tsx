import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Alert, View } from "react-native";
import { z } from "zod";

import { InputField } from "@/components/common/InputField";
import { useAuth } from "@/hooks/auth/useAuth";
import type { SettingsPasswordSectionData } from "@/types/settings";

import { SettingsActionButton } from "./SettingsActionButton";
import { SettingsSectionCard } from "./SettingsSectionCard";

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters.")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
      .regex(/[0-9]/, "Must contain at least one number.")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character."),
    confirmPassword: z.string().min(1, "Please confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from your current password.",
    path: ["newPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export function SettingsPasswordCard({ data }: { data: SettingsPasswordSectionData }) {
  const { updatePassword } = useAuth();
  const {
    control,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<PasswordFormValues>({
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
    mode: "onBlur",
    resolver: zodResolver(passwordFormSchema),
  });

  async function onSubmit(values: PasswordFormValues) {
    const { error: updateError } = await updatePassword(values.currentPassword, values.newPassword);

    if (updateError) {
      Alert.alert("Unable to update password", updateError.message);
      return;
    }

    reset();
    Alert.alert("Password updated", "Your password has been changed successfully.");
  }

  return (
    <SettingsSectionCard icon={data.icon} title={data.title}>
      <View className="gap-5">
        <View className="max-w-2xl">
          <Controller
            control={control}
            name="currentPassword"
            render={({ field: { onBlur, onChange, value } }) => (
              <InputField
                error={errors.currentPassword?.message}
                label={data.fields[0]?.label ?? "Current Password"}
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry
                value={value}
              />
            )}
          />
        </View>

        <View className="gap-5 lg:flex-row">
          <View className="lg:flex-1">
            <Controller
              control={control}
              name="newPassword"
              render={({ field: { onBlur, onChange, value } }) => (
                <InputField
                  error={errors.newPassword?.message}
                  label={data.fields[1]?.label ?? "New Password"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  secureTextEntry
                  value={value}
                />
              )}
            />
          </View>
          <View className="lg:flex-1">
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onBlur, onChange, value } }) => (
                <InputField
                  error={errors.confirmPassword?.message}
                  label={data.fields[2]?.label ?? "Confirm New Password"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  secureTextEntry
                  value={value}
                />
              )}
            />
          </View>
        </View>

        <View className="self-end pt-2">
          <SettingsActionButton
            {...data.action}
            disabled={!isDirty || isSubmitting}
            label={isSubmitting ? "Updating…" : data.action.label}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </SettingsSectionCard>
  );
}
