import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/hooks/auth/useAuth";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type HeaderProps = { onOpenMenu: () => void };

type ContextOption = {
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
};

const contextOptions: ContextOption[] = [
  { label: "All Contexts", icon: "asterisk" },
  { label: "Personal", icon: "account-circle-outline" },
  { label: "Business", icon: "briefcase-outline" },
  { label: "Student", icon: "school-outline" },
];

function initialsFromName(name?: string | null, email?: string | null) {
  const source = name?.trim() || email?.split("@")[0] || "User";
  const parts = source.split(/\s+/).filter(Boolean);

  if (parts.length > 1) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }

  return source.slice(0, 2).toUpperCase();
}

type ContextDropdownProps = { compact?: boolean };

function ContextDropdown({ compact = false }: ContextDropdownProps) {
  const router = useRouter();
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const [open, setOpen] = useState(false);
  const [selectedContext, setSelectedContext] = useState("Personal");

  const selected =
    contextOptions.find((item) => item.label === selectedContext) ?? contextOptions[1];

  return (
    <View className="relative z-20">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Select context"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((current) => !current)}
        className={
          compact ?
            "h-8 flex-row items-center gap-1.5 rounded-full bg-app-primary-muted px-3 active:opacity-80"
          : "h-11 flex-row items-center gap-2 rounded-lg border border-app-primary px-4 active:bg-app-primary-muted"
        }>
        {!compact ?
          <MaterialCommunityIcons name={selected.icon} size={18} color={colors.primaryStrong} />
        : null}
        <Text className="font-display text-sm font-semibold text-app-primary-strong">
          {compact ?
            <MaterialCommunityIcons name={selected.icon} color={colors.primaryStrong} />
          : selected.label}
        </Text>
        <MaterialCommunityIcons
          name={open ? "chevron-up" : "chevron-down"}
          size={compact ? 14 : 18}
          color={colors.primaryStrong}
        />
      </Pressable>

      {open ?
        <View
          className={
            compact ?
              "absolute left-0 top-10 w-56 rounded-lg border border-app-border bg-app-surface p-2 shadow-showcase-soft"
            : "absolute left-0 top-14 w-64 rounded-lg border border-app-border bg-app-surface p-2 shadow-showcase-soft"
          }>
          {contextOptions.map((item) => {
            const active = item.label === selectedContext;

            return (
              <Pressable
                key={item.label}
                accessibilityRole="menuitem"
                onPress={() => {
                  setSelectedContext(item.label);
                  setOpen(false);

                  if (item.label === "All Contexts") {
                    router.push("/all-contexts");
                  }
                }}
                className="min-h-10 flex-row items-center gap-3 rounded-md px-3 active:bg-app-panel">
                <MaterialCommunityIcons
                  name={item.icon}
                  size={17}
                  color={active ? colors.primaryStrong : colors.textMuted}
                />
                <Text
                  className={
                    active ?
                      "flex-1 font-display text-sm font-semibold text-app-primary-strong"
                    : "flex-1 font-display text-sm text-app-text"
                  }>
                  {item.label}
                </Text>
                {active ?
                  <MaterialCommunityIcons name="check" size={16} color={colors.primaryStrong} />
                : null}
              </Pressable>
            );
          })}

          <View className="my-1 h-px bg-app-border" />

          <Pressable
            accessibilityRole="menuitem"
            onPress={() => {
              setOpen(false);
              router.push({ pathname: "/all-contexts", params: { action: "new" } });
            }}
            className="min-h-10 flex-row items-center gap-3 rounded-md px-3 active:bg-app-panel">
            <MaterialCommunityIcons name="plus-circle-outline" size={17} color={colors.textMuted} />
            <Text className="flex-1 font-display text-sm text-app-text">New Context</Text>
          </Pressable>

          <Pressable
            accessibilityRole="menuitem"
            onPress={() => {
              setOpen(false);
              router.push({ pathname: "/all-contexts", params: { action: "manage" } });
            }}
            className="min-h-10 flex-row items-center gap-3 rounded-md px-3 active:bg-app-panel">
            <MaterialCommunityIcons name="cog-outline" size={17} color={colors.textMuted} />
            <Text className="flex-1 font-display text-sm text-app-text">Manage Contexts</Text>
          </Pressable>
        </View>
      : null}
    </View>
  );
}

export default function Header({ onOpenMenu }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const fullName = (user?.user_metadata?.full_name as string | undefined) ?? "";
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const initials = initialsFromName(fullName, user?.email);

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="z-30 border-b border-app-border bg-app-bg-accent">
      <View className="min-h-[80px] flex-row items-center justify-between gap-4 px-4 py-4 md:px-8 lg:px-10">
        <View className="flex-1 flex-row items-center gap-3">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open navigation menu"
            onPress={onOpenMenu}
            className="h-11 w-11 items-center justify-center rounded-xl active:bg-app-panel md:hidden">
            <MaterialCommunityIcons name="menu" size={27} color={colors.primaryStrong} />
          </Pressable>

          <View className="hidden md:flex">
            <ContextDropdown />
          </View>

          <View className="flex-row items-center gap-2 md:hidden">
            <Text className="font-display text-lg font-bold text-app-primary-strong">Rupeez</Text>
            <ContextDropdown compact />
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            className="h-11 w-11 items-center justify-center rounded-full bg-app-panel active:opacity-80">
            <MaterialCommunityIcons name="bell-outline" size={22} color={colors.text} />
          </Pressable>

          <ThemeToggle compact />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open profile menu"
            className="h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-app-border bg-app-panel active:opacity-80">
            {avatarUrl ?
              <Image source={{ uri: avatarUrl }} className="h-full w-full" resizeMode="cover" />
            : <Text className="font-display text-sm font-bold text-app-primary-strong">
                {initials}
              </Text>
            }
          </Pressable>
        </View>
      </View>
    </View>
  );
}
