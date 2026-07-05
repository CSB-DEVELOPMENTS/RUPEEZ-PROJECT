import { Redirect, Slot } from "expo-router";
import { View } from "react-native";

import { AuthGateFallback } from "@/components/auth/AuthGateFallback";
import Sidebar from "@/components/sidebar/Sidebar";
import { useAuth } from "@/hooks/auth/useAuth";

export default function ProtectedLayout() {
  const { loading, user } = useAuth();

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
        <Slot />
      </View>
    </View>
  );
}
