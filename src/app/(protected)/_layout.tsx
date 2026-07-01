import { Redirect, Slot } from "expo-router";

import { AuthGateFallback } from "@/components/auth/AuthGateFallback";
import { useAuth } from "@/hooks/auth/useAuth";

export default function ProtectedLayout() {
  const { loading, user } = useAuth();

  if (loading) {
    return <AuthGateFallback />;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Slot />;
}
