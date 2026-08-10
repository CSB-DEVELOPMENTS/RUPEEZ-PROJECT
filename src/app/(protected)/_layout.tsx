import { Redirect, Slot, usePathname } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { AuthGateFallback } from "@/components/auth/AuthGateFallback";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import Header, { FloatingHeaderAction } from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { getProtectedRouteBreadcrumbs } from "@/constants/navigation";
import { useAuth } from "@/hooks/auth/useAuth";
import { useHeaderAction } from "@/utils/header-actions";

export default function ProtectedLayout() {
  const { loading, profileLoading, profiles, user } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerAction = useHeaderAction();

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
