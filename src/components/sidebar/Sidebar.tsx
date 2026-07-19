import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { type Href, usePathname, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Modal, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/hooks/auth/useAuth";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

type SidebarItem = {
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  href?: Href;
};

const navigationItems: SidebarItem[] = [
  { label: "Dashboard", icon: "view-dashboard-outline", href: "/dashboard" },
  { label: "Flow", icon: "swap-horizontal", href: "/cash-flow" },
  { label: "Calendar", icon: "calendar-blank-outline", href: "/calendar-heatmap" },
  { label: "Accounts", icon: "cash-multiple", href: "/accounts" },
  { label: "Social Finance", icon: "account-group-outline", href: "/social-finance" },
  { label: "Wealth", icon: "piggy-bank-outline", href: "/wealth" },
  { label: "Analytics", icon: "chart-box-outline", href: "/analytics" },
  { label: "Subscriptions", icon: "credit-card-clock-outline", href: "/subscriptions" },
  { label: "Settings", icon: "cog-outline", href: "/settings" },
];

type SidebarPanelProps = {
  mobile?: boolean;
  onClose?: () => void;
  pathname: string;
  onNavigate: (href: Href) => void;
  onSignOut: () => void;
  signingOut: boolean;
};

function SidebarPanel({
  mobile = false,
  onClose,
  pathname,
  onNavigate,
  onSignOut,
  signingOut,
}: SidebarPanelProps) {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const colors = Colors[theme];

  return (
    <View
      style={mobile ? { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 } : undefined}
      className={
        mobile
          ? "h-full w-72 border-r border-app-border bg-app-bg-accent px-4"
          : "hidden h-full w-64 shrink-0 border-r border-app-border bg-app-bg-accent px-4 pb-7 pt-9 md:flex"
      }>
      <View className={mobile ? "mb-8 flex-row items-center px-2" : "mb-12 flex-row items-center px-2"}>
        <View className="flex-1 flex-row items-center gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-lg bg-app-primary-strong">
            <MaterialCommunityIcons
              name="cash-multiple"
              size={23}
              color={colors.primaryContrast}
            />
          </View>

          <View>
            <Text className="font-display text-[23px] font-bold tracking-tight text-app-text">
              Rupeez
            </Text>
            <Text className="font-display text-[9px] font-bold uppercase tracking-[1px] text-app-primary-strong">
              CSB Development
            </Text>
          </View>
        </View>

        {mobile ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close navigation menu"
            onPress={onClose}
            className="h-10 w-10 items-center justify-center rounded-full active:bg-app-panel">
            <MaterialCommunityIcons name="close" size={25} color={colors.text} />
          </Pressable>
        ) : null}
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="gap-1.5">
          {navigationItems.map((item) => {
            const active =
              item.href === pathname ||
              (item.href === "/wealth" &&
                (pathname === "/asset-portfolio" || pathname === "/add-asset"));
            const disabled = !item.href;

            return (
              <Pressable
                key={item.label}
                accessibilityRole="tab"
                accessibilityState={{ selected: active, disabled }}
                disabled={disabled}
                onPress={() => {
                  if (item.href) {
                    onNavigate(item.href);
                  }
                }}
                className={
                  active
                    ? "relative h-12 flex-row items-center gap-3 overflow-hidden rounded-xl bg-app-primary-muted px-4"
                    : "h-12 flex-row items-center gap-3 rounded-xl px-4 active:bg-app-panel"
                }>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={22}
                  color={active ? colors.primaryStrong : colors.textMuted}
                />
                <Text
                  className={
                    active
                      ? "font-display text-sm font-medium text-app-primary-strong"
                      : "font-display text-sm text-app-text-muted"
                  }>
                  {item.label}
                </Text>
                {active ? (
                  <View className="absolute bottom-0 right-0 top-0 w-1 rounded-l-full bg-app-primary-strong" />
                ) : null}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View className="gap-1.5 pt-3">
        <View className="h-12 flex-row items-center gap-3 px-4">
          <MaterialCommunityIcons name="help-circle-outline" size={22} color={colors.textMuted} />
          <Text numberOfLines={1} className="flex-1 font-display text-sm text-app-text-muted">
            Help &amp; Support
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Log out"
          disabled={signingOut}
          onPress={onSignOut}
          className="h-12 flex-row items-center gap-3 rounded-xl px-4 active:bg-app-danger-muted">
          <MaterialCommunityIcons name="logout" size={22} color={colors.danger} />
          <Text className="font-display text-sm font-medium text-app-danger">
            {signingOut ? "Logging out..." : "Log out"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

type SidebarProps = {
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  showMobileTrigger?: boolean;
};

export default function Sidebar({
  mobileOpen,
  onMobileOpenChange,
  showMobileTrigger = true,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const [uncontrolledMobileOpen, setUncontrolledMobileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const colors = Colors[theme];
  const isMobileOpen = mobileOpen ?? uncontrolledMobileOpen;

  const setMobileOpen = (open: boolean) => {
    onMobileOpenChange?.(open);

    if (mobileOpen === undefined) {
      setUncontrolledMobileOpen(open);
    }
  };

  const handleNavigate = (href: Href) => {
    router.push(href);
    setMobileOpen(false);
  };

  const handleSignOut = async () => {
    if (signingOut) {
      return;
    }

    setSigningOut(true);
    const { error } = await signOut();

    if (error) {
      setSigningOut(false);
      Alert.alert("Unable to log out", error.message);
      return;
    }

    router.replace("/");
  };

  const mobileSidebar = (
    <View className="absolute inset-0 z-20 flex-row bg-black/50 md:hidden">
      <SidebarPanel
        mobile
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
        onNavigate={handleNavigate}
        onSignOut={handleSignOut}
        signingOut={signingOut}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close navigation menu"
        onPress={() => setMobileOpen(false)}
        className="flex-1"
      />
    </View>
  );

  return (
    <>
      {showMobileTrigger ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open navigation menu"
          onPress={() => setMobileOpen(true)}
          style={{ top: insets.top + 16 }}
          className="absolute left-4 z-10 h-11 w-11 items-center justify-center rounded-xl border border-app-border bg-app-surface shadow-sm active:bg-app-panel md:hidden">
          <MaterialCommunityIcons name="menu" size={26} color={colors.primaryStrong} />
        </Pressable>
      ) : null}

      <SidebarPanel
        pathname={pathname}
        onNavigate={handleNavigate}
        onSignOut={handleSignOut}
        signingOut={signingOut}
      />

      {Platform.OS === "web" ? (
        isMobileOpen ? mobileSidebar : null
      ) : (
        <Modal
          animationType="fade"
          transparent
          visible={isMobileOpen}
          onRequestClose={() => setMobileOpen(false)}>
          {mobileSidebar}
        </Modal>
      )}
    </>
  );
}
