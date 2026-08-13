import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";

import { InputField } from "@/components/common/InputField";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/hooks/auth/useAuth";
import { useToast } from "@/hooks/toast/useToast";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import { getUser, updateUser, type UserRecord } from "@/services/userService";
import { getErrorMessage } from "@/utils/error-message";
import type { SettingsProfileSectionData } from "@/types/settings";

import { SettingsActionButton } from "./SettingsActionButton";
import { SettingsSectionCard } from "./SettingsSectionCard";

function getInitials(user: UserRecord | null) {
  return (
    [user?.first_name, user?.last_name]
      .filter(Boolean)
      .map((name) => name![0].toUpperCase())
      .join("") || "?"
  );
}

const profileFormSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  lastName: z.string().trim().min(1, "Last name is required."),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function SettingsProfileSection({ data }: { data: SettingsProfileSectionData }) {
  const { user } = useAuth();
  const { error: showError, success } = useToast();
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const [userData, setUserData] = useState<UserRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const {
    control,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<ProfileFormValues>({
    defaultValues: { firstName: "", lastName: "" },
    mode: "onBlur",
    resolver: zodResolver(profileFormSchema),
  });

  useEffect(() => {
    let active = true;
    void (async () => {
      if (!user) {
        if (active) {
          setUserData(null);
          reset({ firstName: "", lastName: "" });
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      const { data: nextUser, error } = await getUser(user.id);
      if (!active) return;
      if (error) {
        showError("Unable to load profile", getErrorMessage(error, "Please try again shortly."));
      } else if (nextUser) {
        setUserData(nextUser);
        reset({ firstName: nextUser.first_name ?? "", lastName: nextUser.last_name ?? "" });
      }
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [reset, showError, user]);

  async function onSubmit(values: ProfileFormValues) {
    if (!user) return;
    const { data: updatedUser, error } = await updateUser(user.id, {
      first_name: values.firstName.trim() || null,
      last_name: values.lastName.trim() || null,
    });
    if (error) {
      showError("Unable to update profile", getErrorMessage(error, "Please try again shortly."));
      return;
    }
    if (updatedUser) {
      setUserData(updatedUser);
      reset({ firstName: updatedUser.first_name ?? "", lastName: updatedUser.last_name ?? "" });
    }
    success("Profile updated", "Your personal information has been saved.");
  }

  return (
    <SettingsSectionCard>
      <View accessibilityLabel="Personal information form" className="gap-8">
        <View className="gap-5 border-b border-app-border pb-8 md:flex-row md:items-center md:justify-between">
          <View className="flex-col items-center gap-4 sm:flex-row">
            <View className="h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-app-border bg-app-panel">
              {userData?.profile_image_url ?
                <Image
                  contentFit="cover"
                  source={{ uri: userData.profile_image_url }}
                  style={{ height: "100%", width: "100%" }}
                />
              : <Text className="font-display text-3xl font-semibold text-app-text">
                  {getInitials(userData)}
                </Text>
              }
            </View>
            <View className="gap-2">
              <Text className="font-display text-2xl font-semibold text-app-text">
                {data.identity.title}
              </Text>
              <Text className="font-display text-base text-app-muted">{data.identity.note}</Text>
              <View className="hidden flex-row flex-wrap gap-3 pt-1 sm:flex">
                {data.actions.map((action) => (
                  <SettingsActionButton
                    key={action.label}
                    label={action.label}
                    tone={action.tone}
                  />
                ))}
              </View>
            </View>
            <View className="flex-row flex-wrap gap-3 pt-1 sm:hidden">
              {data.actions.map((action) => (
                <SettingsActionButton key={action.label} label={action.label} tone={action.tone} />
              ))}
            </View>
          </View>
        </View>

        <View className="gap-6">
          <View className="flex-row items-center gap-3">
            <MaterialCommunityIcons color={colors.primaryStrong} name="account-outline" size={24} />
            <Text className="font-display text-2xl font-semibold text-app-text">
              {data.sectionTitle}
            </Text>
          </View>
          {loading ?
            <Text className="font-display text-base text-app-muted">Loading your information…</Text>
          : <View className="gap-5">
              <View className="gap-5 lg:flex-row">
                <View className="lg:flex-1">
                  <Controller
                    control={control}
                    name="firstName"
                    render={({ field: { onBlur, onChange, value } }) => (
                      <InputField
                        error={errors.firstName?.message}
                        label="First Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </View>
                <View className="lg:flex-1">
                  <Controller
                    control={control}
                    name="lastName"
                    render={({ field: { onBlur, onChange, value } }) => (
                      <InputField
                        error={errors.lastName?.message}
                        label="Last Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                  />
                </View>
              </View>
              <InputField
                disabled
                helperText="Primary login email cannot be changed without verification."
                label="Email Address"
                value={userData?.email ?? user?.email ?? ""}
              />
            </View>
          }
        </View>
        <View className="items-stretch md:items-end">
          <SettingsActionButton
            {...data.footerAction}
            disabled={!isDirty || loading || isSubmitting}
            label={isSubmitting ? "Saving…" : data.footerAction.label}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </SettingsSectionCard>
  );
}
