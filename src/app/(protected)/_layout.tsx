import { Redirect, Slot, usePathname, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { AuthGateFallback } from "@/components/auth/AuthGateFallback";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import Header, { FloatingHeaderAction, type HeaderAction } from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { getProtectedRouteBreadcrumbs } from "@/constants/navigation";
import { useAuth } from "@/hooks/auth/useAuth";

export default function ProtectedLayout() {
  const { loading, profileLoading, profiles, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let headerAction: HeaderAction | undefined;

  switch (pathname) {
    case "/all-contexts":
      headerAction = {
        icon: "plus",
        label: "New Context",
        onPress: () => router.push({ pathname: "/all-contexts", params: { action: "new" } }),
      };
      break;
    case "/wealth":
    case "/asset-portfolio":
      headerAction = { icon: "plus", label: "Add Asset", onPress: () => router.push("/add-asset") };
      break;
  }

  if (loading || (user && profileLoading)) {
    return <AuthGateFallback />;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  if (profiles.length === 0 && pathname !== "/all-contexts") {
    return <Redirect href="/all-contexts" />;
  }

  return (
    <View className="flex-1 flex-row bg-app-bg">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onMobileOpenChange={setMobileMenuOpen}
        showMobileTrigger={false}
      />
      <View className="flex-1">
        <Header action={headerAction} onOpenMenu={() => setMobileMenuOpen(true)} />
        <View className="mx-auto w-full px-4 pb-4 pt-5 md:px-8 lg:px-10">
          <Breadcrumbs items={getProtectedRouteBreadcrumbs(pathname)} />
        </View>
        <View className="relative flex-1">
          <Slot />
          {headerAction ?
            <FloatingHeaderAction action={headerAction} />
          : null}
        </View>
      </View>
    </View>
  );
}
