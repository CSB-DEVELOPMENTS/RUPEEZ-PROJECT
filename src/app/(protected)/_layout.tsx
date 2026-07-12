import { Redirect, Slot, usePathname } from "expo-router";
import { View } from "react-native";

import { AuthGateFallback } from "@/components/auth/AuthGateFallback";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import Sidebar from "@/components/sidebar/Sidebar";
import { getProtectedRouteBreadcrumbs } from "@/constants/navigation";
import { useAuth } from "@/hooks/auth/useAuth";

export default function ProtectedLayout() {
  const { loading, user } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return <AuthGateFallback />;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <View className="flex-1 flex-row bg-app-bg">
      <Sidebar />
      <View className="flex-1">
        <View className="mx-auto w-full px-4 pt-6 pb-4 md:px-8 md:pt-8 lg:px-10">
          <Breadcrumbs items={getProtectedRouteBreadcrumbs(pathname)} />
        </View>
        <View className="flex-1">
          <Slot />
        </View>
      </View>
    </View>
  );
}
