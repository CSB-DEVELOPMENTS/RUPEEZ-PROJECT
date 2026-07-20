import { Redirect, Slot, usePathname } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { AuthGateFallback } from "@/components/auth/AuthGateFallback";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { getProtectedRouteBreadcrumbs } from "@/constants/navigation";
import { useAuth } from "@/hooks/auth/useAuth";

export default function ProtectedLayout() {
  const { loading, user } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return <AuthGateFallback />;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <View className="flex-1 flex-row bg-app-bg">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onMobileOpenChange={setMobileMenuOpen}
        showMobileTrigger={false}
      />
      <View className="flex-1">
        <Header onOpenMenu={() => setMobileMenuOpen(true)} />
        <View className="mx-auto w-full px-4 pb-4 pt-5 md:px-8 lg:px-10">
          <Breadcrumbs items={getProtectedRouteBreadcrumbs(pathname)} />
        </View>
        <View className="flex-1">
          <Slot />
        </View>
      </View>
    </View>
  );
}
